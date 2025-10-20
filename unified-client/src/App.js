import React, { createContext, useReducer } from 'react'
import CareerClarify from './CareerClarify'
import { AuthContextProvider } from './context/AuthContext'

export const UserContext = createContext()

const App = () => {
  return (
    <>
      {console.log('5th July Opti Test')}
      <AuthContextProvider>
        <CareerClarify />
      </AuthContextProvider>
    </>
  )
}

export default App
