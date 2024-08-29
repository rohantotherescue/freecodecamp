import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/images/google-logo.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to register the user
      console.log("this is the redirect url:")
      console.log(process.env.REACT_APP_BACKEND_BASEURL);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/signup`, {
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
        console.log("redirecting to sign in ");
        await navigate('/sign-in');
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      window.alert('An error occurred. Please try again later.');
    }
  };

  return (
      <div className="container">
      <div className="form-container">
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
            <label>Email</label>
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
          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
        <hr />
        <a href={`${process.env.REACT_APP_BACKEND_BASEURL}/api/auth/google`}>
  <button className="google-sign-in">
  <img   src={googleLogo} // Use the imported image
              alt="Google logo"
              className="google-logo"
            />
    Sign Up with Google
    </button>
</a>
      </div>
      </div>
  );
};

export default Register;
