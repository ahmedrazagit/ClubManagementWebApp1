import React from 'react';

import '../../../../content/images/clubb.png';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container"></div>
        <div className="home-text-section">
          <h1 className="primary-subheading">Join the club now!</h1>
          <p className="primary-heading" style={{ fontSize: '30px' }}>
            Open for all university students in UAE
          </p>
          <button className="secondary-button">
            Order Now <FiArrowRight />{' '}
          </button>
        </div>
        <div className="home-image-section">
          <img src="../../../../content/images/clubb.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
