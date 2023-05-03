import React, { useEffect, useState } from 'react';
import { Tooltip } from 'bootstrap';
import './button.css';

const handleClickevent = () => {
  window.open('/event', '_blank');
};

const handleClickclub = () => {
  window.open('/clubs', '_blank');
};

const handleClickforum = () => {
  window.open('/forum', '_blank');
};

function MyButton(props) {
  return (
    <>
      <div className="booton">
        <button type="button" onClick={handleClickevent} className="btn btn-outline-primary">Events</button>
        <button type="button" onClick={handleClickclub} className="btn btn-outline-secondary">Clubs</button>
        <button type="button" onClick={handleClickforum} className="btn btn-outline-danger">Forum</button>
      </div>


    </>


  );
}

export default MyButton;
