import PropTypes from 'prop-types';
import React from 'react';

import VirtualLineAdd from './VirtualLineAdd';
import VirtualLineEdit from './VirtualLineEdit';

/** @type {React.FC<Props>} */
const VirtualLine = ({
  // only add Props

  // only edit Props
  id,
  data,

  ...rest
}) => {
  let component = (
    <VirtualLineAdd
      {...rest}
    />
  );

  if (id && data) {
    component = (
      <VirtualLineEdit
        id={id}
        data={data}
        {...rest}
      />
    );
  }

  return component;
};

VirtualLine.defaultProps = {
  // only add Props

  // only edit Props
  id: null,
  data: null,
}

VirtualLine.propTypes = {
  // only add Props

  // only edit Props
  id: PropTypes.string,
  data: PropTypes.instanceOf(Object),
}

export default VirtualLine;

/**
@typedef {{
  id?: string,
  coordinates?: any,
}} Props
*/