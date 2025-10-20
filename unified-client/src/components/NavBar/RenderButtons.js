import React from "react"
import { NavLink } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
const RenderButtons = () => {
  const { user } = useAuth()
  if (user) {
    return (
      <>
        <button type='button' id='main-dashboard'>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </button>
        <button type='button' id='main-logout'>
          <NavLink to='/logout'>Logout</NavLink>
        </button>
      </>
    )
  } else {
    return (
      <>
        <button type='button' id='main-login'>
          <NavLink to='/login'>Log-in</NavLink>
        </button>
        <button type='button' id='main-signup'>
          <NavLink to='/signup'>Sign-up</NavLink>
        </button>
      </>
    )
  }
}

export default RenderButtons
