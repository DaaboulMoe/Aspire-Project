import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import logo from '../../assets/Aspire-Software.png';

const Logo = styled(NavLink)({
  height: 50,
  marginRight: 'auto',
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'black',
  fontSize: '20px', 
  textTransform: 'uppercase',
  margin: '0 10px', 
  '&.active': {
    color: '#00A9B8',
  },
}));

const AppBarComponent = ({ isLoggedIn, onLogin, onLogout }) => {
   
  return (
    <AppBar position="static" sx={{ py: 5, background: "transparent", boxShadow: 'none', paddingLeft: 'none', paddingRight: '0px' }}> 
      <Toolbar style={{ padding: '0' }}>
        <Logo to="/">
          <img src={logo} alt="Logo" height="50" />
        </Logo> 
        <StyledNavLink
          to="/"
          end // Ensures that the link is only active when the path exactly matches "/"
        >
          Home
        </StyledNavLink>
        <StyledNavLink to="/createUser">
          Users
        </StyledNavLink>
        <StyledNavLink to="/usersDatabase">
          Database
        </StyledNavLink> 
        {isLoggedIn ? (
          <Button sx={{ color: "black", fontSize: "20px" }} onClick={onLogout}>Logout</Button>
        ) : (
          <Button sx={{ color: "white", fontSize: "20px", backgroundColor: "#00A9B8", borderRadius: "15px", marginLeft: '5px' }} onClick={onLogin}>Login</Button>
        )}
      </Toolbar> 
    </AppBar>
  );
};

export default AppBarComponent;
