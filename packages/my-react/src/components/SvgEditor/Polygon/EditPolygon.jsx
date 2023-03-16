/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';

import EditPolygonContainer from '../../../containers/SvgEditor/Polygon/EditPolygonContainer';
import withContainer from '../../../utils/withContainer';

/** @type {React.FC<Props>} */
const EditPolygon = ({
  className,
  id,

  // EditPolygonContainer
  setRef,
  movedCoordinates,
}) => (
  <g id={id} className={className}>
    {movedCoordinates.map(({ x, y }, index, arr) => {
      const nextIndex = (index + 1) % movedCoordinates.length;
      const p2 = arr[nextIndex];

      return (
        <line
          key={`line-${id}-${index}`}
          x1={x}
          y1={y}
          x2={p2.x}
          y2={p2.y}
          stroke="black"
        />
      );
    })}

    {movedCoordinates.map(({ x, y }, index) => (
      <circle
        id={index}
        ref={setRef(index)}
        key={`circle-${id}-${index}`}
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
  movedCoordinates: PropTypes.arrayOf(Object).isRequired,

  // [Container] AddPolygonContainer
  setRef: PropTypes.func.isRequired,
}

export default withContainer(EditPolygonContainer, EditPolygon);

/**
@typedef {{
  className: string
  id: string,
  coordinates: SVGPoint[],
} & import('../../../containers/SvgEditor/Polygon/EditPolygonContainer').RenderProps} Props
*/