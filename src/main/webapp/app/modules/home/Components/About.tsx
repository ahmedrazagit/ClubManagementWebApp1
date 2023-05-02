import { Link } from 'react-router-dom';
import '../../../../content/images/event.png';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import React from 'react';

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container"></div>
      <div className="about-section-image-container">
        <img src="../../../../content/images/event.png" alt="" />
      </div>

      <div className="about-section-text-container">
        <p className="primary-subheading" style={{ fontSize: '60px' }}>
          About
        </p>
        <h1 className="primary-heading" style={{ fontSize: '40px' }}>
          This is a space dedicated for promoting an enriching Student social life at University!{' '}
        </h1>
        <p className="primary-text" style={{ fontSize: '20px' }}>
          Such a digital platform is designed to make your college social and cultural scene an unforgettable experience. Using our
          organizational tools, students will never be able to miss out on opportunities to portray their talents, enhance their skills,
          promote community engagement and have fun, as our website facilitates as a medium, you can view all these openings and events at.
          Catch up with fests and events hosted by universities happening all across UAE.
        </p>
        <p className="primary-text">Catch up with fests and events hosted by Universities, happening all across UAE! .</p>
        <div className="about-buttons-container">
          <Link to="/events">
            <button className="secondary-button">View Events happening now!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
