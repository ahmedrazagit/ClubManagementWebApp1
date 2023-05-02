import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { FaHome, FaBullhorn, FaUniversity, FaUsers, FaEnvelope, FaComments, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { BsRobot } from 'react-icons/bs';
import { SiOpenai } from 'react-icons/si';
import { FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };

  {
    /*const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;*/
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <>
      <div
        className="offcanvas offcanvas-start tabindex={-1} text-white"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-muted small fw-bold text-uppercase px-3" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <nav className="navbar-dark">
            <ul className="navbar-nav">
              <li>
                <div className="text-muted small fw-bold text-uppercase px-3">CORE</div>
              </li>
              <li>
                <a href="/events-page" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <FaUsers />
                  </span>
                  <span>Events</span>
                </a>
              </li>
              <li>
                <a href="/clubs" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <FaUsers />
                  </span>
                  <span>Clubs</span>
                </a>
              </li>
              <li>
                <a href="/announcements" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <FaBullhorn />
                  </span>
                  <span>Announcements</span>
                </a>
              </li>
              <li>
                <a href="/universities" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <FaUniversity />
                  </span>
                  <span>Universities</span>
                </a>
              </li>
              <li>
                <a href="/messages" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <FaComments />
                  </span>
                  <span>Messages</span>
                </a>
              </li>
              <li>
                <a href="/forum" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <FaEnvelope />
                  </span>
                  <span>Forum</span>
                </a>
              </li>
              <li>
                <a href="/gallery" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <FaInstagram />
                  </span>
                  <span>Social Gallery</span>
                </a>
              </li>
              <li>
                <a href="/openAIChatBox" className="nav-link px-3 active">
                  {/*<span className="me-2"><i className="bi bi-speedometer2"></i></span>*/}
                  <span className="me-2">
                    <BsRobot />
                  </span>
                  <span>AI Advice Bot</span>
                </a>
              </li>

              <li>
                <a href="/profile" className="nav-link px-3 active">
                  <span className="me-2">
                    <ImProfile />
                  </span>
                  <span>Profile</span>
                </a>
              </li>

              <li className="my-4">
                <hr className="dropdown-divider bg-light" />
              </li>
              <li>
                <div className="text-muted small fw-bold text-uppercase px-3 mb-3"></div>
              </li>

              <li className="my-4">
                <hr className="dropdown-divider bg-light" />
              </li>

              <li>
                <div className="text-muted small fw-bold text-uppercase px-3 mb-3">Socials</div>
              </li>
              <li>
                <a
                  href="https://twitter.com/unibirmingham?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                  className="nav-link px-3"
                >
                  <span className="me-2">
                    <FaTwitter />
                  </span>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/unibirmingham/" className="nav-link px-3">
                  <span className="me-2">
                    <FaFacebookF />
                  </span>
                  <span>FaceBook</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/unibirmingham/?hl=en" className="nav-link px-3">
                  <span className="me-2">
                    <FaInstagram />
                  </span>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div id="app-header">
        {/*{renderDevRibbon()}*/}
        <LoadingBar className="loading-bar" />
        <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
          <Brand /> {/*this is the logo*/}
          <Collapse isOpen={menuOpen} navbar>
            <Nav id="header-tabs" className="ms-auto" navbar>
              <Home />
              {/*{props.isAuthenticated && <EntitiesMenu />}*/}
              {props.isAuthenticated && props.isAdmin && (
                <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction} />
              )}
              {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
              <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
              <AccountMenu isAuthenticated={props.isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
