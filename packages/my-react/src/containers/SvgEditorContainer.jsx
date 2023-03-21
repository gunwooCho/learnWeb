/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

export const DRAWING_MODE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
})

/** @extends {React.Component<Props>} */
class SvgEditorContainer extends React.Component {
  startPoint = null;

  instance = this;

  constructor(props) {
    super(props);

    /** @type {State} */
    this.state = {
      svg: null,
      targetContainer: {},
    };
  }

  bindEvent = (element, options) => {
    if (element instanceof SVGSVGElement) {
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

  unbindEvent = (element) => {
    if (element instanceof SVGSVGElement) {
      element.removeEventListener('mousedown', this.onMousedown);
    }

    if (element instanceof Document) {
      element.removeEventListener('mousemove', this.onMousemove);
      element.removeEventListener('click', this.onClick);
    }
  }

  /** @param {number} x */
  getX = x => {
    const { viewBox } = this.props;
    const unserValue = viewBox[0];
    const overValue = viewBox[2];

    let value = x;
    value = Math.max(value, unserValue);
    value = Math.min(value, overValue);

    let flowValue = 0;
    if (x < unserValue) {
      flowValue = x;
    }
    if (x > overValue) {
      flowValue = x - overValue;
    }

    return {
      value,
      flowValue,
    };
  }

  /** @param {number} y */
  getY = y => {
    const { viewBox } = this.props;
    const unserValue = viewBox[1];
    const overValue = viewBox[3];

    let value = y;
    value = Math.max(value, unserValue); // under
    value = Math.min(value, overValue); // over

    let flowValue = 0;
    if (y < unserValue) {
      flowValue = y;
    }
    if (y > overValue) {
      flowValue = y - overValue;
    }

    return {
      value,
      flowValue,
    };
  }

  /** @param {MouseEvent} */
  getCoordinate = ({ clientX, clientY }) => {
    const { svg } = this.state;

    let point = svg.createSVGPoint();

    point.x = clientX;
    point.y = clientY;
    point = point.matrixTransform(svg.getScreenCTM().inverse());

    const x = this.getX(point.x);
    const y = this.getY(point.y);

    point.x = x.value;
    point.y = y.value;

    return point;
  }

  /** @param {SVGElement} element */
  getCenterCoordinate = (element = null) => {
    if (element === null) {
      return null;
    }

    const { svg } = this.state;
    const { x, y, width, height } = element.getBoundingClientRect();

    const point = svg.createSVGPoint();
    const xData = this.getX(width / 2 + x);
    const yData = this.getY(height / 2 + y);

    point.x = xData.value;
    point.y = yData.value;

    return point;
  }

  /**
   * @param {SVGPoint} start
   * @param {SVGPoint} end
   * @param {SVGPoint[]} coordinates
   */
  getDiffPoint = (start, end, coordinates = []) => {
    const { svg } = this.state;

    const point = svg.createSVGPoint();
    point.x = end.x - start.x;
    point.y = end.y - start.y;


    if (coordinates.length === 0) {
      return point;
    }

    const { viewBox } = this.props;
    const xs = coordinates.map(({ x }) => x);
    const ys = coordinates.map(({ y }) => y);

    const minX = Math.min(...xs);
    if (point.x < 0 && (minX + point.x) < viewBox[0]) {
      point.x = -minX;
    }
    const maxX = Math.max(...xs);
    if (point.x > 0 && (maxX + point.x) > viewBox[2]) {
      point.x = viewBox[2] - maxX;
    }

    const minY = Math.min(...ys);
    if (point.y < 0 && (minY + point.y) < viewBox[1]) {
      point.y = -minY;
    }
    const maxY = Math.max(...ys);
    if (point.y > 0 && (maxY + point.y) > viewBox[3]) {
      point.y = viewBox[3] - maxY;
    }
    return point;
  }

  /** @param {MouseEvent} event */
  onMousedown = event => {
    const { targetContainer: { onMousedown } } = this.state;
    const isInit = !this.startPoint;

    this.bindEvent(document, {
      isInit,
    });

    const startPoint = this.getCoordinate(event);
    if (isInit === true) {
      this.startPoint = startPoint;
    }

    if (onMousedown) {
      onMousedown(event, startPoint);
    }
  }

  /** @param {MouseEvent} event */
  onMousemove = event => {
    const { targetContainer: { onMousemove } } = this.state;

    if (typeof onMousemove === 'function') {
      onMousemove(event, this.getCoordinate(event));
    }
  }

  /** @param {PointerEvent} event */
  onMouseup = event => {
    const { targetContainer: { onMouseup } } = this.state;

    if (typeof onMouseup === 'function') {
      onMouseup(event, this.getCoordinate(event));
    }
  }

  /** @param {PointerEvent} event */
  onClick = event => {
    const { svg, targetContainer: { onClick } } = this.state;
    if (event.target === svg) {
      return;
    }

    if (typeof onClick === 'function') {
      onClick(event, this.getCoordinate(event));
    }
  }

  setRef = (ref = null) => {
    if (ref instanceof SVGSVGElement) {
      const { svg } = this.state;

      if (svg !== ref) {
        this.unbindEvent(svg);
        this.bindEvent(ref)
        this.setState({ svg: ref });
      }
    }
  }

  /** @param {ITargetContainer} targetContainer */
  setContainer = (targetContainer = {}) => this.setState({ targetContainer });

  /** @param {ITargetContainer} target */
  unsetContainer = target => {
    const { targetContainer } = this.state;
    if (targetContainer === target) {
      this.setContainer();
    }
  }

  onEnd = () => {
    this.unbindEvent(document);
    this.startPoint = null;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  createPoint = (x, y) => {
    const { svg } = this.state;
    const point = svg.createSVGPoint();

    const xData = this.getX(x);
    const yData = this.getY(y);
    point.x = xData.value;
    point.y = yData.value;

    return point;
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    })
  }
}

SvgEditorContainer.defaultProps = {
  viewBox: [0, 0, 1920, 1080],
}

SvgEditorContainer.propTypes = {
  render: PropTypes.func.isRequired,
  viewBox: PropTypes.arrayOf(Number),
}

export default SvgEditorContainer;

/**
@typedef {(event:MouseEvent, point: SVGPoint) => any} IOnSvgMouseEvent

@typedef {{
  onMousedown?: IOnSvgMouseEvent,
  onMousemove?: IOnSvgMouseEvent,
  onMouseup?: IOnSvgMouseEvent,
  onClick?: IOnSvgMouseEvent,
} & React.ComponentClass} ITargetContainer

@typedef {{
  svg?: SVGSVGElement,
  targetContainer: ITargetContainer,
}} State

@typedef {{
  render: React.FC,
  viewBox: [number, number, number, number],
}} Props

@typedef {SvgEditorContainer & State & Props} RenderProps
*/
