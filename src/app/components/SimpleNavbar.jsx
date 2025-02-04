"use client"

// NavBar.js
import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SimpleNavbar = () => {


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900 bg-opacity-90`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Logo />
        <NavLinks />
      </div>
    </nav>
  );
};

export default SimpleNavbar;
