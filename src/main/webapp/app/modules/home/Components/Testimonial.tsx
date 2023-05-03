import React from 'react';
import '../../../../content/images/john-doe-image.png';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading" style={{ fontSize: '40px' }}>
          What They Are Saying{' '}
        </p>
        {/*}  <h1 className="primary-heading" style={{ fontSize: '30px' }}>


        {/*}  <p className="primary-text">

        </p> */}
      </div>

      <div className="testimonial-section-bottom">
        <img src="../../../../content/images/john-doe-image.png" alt="" />
        <p>
          As a student ambassador, the thorough integration of the app in university would be really beneficial as its easier to post about
          clubs and events here
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Isha Ingersol</h2>
      </div>

      <div className="testimonial-section-bottom">
        <img src="../../../../content/images/My project-1 (2).png" alt="" />
        <p>As the dance club leader I think the website is good at helping us promote our events and get more people to join our club</p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Jana Khalifa</h2>
      </div>

      <div className="testimonial-section-bottom">
        <img src="../../../../content/images/My project-1 (1).png" alt="" />
        <p>The AISuggestion Bot helps us give prompts for the debate club and helps us get more ideas</p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Shailee Kampani</h2>
      </div>
    </div>
  );
};

export default Testimonial;
