import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Courses from './pages/Courses';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/courses" 
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          } 
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
