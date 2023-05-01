import React from 'react';
import '../../../../content/images/users.png';
import '../../../../content/images/megaphone.png';
import '../../../../content/images/comment-alt.png';

const Work = () => {
  const workInfoData = [
    {
      image: '../../../../content/images/users.png',
      title: 'View all clubs in your university',
      text: "Check out the clubs page to lookout for clubs your're interested in.",
    },
    {
      image: '../../../../content/images/megaphone.png',
      title: 'Look out for Event opportunities',
      text: 'Stay up to date with all events and festivals you can join in UAE',
    },
    {
      image: '../../../../content/images/comment-alt.png',
      title: 'Dedicated space for club communication',
      text: 'A platform designed for ease in communication within university clubs and leaders',
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading" style={{ fontSize: '30px' }}>
          How It Works
        </h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla
          quam.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map(data => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
