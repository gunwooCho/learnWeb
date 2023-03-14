import PropTypes from 'prop-types';
import React from 'react';

import AddPolygonContainer from '../../containers/AddPolygonContainer';
import withContainer from '../../utils/withContainer';

const AddPolygon = ({
  setRef,
  className,
}) => <polygon className={className} ref={setRef} strokeWidth={1} stroke="red" />;

AddPolygon.defaultProps = {
  className: '',
}

AddPolygon.propTypes = {
  setRef: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default withContainer(AddPolygonContainer, AddPolygon);
