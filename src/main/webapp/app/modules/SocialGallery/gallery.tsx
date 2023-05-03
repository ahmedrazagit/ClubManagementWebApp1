import React, { useEffect, useState } from 'react';
import './insta.css';
import axios from 'axios';

const Gallery = () => {
  const [accessToken, setAccessToken] = useState<string>(
    'IGQVJWS09rVmpWem5DZADdYSDRkcXM2aElHUkxjM3BCMThFZAEl1c1YtLTRjNVFSXzUtZAmsxVUk2bzFjRFA3OXc4dVlHX3Itdi1oT0kxeGlXY0FaWklxbnZAlSkFfRGEtV0dXaENjcDNrc2VUT3ljNXpsRgZDZD'
  );

  const [media, setMedia] = useState([]);

  const accounts = [
    {
      label: 'Select an account',
      token:
        'IGQVJWS09rVmpWem5DZADdYSDRkcXM2aElHUkxjM3BCMThFZAEl1c1YtLTRjNVFSXzUtZAmsxVUk2bzFjRFA3OXc4dVlHX3Itdi1oT0kxeGlXY0FaWklxbnZAlSkFfRGEtV0dXaENjcDNrc2VUT3ljNXpsRgZDZD',
    },
    {
      label: 'ClubPing Official Instagram',
      token:
        'IGQVJWS09rVmpWem5DZADdYSDRkcXM2aElHUkxjM3BCMThFZAEl1c1YtLTRjNVFSXzUtZAmsxVUk2bzFjRFA3OXc4dVlHX3Itdi1oT0kxeGlXY0FaWklxbnZAlSkFfRGEtV0dXaENjcDNrc2VUT3ljNXpsRgZDZD',
    },
    {
      label: 'UOBD Dance Club',
      token:
        'IGQVJWR2lwazBtdm1EeTN6MEtJa2lNN1U2Q2NON1hHbkxlSUpzaGUxUGwxQ1ZAoR05VUno1dTQtNk5oS004ZA3ZAxUC04b1BBQ2NfVF92b3M4ejJtWU02Qi1ZAZAHlCZAnhHczItTTRpRnFYaUJMYmE4YUw4UQZDZD',
    },
  ];

  useEffect(() => {
    if (accessToken) {
      axios
        .get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}&limit=12`
        )
        .then(response => {
          setMedia(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [accessToken]);

  return (
    <div>
      <div className="header">
        <span className="banner">Social Gallery</span>
        <a href="/featured" className="button">
          Wanna Get your club featured? Click Here
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
      {media.length > 0 && (
        <div id="instafeed" className="image-grid">
          {media.map(item => (
            <div key={item.id} className="image-container">
              <a href={item.permalink} target="_blank" rel="noopener noreferrer">
                {item.media_type === 'VIDEO' ? (
                  <video src={item.media_url} poster={item.thumbnail_url} controls />
                ) : (
                  <img src={item.media_url} alt={item.caption} />
                )}
              </a>
              <div className="image-caption">{item.caption}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;

/*import React, { useEffect, useState } from 'react';

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

export default Gallery;*/
