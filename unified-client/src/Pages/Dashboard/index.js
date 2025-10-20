import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard";
import reportWebVitals from "./reportWebVitals";
import Test from "./Test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/test-1' element={<Test />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
