/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React from 'react';

export const DRAWING_MODE = Object.freeze({
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
})

/** @extends {React.Component<Props, State>} */
class SvgEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    /** @type {State} */
    this.state = {
      svg: null,
    };
  }

  /** @param {SVGSVGElement} ref */
  setRef = (ref = null) => {
    if (ref instanceof SVGSVGElement) {
      const { svg } = this.state;

      if (svg !== ref) {
        this.setState({ svg: ref });
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

SvgEditorContainer.defaultProps = {
}

SvgEditorContainer.propTypes = {
  render: PropTypes.func.isRequired,
}

export default SvgEditorContainer;

/**
@typedef {{
  svg?: SVGSVGElement,
}} State

@typedef {{
  render: React.FC,
}} Props

@typedef {SvgEditorContainer & State & Props} RenderProps
*/
