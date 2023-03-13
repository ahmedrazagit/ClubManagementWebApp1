//import a sound button which plays metallica music:)
//import mp3File from "file:///C:/Users/xiao/Desktop/metallica.mp3";
//import mp3File from "./metallica.mp3";
import { FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';
import './home.scss';

import React, { useState } from 'react';
//import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import MyApp from 'src/main/webapp/app/modules/components/App';

import { useAppSelector } from 'app/config/store';

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
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
        <button onClick={handleSettingsClick}>
          <FaCog />
        </button>
        <button onClick={handleHelpClick}>
          <FaQuestionCircle />
        </button>
        <button onClick={handleUserProfileClick}>
          <FaUser />
        </button>
      </div>
      <Col md="9">
        <h2>
          <Translate contentKey="home.title">Welcome to ClubPing Dashboard!</Translate>
        </h2>
        <p className="lead">
          <Translate contentKey="home.subtitle">This is your homepage</Translate>
        </p>
        <div id=".react-calendar">
          <Calendar onChange={onChange} value={value} />
        </div>

        {/* account?.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>

              <Link to="/login" className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
              </Link>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </Alert>

            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
              <Link to="/account/register" className="alert-link">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
          </div>
        ) */}

        {/*
        <p>
          <Translate contentKey="home.question">If you have any question on JHipster:</Translate>
        </p>

        <ul>
          <li>
            <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.homepage">JHipster homepage</Translate>
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.stackoverflow">JHipster on Stack Overflow</Translate>
            </a>
          </li>
          <li>
            <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.bugtracker">JHipster bug tracker</Translate>
            </a>
          </li>
          <li>
            <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.chat">JHipster public chat room</Translate>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.follow">follow @jhipster on Twitter</Translate>
            </a>
          </li>
        </ul>
        */}

        <p>
          <Translate contentKey="home.like">If you like JHipster, do not forget to give us a star on</Translate>{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Col>
    </Row>
  );
};

export default Home;
