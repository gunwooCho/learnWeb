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
  svg,
  setRef,
}) => (
  <BorderStyled width={width} height={height}>
    <SvgStyled className={className}
      viewBox={viewBox.join(' ')}
      ref={setRef}
    >
      {useAdd && <AddPolygon svg={svg} viewBox={viewBox} />}
    </SvgStyled>
  </BorderStyled>
);

SvgEditor.defaultProps = {
  className: '',
  width: 640,
  height: 360,
  viewBox: [0, 0, 1920, 1080],
  useAdd: true,

  // [Container] SvgEditorContainer
  svg: null,
};

SvgEditor.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.arrayOf(Number),
  useAdd: PropTypes.bool,

  // [Container] SvgEditorContainer
  svg: PropTypes.instanceOf(Object),
  setRef: PropTypes.func.isRequired,
};

export default withContainer(SvgEditorContainer, SvgEditor);;

/**
@typedef {
  import('../../containers/SvgEditorContainer').RenderProps 
  & {
    width: number,
    height: number,
    viewBox: number[],
  }
} Props
*/
