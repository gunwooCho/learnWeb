import PropTypes from 'prop-types';
import React from 'react';

import { ButtonStyled } from './ButtonStyled';

/**
 * @type {React.FC<ButtonProps>}
 * Primary UI component for user interaction
 */
export const Button = ({
  primary, backgroundColor, size, label, ...props
}) => (
  <ButtonStyled
    primary={primary}
    size={size}
    style={backgroundColor && { backgroundColor }}
    {...props}
  >
    {label}
  </ButtonStyled>
);

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

export default Button;

/**
@typedef {
  React.ButtonHTMLAttributes<HTMLButtonElement>
  & {
    primary: boolean,
    backgroundColor: string,
    size: string,
    label: React.ReactNode,
  }
} ButtonProps
*/
