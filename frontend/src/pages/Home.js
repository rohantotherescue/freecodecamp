import React from 'react';
import googleLogo from '../assets/images/google-logo-home.png';
import appleLogo from '../assets/images/apple-logo-home.png';
import netflixLogo from '../assets/images/netflix-logo-home.png';
import spotifyLogo from '../assets/images/spotify-logo-home.png';


const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to FreeCodeCamp!</h1>
      <h2 className="home-subtitle">Learn to code - for free.</h2>
      <h2 className="home-subtitle">Build Projects.</h2>
      <h2 className="home-subtitle">Earn Certifications.</h2>
      <p className="home-description">
        Since 2014, more than 40,000 FreeCodeCamp graduates have gotten jobs at tech companies including:
      </p>
      <ul class="icon-list">
        <li><img src={googleLogo} /></li>
        <li><img src={appleLogo} /></li>
        <li><img src={netflixLogo} /></li>
        <li><img src={spotifyLogo} /></li>
      </ul>
    </div>
  );
};

export default Home;
