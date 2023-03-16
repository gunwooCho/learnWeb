import PropTypes from 'prop-types';
import React from 'react';

import EditPolygonContainer from '../../../containers/SvgEditor/Polygon/EditPolygonContainer';
import withContainer from '../../../utils/withContainer';

/** @type {React.FC<Props>} */
const EditPolygon = ({
  className,
  id,
  coordinates,

  // AddPolygonContainer
}) => (
  <g id={id} className={className}>
    {coordinates.map(({ x, y }, index, arr) => {
      const nextIndex = (index + 1) % coordinates.length;
      const p2 = arr[nextIndex];

      return (
        <line
          key={`line-${id}-${x}${y}`}
          x1={x}
          y1={y}
          x2={p2.x}
          y2={p2.y}
          stroke="black"
        />
      );
    })}

    {coordinates.map(({ x, y }) => (
      <circle
        key={`circle-${id}-${x}${y}`}
        cx={x}
        cy={y}
        r="10"
      />
    ))}
  </g>
)

EditPolygon.defaultProps = {
  className: '',
}

EditPolygon.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(Object).isRequired,

  // [Container] AddPolygonContainer
}

export default withContainer(EditPolygonContainer, EditPolygon);

/**
@typedef {{
  className: string
  id: string,
  coordinates: SVGPoint[],
} & import('../../../containers/SvgEditor/Polygon/AddPolygonContainer').RenderProps} Props
*/