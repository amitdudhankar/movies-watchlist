// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000; /* Ensure it's above other content */
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #f0f0f0;
  }

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #f0f0f0;
    transition: width 0.3s ease;
    position: absolute;
    left: 0;
    bottom: -5px;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/watchlist">Watchlist</NavLink>
      <NavLink to="/genres">Genres</NavLink>
      {/* Add more NavLink components for additional links */}
    </Nav>
  );
};

export default Navbar;
