import { FaCog, FaCross, FaQuestion, FaQuestionCircle, FaUser } from 'react-icons/fa';

import './home.scss';

//import { FaHome, FaBullhorn, FaUniversity, FaUsers, FaEnvelope, FaComments, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../content/images/sustainabilitymenews_2023-02_24773145-72a9-4f49-8744-aea8a497aede_Zayed_University_Sustainability_Club_Hosts_Discussion_on_the__Path_to_COP28__2.png';
import '../../../content/images/student-life-student-activities-1920x1080.png';
import '../../../content/images/football.png';
import WebFont from 'webfontloader';
import SpeechNav from 'app/modules/home/speechnavigation';
import Chatbutton from 'app/modules/chatbot/Chatbutton';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEvent } from 'app/shared/model/event.model';
import { getEntities } from 'app/entities/event/event.reducer';
//IMP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './Components/Home';
import About from './Components/About';
import Work from './Components/Work';
import Testimonial from './Components/Testimonial';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import { Row, Col, Alert, Nav, NavLink } from 'reactstrap';

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import { Row, Col, Alert } from 'reactstrap';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import MyApp from 'src/main/webapp/app/modules/components/App';

import Event from 'app/modules/administration/event/event';
import { map } from 'lodash';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from 'app/modules/chatbot/ActionProvider';
import MessageParser from 'app/modules/chatbot/MessageParser';
import config from 'app/modules/chatbot/config';

export const Homes = () => {
  const account = useAppSelector(state => state.authentication.account);
  const [value, onChange] = useState(new Date());
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  //Chatbot code
  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    console.log(messages);
    return messages;
  };

  //Chatbot code ends

  useEffect(() => {
    document.title = 'Home Page';
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans'],
      },
    });
  }, []);

  {
    /*
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const eventList = useAppSelector(state => state.event.entities);
  const loading = useAppSelector(state => state.event.loading);
  const totalItems = useAppSelector(state => state.event.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };
*/
  }
  return (
    <main className="body" style={{ background: 'linear-gradient(45deg, #ffb6c1, #87ceeb)' }}>
      <SpeechNav />
      <Chatbutton />
      {/*<div className="container" style={{ position: 'relative' }}>
        <img src="content/images/student-pic.jpg" alt="logo" style={{ width: '100%' }} />
        <div className="welcomeText"> Welcome to Clubping</div>
      </div>
      */}

      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="5000">
        <div className="App" style={{ background: 'linear-gradient(45deg, #ffb6c1, #87ceeb)' }}>
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
              <div className="carousel-text">
                <h1>Welcome to Clubping</h1>
              </div>
              <img
                src="../../../content/images/sustainabilitymenews_2023-02_24773145-72a9-4f49-8744-aea8a497aede_Zayed_University_Sustainability_Club_Hosts_Discussion_on_the__Path_to_COP28__2.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <div className="carousel-text">
                <h1>Welcome to Clubping</h1>
              </div>
              <img src="../../../content/images/student-life-student-activities-1920x1080.png" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <div className="carousel-text">
                <h1>Welcome to Clubping</h1>
              </div>
              <img src="../../../content/images/football.png" className="d-block w-100" alt="..." />
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
      </div>

      <Home />
      <About />
      <Work />
      <Testimonial />

      {/*}
          <div style={{marginRight: '10px'}} className="col-md-3 mb-3">
            <div className="card eventcard" style={{width: '18rem', marginRight: '10px'}}>
              <img src="content/images/elementor-placeholder-image.png" alt="Logo"/>
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                  card's content.</p>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

      */}

      {/* <div>
        <h2 id="event-heading" data-cy="EventHeading">
          <div className="d-flex justify-content-end">
            <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
              <FontAwesomeIcon icon="sync" spin={loading} />{' '}
              <Translate contentKey="teamprojectApp.event.home.refreshListLabel">Refresh List</Translate>
            </Button>
          </div>
        </h2>  */}

      {/*   <div className="container">
          <div className="row">
            {eventList && eventList.length > 0 && (
              <>
                {eventList.map((event, i) => (
                  <div style={{ marginRight: '10px' }} key={`entity-${i}`} data-cy="entityTable" className="col-md-3 mb-3">
                    <div className="card eventcard">
                      <img src="content/images/elementor-placeholder-image.png" alt="Logo" />
                      <div className="card-body">
                        <h5 className="card-title">{event.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {event.date ? <TextFormat type="date" value={event.date} format={APP_DATE_FORMAT} /> : null}
                        </h6>
                        <p className="card-text">{event.description}</p>
                        <Button tag={Link} to={`/event/${event.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {/*: (
              !loading && (
                <div className="alert alert-warning">
                  <Translate contentKey="teamprojectApp.event.home.notFound">No Events found</Translate>
                </div>
              )
              */}
      {/*     </div>
        </div>

        {totalItems ? (
          <div className={eventList && eventList.length > 0 ? '' : 'd-none'}>
            <div className="justify-content-center d-flex">
              <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
            </div>
            <div className="justify-content-center d-flex">
              <JhiPagination
                activePage={paginationState.activePage}
                onSelect={handlePagination}
                maxButtons={5}
                itemsPerPage={paginationState.itemsPerPage}
                totalItems={totalItems}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div> */}
    </main>
  );
};

export default Homes;
