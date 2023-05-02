import React from 'react';
import '../../../../content/images/cllub.png';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section"></div>
        <div className="home-image-section">
          <img src="../../../../content/images/cllub.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
