import { createContext, useEffect, useReducer } from "react"

const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "LOGIN", payload: user })
    }
  }, [])

  console.log("state is", state)
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
