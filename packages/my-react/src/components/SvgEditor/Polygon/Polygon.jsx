import PropTypes from 'prop-types';
import React from 'react';

import AddPolygon from './AddPolygon';
import EditPolygon from './EditPolygon';

/** @type {React.FC<Props>} */
const Polygon = ({
  coordinates,
  ...rest
}) => {
  let component = <AddPolygon {...rest} />;
  if (coordinates.length) {
    component = <EditPolygon coordinates={coordinates} {...rest} />;
  }

  return component;
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
  coordinates: SVGPoint[],
}} Props

*/