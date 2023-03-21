/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

import SvgEditorContainer from '../../SvgEditorContainer';

export const DRAWING_MODE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
});

/** @extends {React.Component<Props>} */
class EditPolygonContainer extends React.Component {
  /** @type {{ [key: string | number]: SVGCircleElement | SVGPolygonElement }} */
  elementRefs = {};

  /** @param {Props} props */
  constructor(props) {
    super(props);

    const { instance, coordinates } = props;

    instance.setContainer(this);

    /** @type {State} */
    this.state = {
      ref: null,
      downPoint: null,
      movedCoordinates: coordinates,
    };
  }

  /** @param {Props} prevProps */
  componentDidUpdate(prevProps) {
    const { coordinates } = this.props;

    if (JSON.stringify(coordinates) !== JSON.stringify(prevProps.coordinates)) {
      this.setState({
        movedCoordinates: coordinates,
      });
    }
  }

  componentWillUnmount() {
    const { instance: { unsetContainer } } = this.props;
    unsetContainer(this);
  }

  /** @param {SVGElement} ref */
  setRef = (ref = null) => {
    if (ref === null) {
      return;
    }

    this.elementRefs[ref.id] = ref;

    switch (ref.constructor) {
      case SVGCircleElement:
      case SVGPolygonElement: {
        this.elementRefs[ref.id] = ref;
        break;
      }

      default:
    }
  }

  /** @param {SVGPoint} point */
  getMoveCircleCoodinates = point => {
    const { ref, movedCoordinates } = this.state;

    const coordinates = [...movedCoordinates];
    coordinates[ref.dataset.index] = point;

    return coordinates;
  }

  /** @param {SVGPoint} point */
  getMovePolygonCoordinates = point => {
    const { instance, coordinates } = this.props;
    const { downPoint } = this.state;

    const { x: diffX, y: diffY } = instance.getDiffPoint(downPoint, point, coordinates);

    const nextCoordinates = coordinates.map(({ x, y }) => instance.createPoint(x + diffX, y + diffY));
    return nextCoordinates;
  }

  /**
   * @param {MouseEvent} event
   * @param {SVGPoint} point
   */
  onMousedown = (event, point) => {
    const ref = this.elementRefs[event.target.id] || null;

    this.setState({ ref, downPoint: point });
  }

  /** @param {SVGPoint} point */
  onMousemove = (event, point) => {
    const { ref } = this.state;

    switch ((ref || {}).constructor) {
      case SVGCircleElement: {
        this.setState({ movedCoordinates: this.getMoveCircleCoodinates(point) });
        break;
      }

      case SVGPolygonElement: {
        this.setState({ movedCoordinates: this.getMovePolygonCoordinates(point) });
        break;
      }

      default:
    }
  }

  /** @param {SVGPoint} point */
  onMouseup = (event, point) => {
    const { ref } = this.state;

    let nextCoordinates = null;
    switch ((ref || {}).constructor) {
      case SVGCircleElement: {
        nextCoordinates = this.getMoveCircleCoodinates(point);
        break;
      }

      case SVGPolygonElement: {
        nextCoordinates = this.getMovePolygonCoordinates(point);
        break;
      }

      default:
    }

    if (nextCoordinates) {
      const { instance, coordinates, id, onChange } = this.props;
      instance.onEnd();
      this.setState({ movedCoordinates: coordinates, ref: null, downPoint: null })

      if (onChange) {
        onChange(nextCoordinates, id);
      }
    }
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

EditPolygonContainer.defaultProps = {
  onChange: null,
}

EditPolygonContainer.propTypes = {
  render: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(SVGPoint).isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,

  // SvgEditorContainer
  instance: PropTypes.instanceOf(SvgEditorContainer).isRequired,
}


export default EditPolygonContainer;

/**

@typedef {{
  ref?: SVGCircleElement,
  movedCoordinates: SVGPoint[],
  downPoint?: SVGPoint,
}} State

@typedef {{
  instance: SvgEditorContainer,
  id: string,
  coordinates: SVGPoint[],

  onChange: (coordinates: SVGPoint[], id: string) => void,
}} Props

@typedef {EditPolygonContainer & State & Props} RenderProps
*/
