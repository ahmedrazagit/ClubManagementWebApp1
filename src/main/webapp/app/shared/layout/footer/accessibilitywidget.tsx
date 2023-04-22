import React, { useEffect } from 'react';

const UserWayWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('data-account', '2mFvl1fWXl');
    script.setAttribute('src', 'https://cdn.userway.org/widget.js');
    script.setAttribute('async', String(true));
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(d){
              var s = d.createElement("script");
              s.setAttribute("data-account", "2mFvl1fWXl");
              s.setAttribute("src", "https://cdn.userway.org/widget.js");
              s.setAttribute("async", true);
              (d.body || d.head).appendChild(s);
            })(document);
          `,
        }}
      />
      <noscript>
        Please ensure Javascript is enabled for purposes of <a href="https://userway.org">website accessibility</a>
      </noscript>
    </>
  );
};

export default UserWayWidget;
