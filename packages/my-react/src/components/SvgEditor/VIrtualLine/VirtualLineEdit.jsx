import PropTypes from 'prop-types';
import React from 'react';

/** @type {React.FC<Props>} */
const VirtualLineEdit = ({
    className,
}) => (
    <g className={className} />
);

VirtualLineEdit.defaultProps = {
    className: '',
};

VirtualLineEdit.propTypes = {
    className: PropTypes.string,
};

export default VirtualLineEdit;

/**
@typedef {{
  className: string
}} Props
*/