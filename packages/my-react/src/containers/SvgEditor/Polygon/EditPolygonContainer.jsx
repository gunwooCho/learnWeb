import PropTypes from 'prop-types';
import React from 'react';

export const DRAWING_MODE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
});

/** @extends {React.Component<Props>} */
class EditPolygonContainer extends React.Component {
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

  // SvgEditorContainer
  setContainer: PropTypes.func.isRequired,
  instance: PropTypes.instanceOf(Object).isRequired,
}


export default EditPolygonContainer;

/**
@typedef {import('./SvgEditorContainer').default} SvgEditorContainer

@typedef {{ }} State

@typedef {{
  setContainer: (container: any) => void,
  instance: SvgEditorContainer,

}} Props
@typedef {AddPolygonContainer & Props & State} RenderProps
*/
