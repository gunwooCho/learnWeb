import PropTypes from 'prop-types';
import React from 'react';

import SvgEditorContainer from '../../containers/SvgEditorContainer';
import withContainer from '../../utils/withContainer';

import Polygon from './Polygon/Polygon';
import { BorderStyled, SvgStyled } from './SvgEditorStyled';

/** @type {React.FC<Props>} */
const SvgEditor = ({
  className,
  width,
  height,
  viewBox,

  // [Container] SvgEditorContainer
  setRef,
  setContainer,
  instance,
}) => (
  <BorderStyled width={width} height={height}>
    <SvgStyled className={className}
      viewBox={viewBox.join(' ')}
      ref={setRef}
    >
      <Polygon
        coordinates={[]}
        instance={instance}
        setContainer={setContainer}
      />
    </SvgStyled>
  </BorderStyled>
);

SvgEditor.defaultProps = {
  className: '',
  width: 640,
  height: 360,

  // [Container] SvgEditorContainer
};

SvgEditor.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,

  // [Container] SvgEditorContainer
  viewBox: PropTypes.arrayOf(Number).isRequired,
  setRef: PropTypes.func.isRequired,
  setContainer: PropTypes.func.isRequired,
  instance: PropTypes.instanceOf(Object).isRequired,
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
