import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
import "./MobileNavBar.css"
import { navItems } from "./NavItems"
import Dropdown from "./Dropdown"

const MobileNavBar = ({ handleOpenNav }) => {
  // eslint-disable-next-line
  const { user } = useAuth()
  const RenderButtons = () => {
    if (user) {
      return (
        <>
          <button type='button' id='dashboard'>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </button>
          <button type='button' id='logout'>
            <NavLink to='/logout'>Logout</NavLink>
          </button>
        </>
      )
    } else {
      return (
        <>
          <button type='button' id='login'>
            <NavLink to='/login'>Log-in</NavLink>
          </button>
          <button type='button' id='signup'>
            <NavLink to='/signup'>Sign-up</NavLink>
          </button>
        </>
      )
    }
  }
  const [dropdown, setDropdown] = useState(true)

  return (
    <>
      <div id='mobile-nav-list'>
        <i
          class='fa-sharp fa-solid fa-outdent'
          id='bars2'
          onClick={handleOpenNav}
        ></i>

        {/* <ul id='mobile-navbar'>
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
        </ul> */}
        <ul id='mobile-navbar'>
          {navItems.map((item) => {
            return (
              <li key={item.id} className={item.cName}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            )
          })}
        </ul>
        <div id='btn'>
          <RenderButtons />
        </div>
      </div>
    </>
  )
}

export default MobileNavBar
