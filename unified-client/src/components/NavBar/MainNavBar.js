import React, { useState, Link } from "react"
import { NavLink } from "react-router-dom"
import "./MainNavBar.css"
import useAuth from "../../Hooks/useAuth"
import RenderButtons from "./RenderButtons"
import { navItems } from "./NavItems"
import Dropdown from "./Dropdown"

const MainNavBar = () => {
  // eslint-disable-next-line
  const [dropdown, setDropdown] = useState(false)

  return (
    <>
      {/* <div id='main-nav-list'>
        <i class='fa-sharp fa-solid fa-outdent' id='bars2'></i>

        <ul id='main-navbar'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/services'>Our Services</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About Us</NavLink>
          </li>
          <li>
            <NavLink to='/gallery'>Gallery</NavLink>
          </li>
          <li>
            <NavLink to='/blog'>Blog</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact Us</NavLink>
          </li>
        </ul>

        <div id='main-btn'>
          <RenderButtons />
        </div>
      </div> */}
      <nav id='main-nav-list'>
        {/* <Link to="/" className="navbar-logo">
          <img src="../logo/logo.png" alt="logo" />
          
          
        </Link> */}
        <ul id='main-navbar'>
          {navItems.map((item) => {
            if (item.title === "Our Services") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
                  {dropdown && <Dropdown />}
                </li>
              )
            } else if (
              item.title === "For School" ||
              item.title === "For Student" ||
              item.title === "For Franchise"
            ) {
              return <></>
            }
            return (
              <li key={item.id} className={item.cName}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            )
          })}
        </ul>
        <div id='main-btn'>
          <RenderButtons />
        </div>
      </nav>
    </>
  )
}
export default MainNavBar