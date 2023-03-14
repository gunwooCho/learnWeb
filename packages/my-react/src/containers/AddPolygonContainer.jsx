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

    const { svg } = this.props;
    this.unbindEvent(svg);
    this.bindEvent(svg);
  }

  /** @param {Props} prevProps */
  componentDidUpdate(prevProps) {
    const { svg } = this.props;

    if (prevProps.svg !== svg) {
      this.unbindEvent(prevProps.svg);
      this.bindEvent(svg);
    }
  }

  componentWillUnmount() {
    const { svg } = this.props;
    this.unbindEvent(svg);
  }

  /** @param {SVGPolygonElement} element */
  setRef = (element = null) => {
    this.drawData.polygon = element;
  }

  bindEvent = (element, options) => {
    if (element instanceof SVGSVGElement) {
      const { endStep } = this.props;
      this.drawData.endStep = endStep;

      element.addEventListener('mousedown', this.onMousedown);
    }

    if (element instanceof Document) {
      document.addEventListener('mouseup', this.onMouseup, { once: true });

      if (options.isInit === false) {
        return;
      }

      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('click', this.onClick);
    }
  }

  /** @param {SVGSVGElement} svg */
  unbindEvent = (element) => {
    if (element instanceof SVGSVGElement) {
      element.removeEventListener('mousedown', this.onMousedown);
    }

    if (element instanceof Document) {
      element.removeEventListener('mousemove', this.onMousemove);
      element.removeEventListener('click', this.onClick);
    }
  }

  /** @param {MouseEvent} */
  getCoordinate = ({ clientX, clientY }) => {
    const { svg, viewBox } = this.props;
    let point = svg.createSVGPoint();

    point.x = clientX;
    point.y = clientY;
    point = point.matrixTransform(svg.getScreenCTM().inverse());

    point.x = Math.max(point.x, viewBox[0]); // under
    point.x = Math.min(point.x, viewBox[2]); // over

    point.y = Math.max(point.y, viewBox[1]); // under
    point.y = Math.min(point.y, viewBox[3]); // over

    return point;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  createPoint = (x, y) => {
    const { svg } = this.props;
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

  /** @param {MouseEvent} event */
  onMousedown = event => {
    const isInit = !this.drawData.downPoint;

    this.bindEvent(document, {
      isInit,
    });

    if (isInit === true) {
      this.drawData.downPoint = this.getCoordinate(event);
    }
  }

  /** @param {MouseEvent} event */
  onMousemove = event => {
    const { minSize } = this.props;
    const point = this.getCoordinate(event);

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

  /** @param {PointerEvent} event */
  onMouseup = event => {
    const point = this.getCoordinate(event);
    this.setPoint(point);
    this.drawData.step += 1;

    if (this.drawData.endStep <= this.drawData.step) {
      const { onChange } = this.props;
      this.unbindEvent(document);

      // check is overflow minSize
      onChange(this.drawData.coordinates);

      const { endStep } = this.props;
      this.setDrawData({
        mode: DRAWING_MODE.POLYGON,

        step: 0,
        endStep,
        downPoint: null,
        coordinates: [],
      });
    }
  }

  /** @param {PointerEvent} event */
  onClick = (event) => {
    const { svg } = this.props;
    if (event.target === svg) {
      return;
    }

    this.onMouseup(event);
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
  svg: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => { },

  // defaultProps
  minSize: 10,
  endStep: 4,
}

AddPolygonContainer.propTypes = {
  render: PropTypes.func.isRequired,
  svg: PropTypes.instanceOf(Object),
  viewBox: PropTypes.arrayOf(Number).isRequired,
  onChange: PropTypes.func,

  // defaultProps
  minSize: PropTypes.number,
  endStep: PropTypes.number,
}

export default AddPolygonContainer;

/**
@typedef {{
  svg?: SVGSVGElement,
  viewBox: number[],
  minSize: number,
  endStep: number,

  onChange: (coordinates: SVGPoint[]) => void,
}} Props
*/
