import { FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';
import './home.scss';

import { FaHome, FaBullhorn, FaUniversity, FaUsers, FaEnvelope, FaComments, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

//IMP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Row, Col, Alert, Nav, NavLink } from 'reactstrap';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Translate } from 'react-jhipster';
//import { Row, Col, Alert } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import MyApp from 'src/main/webapp/app/modules/components/App';

import { useAppSelector } from 'app/config/store';
import Event from 'app/modules/administration/event/event';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const [value, onChange] = useState(new Date());

  return (
    <main className="mt-5 pt-3">
      {/*<div className="container" style={{ position: 'relative' }}>
        <img src="content/images/student-pic.jpg" alt="logo" style={{ width: '100%' }} />
        <div className="welcomeText"> Welcome to Clubping</div>
      </div>
      */}
      <div className="welcomeText" style={{ position: 'relative', textAlign: 'center' }}>
        {' '}
        Welcome to Clubping
      </div>

      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="content/images/elementor-placeholder-image.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="content/images/student-pic.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <div className="row">
          <div style={{ marginRight: '10px' }} className="col-md-3 mb-3">
            <div className="card eventcard" style={{ width: '18rem', marginRight: '10px' }}>
              {/*<img src={require('../../../content/images/elementor-placeholder-image.png')} className="card-img-top" />*/}
              <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginRight: '10px' }} className="col-md-3 mb-3">
            <div className="card eventcard" style={{ width: '18rem', marginRight: '10px' }}>
              {/*<img src={require('../../../content/images/elementor-placeholder-image.png')} className="card-img-top" />*/}
              <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginRight: '10px' }} className="col-md-3 mb-3">
            <div className="card eventcard" style={{ width: '18rem', marginRight: '10px' }}>
              {/*<img src={require('../../../content/images/elementor-placeholder-image.png')} className="card-img-top" />*/}
              <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginRight: '10px' }} className="col-md-3 mb-3">
            <div className="card eventcard" style={{ width: '18rem' }}>
              {/*<img src={require('../../../content/images/elementor-placeholder-image.png')} className="card-img-top" />*/}
              <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginRight: '10px' }} className="col-md-3 mb-3">
            <div className="card eventcard" style={{ width: '18rem' }}>
              {/*<img src={require('../../../content/images/elementor-placeholder-image.png')} className="card-img-top" />*/}
              <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginRight: '10px' }} className="col-md-3 mb-3">
            <div className="card eventcard" style={{ width: '18rem' }}>
              {/*<img src={require('../../../content/images/elementor-placeholder-image.png')} className="card-img-top" />*/}
              <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginRight: '10px' }} className="col-md-3 mb-3">
            <div className="card eventcard" style={{ width: '18rem' }}>
              {/*<img src={require('../../../content/images/elementor-placeholder-image.png')} className="card-img-top" />*/}
              <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
