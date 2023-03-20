/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

import SvgEditorContainer from '../../SvgEditorContainer';

export const SHAPE_TYPE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
});

/** @extends {React.Component<Props>} */
class AddPolygonContainer extends React.Component {
  /** @param {Props} props */
  constructor(props) {
    super(props);
    const { instance: { setContainer } } = props;

    /** @type {State} */
    this.state = {
      mode: SHAPE_TYPE.POLYGON,
      downPoint: null,
      endStep: 0,
      step: 0,
      coordinates: [],
    }

    setContainer(this);
  }

  componentWillUnmount() {
    const { instance: { unsetContainer } } = this.props;
    unsetContainer(this);
  }

  /** @param {SVGPoint} point */
  setPoint = point => {
    const { step, mode, downPoint, coordinates: oldCoordinates } = this.state;

    switch (mode) {
      case SHAPE_TYPE.RECTANGLE: {
        const { instance: { createPoint } } = this.props;

        this.setState({
          coordinates: [
            downPoint,
            createPoint(downPoint.x, point.y),
            point,
            createPoint(point.x, downPoint.y),
          ]
        })
        break;
      }

      default: {
        const coordinates = [...oldCoordinates];
        coordinates[step] = point;
        this.setState({ coordinates });
      }
    }
  }

  drawEnd = () => {
    const { onChange, instance, endStep } = this.props;
    const { onEnd } = instance;
    // check is overflow min/max size

    onEnd();
    if (onChange) {
      const { coordinates } = this.state;
      onChange([...coordinates]);
    }

    this.setState({
      mode: SHAPE_TYPE.POLYGON,

      step: 0,
      endStep,
      downPoint: null,
      coordinates: [],
    });
  }

  /**
   * @param {MouseEvent} event
   * @param {SVGPoint} downPoint
   */
  onMousedown = (event, downPoint) => {
    const { downPoint: prevDown } = this.state;
    const isDrawStart = !!prevDown;

    if (isDrawStart === false) {
      this.setState({ downPoint });
    }
  }

  /**
   * @param {MouseEvent} event
   * @param {SVGPoint} point
   */
  onMousemove = (event, point) => {
    const { minSize } = this.props;

    const { mode, step, downPoint } = this.state;
    if (step === 0 && mode !== SHAPE_TYPE.RECTANGLE) {
      const diffX = point.x - downPoint.x;
      const diffY = point.y - downPoint.y;

      if (Math.abs(diffX) > minSize
        || Math.abs(diffY) > minSize
      ) {
        this.setState({ mode: SHAPE_TYPE.RECTANGLE, endStep: 1 })
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
    const { step, endStep } = this.state;
    this.setPoint(point);

    const nextStep = step + 1;
    if (endStep <= nextStep) {
      this.drawEnd();
    } else {
      this.setState({ step: nextStep });
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {SVGPoint} point
   */
  onClick = (event, point) => {
    this.onMouseup(event, point);
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.props,
      ...this.state,
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
  instance: PropTypes.instanceOf(SvgEditorContainer).isRequired,

  // defaultProps
  minSize: PropTypes.number,
  endStep: PropTypes.number,
}

export default AddPolygonContainer;

/**
@typedef {{
  downPoint: SVGPoint | null,
  endStep: number,
  step: number
  coordinates: SVGPoint[],
 }} State

@typedef {{
  onChange: (coordinates: SVGPoint[]) => void,

  instance: SvgEditorContainer,

  minSize: number,
  endStep: number,
}} Props

@typedef {AddPolygonContainer & Props & State} RenderProps
*/
