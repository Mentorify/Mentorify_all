import logo from "./logo.svg"
import "./App.css"
import { Link } from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3 className='h3 mb-4'>Career Clarify Test</h3>
        <p
          style={{
            fontSize: "15px",
          }}
        >
          <em>
            Check any items that seem to apply to you. You may check as many as
            you like. Please have a good time and enjoy yourself!
          </em>
        </p>

        <Link className='btn btn-info btn-rounded' to='/test'>
          Let's take the test
        </Link>
      </header>
    </div>
  )
}

export default App
