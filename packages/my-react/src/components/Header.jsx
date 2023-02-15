import PropTypes from 'prop-types';
import React from 'react';

import { Button } from './Button';
import {
  HeaderStyled, TitleStyled, WelcomeStyled, WrapperStyled,
} from './HeaderStyled';
import { Logo } from './Logo';

export const Header = ({
  user, onLogin, onLogout, onCreateAccount,
}) => (
  <HeaderStyled>
    <WrapperStyled>
      <div>
        <Logo />
        <TitleStyled>Acme</TitleStyled>
      </div>

      <div>
        {user ? (
          <>
            <WelcomeStyled>
              Welcome, <b>{user.name}</b>!
            </WelcomeStyled>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </div>
    </WrapperStyled>
  </HeaderStyled>
);

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;
