/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

export const SHAPE_TYPE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
});

/** @extends {React.Component<Props>} */
class AddPolygonContainer extends React.Component {
  drawData = {
    /** @type {SVGPolygonElement} */
    polygon: null,

    mode: SHAPE_TYPE.POLYGON,

    endStep: 0,
    step: 0,
    /** @type {SVGPoint} */
    downPoint: null,
    /** @type {SVGPoint[]} */
    coordinates: [],
  }

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const { setContainer } = props;

    setContainer(this);
  }

  componentWillUnmount() {
    const { setContainer, instance } = this.props;
    const { state: { targetContainer } } = instance;

    if (targetContainer === this) {
      setContainer();
    }
  }

  /** @param {SVGPolygonElement} element */
  setRef = (element = null) => {
    this.drawData.polygon = element;
  }

  setDrawData = (data = {}) => {
    Object.assign(this.drawData, data);
    this.renderCoordinate();
  }

  /** @param {SVGPoint} point */
  setPoint = point => {
    const { step, mode, downPoint } = this.drawData;

    switch (mode) {
      case SHAPE_TYPE.RECTANGLE: {
        const { instance } = this.props;
        const { createPoint } = instance;
        this.drawData.coordinates = [
          downPoint,
          createPoint(downPoint.x, point.y),
          point,
          createPoint(point.x, downPoint.y),
        ];
        break;
      }

      default:
        this.drawData.coordinates[step] = point;
    }

    this.renderCoordinate();
  }

  drawEnd = () => {
    const { onChange, instance } = this.props;
    const { onEnd } = instance;
    // check is overflow min/max size

    const { endStep } = this.props;
    this.setDrawData({
      mode: SHAPE_TYPE.POLYGON,

      step: 0,
      endStep,
      downPoint: null,
      coordinates: [],
    });

    onEnd();
    if (onChange) {
      onChange(this.drawData.coordinates);
    }
  }

  /**
   * @param {MouseEvent} event
   * @param {SVGPoint} downPoint
   */
  onMousedown = (event, downPoint) => {
    const isDrawStart = !!this.drawData.downPoint;

    if (isDrawStart === false) {
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
    if (step === 0 && this.drawData.mode !== SHAPE_TYPE.RECTANGLE) {
      const diffX = point.x - downPoint.x;
      const diffY = point.y - downPoint.y;

      if (Math.abs(diffX) > minSize
        || Math.abs(diffY) > minSize
      ) {
        this.drawData.mode = SHAPE_TYPE.RECTANGLE;
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
      this.drawEnd();
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
  onChange: null,

  // defaultProps
  minSize: 10,
  endStep: 4,
}

AddPolygonContainer.propTypes = {
  render: PropTypes.func.isRequired,
  onChange: PropTypes.func,

  // SvgEditorContainer
  setContainer: PropTypes.func.isRequired,
  instance: PropTypes.instanceOf(Object).isRequired,

  // defaultProps
  minSize: PropTypes.number,
  endStep: PropTypes.number,
}

export default AddPolygonContainer;

/**
@typedef {import('../../SvgEditorContainer').default} SvgEditorContainer
@typedef {{ }} State

@typedef {{
  onChange: (coordinates: SVGPoint[]) => void,

  setContainer: (container: any) => void,
  instance: SvgEditorContainer,

  minSize: number,
  endStep: number,
}} Props

@typedef {AddPolygonContainer & Props & State} RenderProps
*/
