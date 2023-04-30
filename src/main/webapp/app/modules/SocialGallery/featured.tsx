import React, { useEffect } from 'react';

export const Featured = () => {
  useEffect(() => {
    document.title = 'Featured';
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ marginRight: '50px' }}>
          <img src="/content/images/cute-robot.jpg" alt="Cute robot" />
        </div>
        <div>
          <h1
            style={{
              textAlign: 'left',
              fontSize: '36px',
              fontWeight: 'bold',
              background: '-webkit-linear-gradient(left, purple , pink)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Hey, looks like there is a new club in town!
          </h1>
          <p
            style={{
              fontSize: '25px',
              fontWeight: 'bold',
              background: '-webkit-linear-gradient(left, purple , pink)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginTop: '20px',
            }}
          >
            Wanna get your Instagram featured in our social gallery?
          </p>
          <p
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              background: '-webkit-linear-gradient(left, purple , pink)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginTop: '20px',
            }}
          >
            Just fill out the form below and we'll do it for you!
          </p>
        </div>
      </div>
      <div style={{ marginTop: '70px' }}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeCCc99dH_SZHg-2dHi3kpQ7bHea26eHPnRVEpm8WrzaU_22w/viewform?embedded=true"
          width="100%"
          height="800"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default Featured;
