/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

export const DRAWING_MODE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
});

/** @extends {React.Component<Props>} */
class EditPolygonContainer extends React.Component {
  elementRefs = {};

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const { setContainer, coordinates } = props;

    setContainer(this);

    /** @type {State} */
    this.state = {
      ref: null,
      movedCoordinates: coordinates,
    };
  }

  componentDidUpdate(prevProps) {
    const { coordinates } = this.props;

    if (JSON.stringify(coordinates) !== JSON.stringify(prevProps.coordinates)) {
      this.setState({
        movedCoordinates: coordinates,
      });
    }
  }

  componentWillUnmount() {
    const { setContainer, instance } = this.props;
    const { state: { targetContainer } } = instance;

    if (targetContainer === this) {
      setContainer();
    }
  }

  setRef = (...args) => ref => {
    if (ref instanceof SVGCircleElement) {
      const [index] = args;

      if (this.elementRefs[index] !== ref) {
        this.elementRefs[index] = ref;
      }
    }
  }

  onMousedown = (event, point) => {
    this.setState({ ref: this.elementRefs[event.target.id] || null });
  }

  onMousemove = (event, point) => {
    const { ref, movedCoordinates } = this.state;
    if (ref === null) {
      return;
    }

    const coodinates = [...movedCoordinates];
    coodinates[ref.id] = point;

    this.setState({ movedCoordinates: coodinates })
  }

  onMouseup = (event, point) => {
    const { ref, movedCoordinates } = this.state;
    if (ref === null) {
      return;
    }

    const coodinates = [...movedCoordinates];
    coodinates[ref.id] = point;

    this.setState({ movedCoordinates: coodinates, ref: null })

    const { instance } = this.props;
    instance.onEnd();
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
}

EditPolygonContainer.propTypes = {
  render: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(Object).isRequired,

  // SvgEditorContainer
  setContainer: PropTypes.func.isRequired,
  instance: PropTypes.instanceOf(Object).isRequired,
}


export default EditPolygonContainer;

/**
@typedef {import('../../SvgEditorContainer').default} SvgEditorContainer

@typedef {{
  ref?: SVGCircleElement,
  movedCoordinates: SVGPoint[],
}} State

@typedef {{
  setContainer: (container: any) => void,
  instance: SvgEditorContainer,

}} Props
@typedef {EditPolygonContainer & Props & State} RenderProps
*/
