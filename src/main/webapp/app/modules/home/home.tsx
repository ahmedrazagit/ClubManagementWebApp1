//import a sound button which plays metallica music:)
//import mp3File from "file:///C:/Users/xiao/Desktop/metallica.mp3";
//import mp3File from "./metallica.mp3";
import { FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';
import './home.scss';
import MySideNav from 'app/modules/components/SideBar';

import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

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

  function handleSettingsClick() {
    // Handle settings button click event
    console.error('Settings clicked');
  }

  function handleHelpClick() {
    // Handle help button click event
    console.error('Help clicked');
  }

  function handleUserProfileClick() {
    // Handle user profile button click event
    console.error('User profile clicked');
  }

  return (
    <main className="mt-5 pt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card" style={{ width: '18rem' }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card" style={{ width: '18rem' }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card" style={{ width: '18rem' }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card" style={{ width: '18rem' }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
