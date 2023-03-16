import PropTypes from 'prop-types';
import React from 'react';

import AddPolygon from './AddPolygon';
import EditPolygon from './EditPolygon';

/** @type {React.FC<Props>} */
const Polygon = ({
  coordinates,
  ...rest
}) => {
  let Component = AddPolygon;
  if (coordinates.length) {
    Component = EditPolygon;
  }

  return <Component coordinates={coordinates} {...rest} />;
};

Polygon.defaultProps = {
  className: '',
  coordinates: [],
}

Polygon.propTypes = {
  className: PropTypes.string,
  coordinates: PropTypes.arrayOf(Object),
}

export default Polygon;

/**
@typedef {{
  className: string
} & import('../../../containers/SvgEditor/Polygon/AddPolygonContainer').RenderProps} Props
*/