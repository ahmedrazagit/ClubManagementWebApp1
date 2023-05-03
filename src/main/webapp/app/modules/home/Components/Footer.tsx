import React from 'react';

import { BsTwitter } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';
import { BsYoutube } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src="../../../../content/images/new-clubping-logo.png" alt="" />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <a href="https://example.com/quality">
            <span>Quality</span>
          </a>
          <a href="https://example.com/help">
            <span>Help</span>
          </a>
          <a href="https://example.com/share">
            <span>Share</span>
          </a>
          <a href="https://example.com/careers">
            <span>Careers</span>
          </a>
          <a href="https://example.com/testimonials">
            <span>Testimonials</span>
          </a>
          <a href="https://example.com/work">
            <span>Work</span>
          </a>
        </div>
        <div className="footer-section-columns">
          <a href="tel:+24453337783">
            <span>244-5333-7783</span>
          </a>
          <a href="mailto:hello@food.com">
            <span>hello@food.com</span>
          </a>
          <a href="mailto:press@food.com">
            <span>press@food.com</span>
          </a>
          <a href="mailto:contact@food.com">
            <span>contact@food.com</span>
          </a>
        </div>
        <div className="footer-section-columns">
          <a href="https://example.com/terms">
            <span>Terms & Conditions</span>
          </a>
          <a href="https://example.com/privacy">
            <span>Privacy Policy</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
