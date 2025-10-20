import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import MainNavBar from "../NavBar/MainNavBar";
import MobileNavBar from "../NavBar/MobileNavBar";

export const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const handleOpenNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <>
      <nav id='header'>
        {/* Navigation bar  */}
        <Link to='/'>
          <img alt='logo' src='../img/images/logo-m.png' />
        </Link>
        <i
          class='fa-sharp fa-solid fa-indent'
          id='bars1'
          onClick={handleOpenNav}></i>
        <MainNavBar />
        {openNav && <MobileNavBar handleOpenNav={handleOpenNav} />}
      </nav>
    </>
  );
};
