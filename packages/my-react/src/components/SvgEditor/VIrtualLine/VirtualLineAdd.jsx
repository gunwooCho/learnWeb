import PropTypes from 'prop-types';
import React from 'react';

import VirtualLineAddContainer from '../../../containers/SvgEditor/VirtualLine/VirtualLineAddContainer';
import withContainer from '../../../utils/withContainer';

/** @type {React.FC<Props>} */
const VirtualLineAdd = ({
  className,

  // VirtualLineAddContainer
  coordinates,
  arrowPoint,

  // defaultProps
  stroke,
}) => (
  <g className={className} >
    {
      coordinates.length === 2 && (
        <>
          <line
            id='virtual-line-add'

            x1={coordinates[0].x}
            y1={coordinates[0].y}

            x2={coordinates[1].x}
            y2={coordinates[1].y}

            stroke={stroke}
          />

          {arrowPoint && (
            <g transform={arrowPoint.gTransform}>
              <rect
                width={arrowPoint.width}
                height={arrowPoint.height}
                transform={`translate(-${arrowPoint.width / 2} -${arrowPoint.height / 2})`}
              />
            </g>
          )}
        </>
      )}
  </g>
);

VirtualLineAdd.defaultProps = {
  className: '',
  stroke: 'black',
  arrowPoint: null,
};

VirtualLineAdd.propTypes = {
  className: PropTypes.string,
  stroke: PropTypes.string,

  // VirtualLineAddContainer
  coordinates: PropTypes.arrayOf(SVGPoint).isRequired,
  arrowPoint: PropTypes.instanceOf(Object),
};

export default withContainer(VirtualLineAddContainer, VirtualLineAdd);

/**
@typedef {{
  className: string
} & import('../../../containers/SvgEditor/VirtualLine/VirtualLineAddContainer').RenderProps
} Props
*/