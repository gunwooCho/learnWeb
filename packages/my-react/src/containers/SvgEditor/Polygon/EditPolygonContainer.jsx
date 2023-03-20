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
  /** @type {{ [key: string | number]: SVGCircleElement }} */
  elementRefs = {};

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const { instance: { setContainer }, coordinates } = props;

    setContainer(this);

    /** @type {State} */
    this.state = {
      ref: null,
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

  setRef = (...args) => ref => {
    if (ref instanceof SVGCircleElement) {
      /** @type {[number]} */
      const [index] = args;

      if (this.elementRefs[index] !== ref) {
        this.elementRefs[index] = ref;
      }
    }
  }

  /** @param {MouseEvent} event */
  onMousedown = (event, point) => {
    this.setState({ ref: this.elementRefs[event.target.id] || null });
  }

  /** @param {SVGPoint} point */
  onMousemove = (event, point) => {
    const { ref, movedCoordinates } = this.state;
    if (ref === null) {
      return;
    }

    const coordinates = [...movedCoordinates];
    coordinates[ref.id] = point;

    this.setState({ movedCoordinates: coordinates })
  }

  /** @param {SVGPoint} point */
  onMouseup = (event, point) => {
    const { ref, movedCoordinates } = this.state;
    if (ref === null) {
      return;
    }

    const { instance, onChange, coordinates: oldCoordinates } = this.props;
    instance.onEnd();
    if (onChange) {
      const coordinates = [...movedCoordinates];
      coordinates[ref.id] = point;
      onChange(coordinates);
    }

    this.setState({ movedCoordinates: oldCoordinates, ref: null })
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
  coordinates: PropTypes.arrayOf(Object).isRequired,
  onChange: PropTypes.func,

  // SvgEditorContainer
  instance: PropTypes.instanceOf(SvgEditorContainer).isRequired,
}


export default EditPolygonContainer;

/**

@typedef {{
  ref?: SVGCircleElement,
  movedCoordinates: SVGPoint[],
}} State

@typedef {{
  instance: SvgEditorContainer,
  coordinates: SVGPoint[],
}} Props

@typedef {EditPolygonContainer & Props & State} RenderProps
*/
