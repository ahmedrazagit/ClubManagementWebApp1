import React from 'react';

import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container"></div>
        <div className="home-text-section">
          <h1 className="primary-heading">Join the club now!</h1>
          <p className="primary-text">One place for all your university</p>
          <button className="secondary-button">
            Order Now <FiArrowRight />{' '}
          </button>
        </div>
        <div className="home-image-section"></div>
      </div>
    </div>
  );
};

export default Home;
