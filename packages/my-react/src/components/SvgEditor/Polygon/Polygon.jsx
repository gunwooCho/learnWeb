import PropTypes from 'prop-types';
import React from 'react';

import AddPolygon from './AddPolygon';
import EditPolygon from './EditPolygon';

/** @type {React.FC<Props>} */
const Polygon = ({
  // only add Props

  // only edit Props
  id,
  data,
  enableEdge,
  enableMove,

  // otherwise...
  ...rest
}) => {
  let component = (
    <AddPolygon
      {...rest}
    />
  );

  if (id && data.length) {
    component = (
      <EditPolygon
        id={id}
        data={data}
        enableEdge={enableEdge}
        enableMove={enableMove}
        {...rest}
      />
    );
  }

  return component;
};

Polygon.defaultProps = {
  // only add Props

  // only edit Props
  id: null,
  data: [],
  enableEdge: false,
  enableMove: true,
}

Polygon.propTypes = {
  // only add Props

  // only edit Props
  id: PropTypes.string,
  data: PropTypes.arrayOf(SVGPoint),
  enableEdge: PropTypes.bool,
  enableMove: PropTypes.bool,
}

export default Polygon;

/**
@typedef {{
  id?: string,
  data: SVGPoint[],

  enableEdge?: boolean,
  enableMove?: boolean,
}} Props

*/