/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';

import EditPolygonContainer from '../../../containers/SvgEditor/Polygon/EditPolygonContainer';
import withContainer from '../../../utils/withContainer';

/** @type {React.FC<Props>} */
const EditPolygon = ({
  className,
  id,
  enableEdge,
  enableMove,

  // EditPolygonContainer
  setRef,
  movedCoordinates,
}) => (
  <g id={id} className={className}>
    {enableMove && (
      <polygon
        id={`polygon-${id}`}
        ref={setRef}
        // ref={enableMove ? setRef : null}

        points={movedCoordinates.map(({ x, y }) => `${x},${y}`).join(' ')}
      />
    )}

    {movedCoordinates.map(({ x, y }, index, arr) => {
      const nextIndex = (index + 1) % movedCoordinates.length;
      const p2 = arr[nextIndex];

      return (
        <line
          id={`line-${id}-${index}`}
          key={`line-${id}-${index}`}

          x1={x}
          y1={y}
          x2={p2.x}
          y2={p2.y}
          stroke="black"
        />
      );
    })}

    {enableEdge && movedCoordinates.map(({ x, y }, index) => (
      <circle
        id={`circle-${id}-${index}`}
        key={`circle-${id}-${index}`}
        ref={setRef}
        data-index={index}

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
  enableEdge: PropTypes.bool.isRequired,
  enableMove: PropTypes.bool.isRequired,

  // [Container] EditPolygonContainer
  setRef: PropTypes.func.isRequired,
  movedCoordinates: PropTypes.arrayOf(Object).isRequired,
}

export default withContainer(EditPolygonContainer, EditPolygon);

/**
@typedef {{
  className: string
  id: string,
  coordinates: SVGPoint[],

  enableEdge: boolean,
  enableMove: boolean,
} & import('../../../containers/SvgEditor/Polygon/EditPolygonContainer').RenderProps} Props
*/