import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useNavigate } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { useState } from 'react';
function MySideNav() {
  const navigate = useNavigate();
  return (
    <SideNav
      onSelect={selected => {
        console.log(selected);
        navigate('/' + selected);
      }}
      className="sidenav"
    >
      <SideNav.Toggle />
      <SideNav.Nav>
        <NavItem eventKey="home">
          <NavIcon>
            <i className="fa-solid fa-home" style={{ fontSize: '1.5em' }} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem eventKey="Annoucement">
          <NavIcon>
            <i className="fa-solid fa-bullhorn" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText>Announcement</NavText>
        </NavItem>
        <NavItem eventKey="Events">
          <NavIcon>
            <i className="fa-solid fa-calendar-days" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText>Events</NavText>
        </NavItem>
        <NavItem eventKey="Message">
          <NavIcon>
            <i className="fa-solid fa-message" style={{ fontSize: '1.5em' }} />
          </NavIcon>
          <NavText>Message</NavText>
        </NavItem>
        <NavItem eventKey="Universities">
          <NavIcon>
            <i className="fa-solid fa-building-columns" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText>Universities</NavText>
        </NavItem>
        <NavItem eventKey="Clubs and Societies">
          <NavIcon>
            <i className="fa-solid fa-users" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText>Clubs and Societies</NavText>
        </NavItem>
        <NavItem eventKey="Forum">
          <NavIcon>
            <i className="fa-solid fa-cubes" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText>Forum</NavText>
        </NavItem>
        <NavItem eventKey="Twitter">
          <NavIcon>
            <i className="fa-brands fa-square-twitter" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText></NavText>
        </NavItem>
        <NavItem eventKey="FaceBook">
          <NavIcon>
            <i className="fa-brands fa-square-facebook" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText></NavText>
        </NavItem>
        <NavItem eventKey="Instagram">
          <NavIcon>
            <i className="fa-brands fa-square-instagram" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText></NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
export default MySideNav;
