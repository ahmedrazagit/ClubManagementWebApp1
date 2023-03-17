import React from 'react';
import { Translate } from 'react-jhipster';
import './header.scss';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <button type="button" className="btn btn-primary btn-sm black-button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">ClubPing</Translate>
    </span>
    {/*<span className="navbar-version">{VERSION}</span>*/}
  </button>
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
