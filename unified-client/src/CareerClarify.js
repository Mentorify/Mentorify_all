import React, { useContext } from "react"
import "./CareerClarify.css"
import Home from "./Pages/Home/Home"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import Services from "./Pages/Services/Services"
import About from "./Pages/About/About"
import Gallery from "./Pages/Gallery/Gallery"
import Blog from "./Pages/Blog/Blog"
import Contact from "./Pages/Contact/Contact"
import Signup from "./Pages/Signup/Signup"
import Login from "./Pages/Login/Login"
import Logout from "./Pages/Logout/Logout"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Test from "./Pages/Dashboard/Test"
import Test2 from "./Pages/Dashboard/Test2/Test2"
import Test3 from "./Pages/Dashboard/Test3/Test3"
import Test4 from "./Pages/Dashboard/Test4/Test4"
import Test5 from "./Pages/Dashboard/Test5/Test5"
import Test6 from "./Pages/Dashboard/Test6/Test6"
import Test7 from "./Pages/Dashboard/Test7/Test7"
import StudentReport from "./Pages/Dashboard/StudentReport"
import CombinedStudentReport from "./Pages/Dashboard/CombinedStudentReport"
import { UserContext } from "./App"
import useAuth from "./Hooks/useAuth"
import Individual from "./Pages/Individual/Individual"
import School from "./Pages/School/School"
import Franchise from "./Pages/Franchise/Franchise"

const CareerClarify = () => {
  const { user } = useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/gallery' element={<Gallery />} />
          <Route exact path='/blog' element={<Blog />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/individual' element={<Individual />} />
          <Route exact path='/school' element={<School />} />
          <Route exact path='/franchise' element={<Franchise />} />
          <Route
            exact
            path='/login'
            element={user ? <Navigate to='/dashboard' /> : <Login />}
          />
          <Route
            exact
            path='/signup'
            element={user ? <Navigate to='/dashboard' /> : <Signup />}
          />
          <Route exact path='/logout' element={<Logout />} />
          <Route exact path='/dashboard'>
            <Route
              index={true}
              element={user ? <Dashboard /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='test-1'
              element={user ? <Test /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='test-2'
              element={user ? <Test2 /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='test-3'
              element={user ? <Test3 /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='test-4'
              element={user ? <Test4 /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='test-5'
              element={user ? <Test5 /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='test-6'
              element={user ? <Test6 /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='test-7'
              element={user ? <Test7 /> : <Navigate to='/login' />}
            />
            <Route
              exact
              path='student-report'
              element={user ? <StudentReport /> : <Navigate to='/login' />}
            />
            <Route
              path='combined-student-report'
              element={<CombinedStudentReport />}
            />
          </Route>

          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default CareerClarify
