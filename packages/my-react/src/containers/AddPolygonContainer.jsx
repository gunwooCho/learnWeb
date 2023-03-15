/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

export const DRAWING_MODE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
});

/** @extends {React.Component<Props>} */
class AddPolygonContainer extends React.Component {
  drawData = {
    /** @type {SVGPolygonElement} */
    polygon: null,

    mode: DRAWING_MODE.POLYGON,

    endStep: 0,
    step: 0,
    /** @type {SVGPoint} */
    downPoint: null,
    /** @type {SVGPoint[]} */
    coordinates: [],
  }

  constructor(props) {
    super(props);
    this.setRef();

    const { setContainer } = this.props;

    setContainer(this);
  }

  componentWillUnmount() {
    const { setContainer, getContainer } = this.props;
    const container = getContainer();
    if (container.state.targetContainer === this) {
      setContainer();
    }
  }

  /** @param {SVGPolygonElement} element */
  setRef = (element = null) => {
    this.drawData.polygon = element;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  createPoint = (x, y) => {
    const { getContainer } = this.props;
    const { state: { svg } } = getContainer();
    const point = svg.createSVGPoint();

    point.x = x;
    point.y = y;
    return point;
  }

  /** @param {SVGPoint} point */
  setPoint = point => {
    const { step, mode, downPoint } = this.drawData;

    switch (mode) {
      case DRAWING_MODE.RECTANGLE: {
        this.drawData.coordinates = [
          downPoint,
          this.createPoint(downPoint.x, point.y),
          point,
          this.createPoint(point.x, downPoint.y),
        ];
        break;
      }

      default:
        this.drawData.coordinates[step] = point;
    }

    this.renderCoordinate();
  }

  setDrawData = (data = {}) => {
    Object.assign(this.drawData, data);
    this.renderCoordinate();
  }

  /**
   * @param {MouseEvent} event
   * @param {SVGPoint} downPoint
   */
  onMousedown = (event, downPoint) => {
    const isInit = !this.drawData.downPoint;

    if (isInit === true) {
      this.drawData.downPoint = downPoint;
    }
  }

  /**
   * @param {MouseEvent} event
   * @param {SVGPoint} point
   */
  onMousemove = (event, point) => {
    const { minSize } = this.props;

    const { step, downPoint } = this.drawData;
    if (step === 0 && this.drawData.mode !== DRAWING_MODE.RECTANGLE) {
      const diffX = point.x - downPoint.x;
      const diffY = point.y - downPoint.y;

      if (Math.abs(diffX) > minSize
        || Math.abs(diffY) > minSize
      ) {
        this.drawData.mode = DRAWING_MODE.RECTANGLE;
        this.drawData.endStep = 1;
        this.setPoint(downPoint);
        return;
      }
    }

    this.setPoint(point);
  }

  /**
   * @param {PointerEvent} event
   * @param {SVGPoint} point
   */
  onMouseup = (event, point) => {
    this.setPoint(point);
    this.drawData.step += 1;

    if (this.drawData.endStep <= this.drawData.step) {
      const { onChange, getContainer } = this.props;
      // check is overflow minSize

      const { endStep } = this.props;
      this.setDrawData({
        mode: DRAWING_MODE.POLYGON,

        step: 0,
        endStep,
        downPoint: null,
        coordinates: [],
      });

      getContainer().onEnd();
      onChange(this.drawData.coordinates);
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {SVGPoint} point
   */
  onClick = (event, point) => {
    this.onMouseup(event, point);
  }

  renderCoordinate = () => {
    const { coordinates, polygon } = this.drawData;
    polygon.setAttribute(
      'points',
      coordinates.map(coordinate => `${coordinate.x},${coordinate.y}`).join(' ')
    );
  };

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    })
  }
}

AddPolygonContainer.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => { },

  // defaultProps
  minSize: 10,
  endStep: 4,
}

AddPolygonContainer.propTypes = {
  render: PropTypes.func.isRequired,
  onChange: PropTypes.func,

  // SvgEditorContainer
  setContainer: PropTypes.func.isRequired,
  getContainer: PropTypes.func.isRequired,

  // defaultProps
  minSize: PropTypes.number,
  endStep: PropTypes.number,
}

export default AddPolygonContainer;

/**
@typedef {import('./SvgEditorContainer').default} SvgEditorContainer
@typedef {{ }} State

@typedef {{
  svg?: SVGSVGElement,
  setContainer: (container: any) => void,
  getContainer: () => SvgEditorContainer,
  minSize: number,
  endStep: number,

  onChange: (coordinates: SVGPoint[]) => void,
}} Props

@typedef {AddPolygonContainer & Props & State} RenderProps
*/
