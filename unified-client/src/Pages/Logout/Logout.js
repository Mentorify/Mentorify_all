import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"

const Logout = () => {
  // eslint-disable-next-line
  const { user, dispatch } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("user")
    navigate("/login")
  })
  return (
    <div>
      <h1>You have logged out.</h1>
      <h2>
        Go to Login Page <Link to='/login' />
      </h2>{" "}
    </div>
  )
}

export default Logout
