/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

export const DRAWING_MODE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
})

/** @extends {React.Component<Props, State>} */
class SvgEditorContainer extends React.Component {
  startPoint = null;

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

  /** @param {MouseEvent} */
  getCoordinate = ({ clientX, clientY }) => {
    const { viewBox } = this.props;
    const { svg } = this.state;

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

  // unsed method's in this container

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

  setContainer = (targetContainer = {}) => {
    this.setState({ targetContainer });
  }

  getContainer = () => this;

  onEnd = () => {
    this.unbindEvent(document);
    this.startPoint = null;
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
@typedef {{
  svg?: SVGSVGElement,
  targetContainer: Object
}} State

@typedef {{
  render: React.FC,
  viewBox: [number, number, number, number],
}} Props

@typedef {SvgEditorContainer & State & Props} RenderProps
*/
