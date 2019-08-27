import React from 'react';
import { Link } from 'react-router-dom';
import { StyledHeader } from '../components/componentStyles/HeaderStyles';
import logo from '../assets/logo.png';
const Header = props => {
  return (
    <StyledHeader landing={props.landing}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="auth">
        <button>Sign Up</button>
        <button>Login</button>
      </div>
    </StyledHeader>
  );
};

export default Header;