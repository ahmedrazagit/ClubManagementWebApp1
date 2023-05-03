import React from 'react';
import { Translate } from 'react-jhipster';
import './header.scss';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faBars} size="2x" style={{ color: 'white' }} />
      <span style={{ color: 'white', marginTop: 5 }}>Menu</span>
    </div>
  </div>
);

export const Brand = () => (
  <a href="#" className="black-button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
    <BrandIcon />
  </a>
);

export const Logo = () => (
  <a href="/">
    <img style={{ width: 90, height: 60 }} src="content/images/new-clubping-logo.png" alt="Logo" />
  </a>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
