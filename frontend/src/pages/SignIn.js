import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const SignIn = () => {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_id, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        console.log(token);

        Cookies.set('jwtToken', token, { expires: 7 });
        console.log('Cookie set:', Cookies.get('jwtToken'));
        // Redirect to the courses page with the token
        await navigate('/courses');//, { state: { token } });
        console.log("after redirection to courses");
      } else {
        window.alert('Login Failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      window.alert('An error occurred. Please try again later.');
    }
  };

return (
      <div className="container mt-5">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
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
            Sign In
          </button>
        </form>
        <hr />
        <a href="http://localhost:5000/api/auth/google">
  <button>Sign In with Google</button>
</a>
      </div>
  );

};

export default SignIn;
