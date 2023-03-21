import PropTypes from 'prop-types';
import React from 'react';

import AddPolygonContainer from '../../../containers/SvgEditor/Polygon/AddPolygonContainer';
import withContainer from '../../../utils/withContainer';

/** @type {React.FC<Props>} */
const AddPolygon = ({
  className,

  // AddPolygonContainer
  coordinates,
}) => (
  <g className={className}>
    <polygon points={coordinates.map(({ x, y }) => `${x},${y}`).join(' ')} stroke='red' />
  </g>
);


AddPolygon.defaultProps = {
  className: '',
}

AddPolygon.propTypes = {
  className: PropTypes.string,

  // [Container] AddPolygonContainer
  coordinates: PropTypes.arrayOf(SVGPoint).isRequired,
}

export default withContainer(AddPolygonContainer, AddPolygon);

/**
@typedef {{
  className: string
} & import('../../../containers/SvgEditor/Polygon/AddPolygonContainer').RenderProps} Props
*/