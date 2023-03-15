import PropTypes from 'prop-types';
import React from 'react';

import SvgEditorContainer from '../../containers/SvgEditorContainer';
import withContainer from '../../utils/withContainer';

import AddPolygon from './AddPolygon';
import { BorderStyled, SvgStyled } from './SvgEditorStyled';

/** @type {React.FC<Props>} */
const SvgEditor = ({
  className,
  width,
  height,
  viewBox,
  useAdd,

  // [Container] SvgEditorContainer
  setRef,
  setContainer,
  getContainer,
}) => (
  <BorderStyled width={width} height={height}>
    <SvgStyled className={className}
      viewBox={viewBox.join(' ')}
      ref={setRef}
    >
      {useAdd && <AddPolygon setContainer={setContainer} getContainer={getContainer} />}
    </SvgStyled>
  </BorderStyled>
);

SvgEditor.defaultProps = {
  className: '',
  width: 640,
  height: 360,
  useAdd: true,

  // [Container] SvgEditorContainer
};

SvgEditor.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  useAdd: PropTypes.bool,

  // [Container] SvgEditorContainer
  viewBox: PropTypes.arrayOf(Number).isRequired,
  setRef: PropTypes.func.isRequired,
  setContainer: PropTypes.func.isRequired,
  getContainer: PropTypes.func.isRequired,
};

export default withContainer(SvgEditorContainer, SvgEditor);;

/**
@typedef {
  import('../../containers/SvgEditorContainer').RenderProps 
  & {
    width: number,
    height: number,
    viewBox: [number, number, number, number],
    useAdd: boolean,
  }
} Props
*/
