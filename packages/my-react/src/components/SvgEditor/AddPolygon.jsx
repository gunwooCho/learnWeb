import PropTypes from 'prop-types';
import React from 'react';

import AddPolygonContainer from '../../containers/AddPolygonContainer';
import withContainer from '../../utils/withContainer';

/** @type {React.FC<Props>} */
const AddPolygon = ({
  className,

  // [Container] AddPolygonContainer
  setRef,
}) => <polygon className={className} ref={setRef} strokeWidth={1} stroke="red" />;

AddPolygon.defaultProps = {
  className: '',
}

AddPolygon.propTypes = {
  className: PropTypes.string,

  // [Container] AddPolygonContainer
  setRef: PropTypes.func.isRequired,
}

export default withContainer(AddPolygonContainer, AddPolygon);

/**
@typedef {{
  className: string
} & import('../../containers/AddPolygonContainer').RenderProps} Props
*/