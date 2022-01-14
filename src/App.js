import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Components/CreateProfile/Create";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
