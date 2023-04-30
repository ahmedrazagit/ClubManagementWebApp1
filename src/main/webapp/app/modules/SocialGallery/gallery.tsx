import React, { useEffect, useState } from 'react';
import Instafeed from 'app/modules/SocialGallery/instagramfeed';
import './insta.css';

const Gallery = () => {
  const [accessToken, setAccessToken] = useState<string>(
    'IGQVJWREtkSmUzZAVJ2SGtncWUzXzJINDktSUVldGM2ZAmEtUk0yeFl1WEZApYkgwV2RqYXZAyVmRmMWZAEblNOdVRiS0FDLVIwa05NR3JRRGlZASXdUa1N1ZA1luRm9ydy1TeFR5QThjUTdOUGx6S1BrNEoycAZDZD'
  );

  const accounts = [
    {
      label: 'Select a club',
      token:
        'IGQVJWREtkSmUzZAVJ2SGtncWUzXzJINDktSUVldGM2ZAmEtUk0yeFl1WEZApYkgwV2RqYXZAyVmRmMWZAEblNOdVRiS0FDLVIwa05NR3JRRGlZASXdUa1N1ZA1luRm9ydy1TeFR5QThjUTdOUGx6S1BrNEoycAZDZD',
    },
    {
      label: 'UOBD Dance Club',
      token:
        'IGQVJWR2lwazBtdm1EeTN6MEtJa2lNN1U2Q2NON1hHbkxlSUpzaGUxUGwxQ1ZAoR05VUno1dTQtNk5oS004ZA3ZAxUC04b1BBQ2NfVF92b3M4ejJtWU02Qi1ZAZAHlCZAnhHczItTTRpRnFYaUJMYmE4YUw4UQZDZD',
    },
    { label: 'Account 2', token: 'account2_token' },
    { label: 'Account 3', token: 'account3_token' },
  ];

  useEffect(() => {
    if (accessToken) {
      // Clear existing content of instafeed element
      document.getElementById('instafeed').innerHTML = '';

      const feed = new Instafeed({
        accessToken,
        limit: 12,
        template:
          '<div class="image-container"><a href="{{link}}"><img title="{{caption}}" src="{{image}}" /><div class="image-caption">{{caption}}</div></a></div>',
      });
      feed.run();
    }
  }, [accessToken]);

  return (
    <div>
      <div className="header">
        <span className="banner">Social Gallery</span>
        <a href="/featured" className="button">
          Wanna Get Featured
        </a>
        <div className="menu">
          <select className="account-select" onChange={e => setAccessToken(e.target.value)} value={accessToken}>
            {accounts.map(({ label, token }) => (
              <option key={token} value={token}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {accessToken && <div id="instafeed" className="image-grid"></div>}
    </div>
  );
};

export default Gallery;
