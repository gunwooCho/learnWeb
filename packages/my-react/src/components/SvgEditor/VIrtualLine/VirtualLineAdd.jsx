import PropTypes from 'prop-types';
import React from 'react';

import VirtualLineAddContainer from '../../../containers/SvgEditor/VirtualLine/VirtualLineAddContainer';
import withContainer from '../../../utils/withContainer';


/** @type {React.FC<Props>} */
const VirtualLineAdd = ({
  className,

  // VirtualLineAddContainer
  coordinates,

  // defaultProps
  stroke,
}) => (
  <g className={className} >
    {
      coordinates.length === 2 && (
        <line
          id='virtual-line-add'
          x1={coordinates[0].x}
          y1={coordinates[0].y}
          x2={coordinates[1].x}
          y2={coordinates[1].y}
          stroke={stroke}
        />
      )}
  </g>
);

VirtualLineAdd.defaultProps = {
  className: '',
  stroke: 'black',
};

VirtualLineAdd.propTypes = {
  className: PropTypes.string,
  stroke: PropTypes.string,

  // VirtualLineAddContainer
  coordinates: PropTypes.arrayOf(SVGPoint).isRequired,
};

export default withContainer(VirtualLineAddContainer, VirtualLineAdd);

/**
@typedef {{
  className: string
} & import('../../../containers/SvgEditor/VirtualLine/VirtualLineAddContainer').RenderProps
} Props
*/