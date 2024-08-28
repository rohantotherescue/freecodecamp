import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import Cookies from 'js-cookie';

const Register = () => {
  const [name, setName] = useState('');
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to register the user
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email_id, password }),
      });

      // Parse the response
      const data = await response.json();
      
      // Display the response as a prompt
      window.alert(data.message || 'User registered successfully!');
      if (response.status === 200) {
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      window.alert('An error occurred. Please try again later.');
    }
  };

  return (
      <div className="container mt-5">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <hr />
        <a href="http://localhost:5000/api/auth/google">
  <button>Sign Up with Google</button>
</a>
      </div>
  );
};

export default Register;
