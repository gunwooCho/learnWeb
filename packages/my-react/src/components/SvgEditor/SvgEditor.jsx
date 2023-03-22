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
  instance,
}) => (
  <BorderStyled width={width} height={height}>
    <SvgStyled className={className}
      viewBox={viewBox.join(' ')}
      ref={setRef}
    >
      <Polygon
        id='1'
        instance={instance}
        data={[
          // test
          // { x: 150, y: 150 },
          // { x: 200, y: 150 },
          // { x: 200, y: 200 },
          // { x: 150, y: 200 },
        ]}
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
  instance: PropTypes.instanceOf(SvgEditorContainer).isRequired,
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
