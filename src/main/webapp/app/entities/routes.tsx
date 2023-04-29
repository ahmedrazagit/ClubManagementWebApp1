import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Event from './event';

import ExtendEvent from './extend-event';
import Clubs from './clubs';
import Post from './post';

import GDPR from './gdpr';
import Comments from './comments';

import UniversityUser from './university-user';

import UniUser from './uni-user';

/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="event/*" element={<Event />} />

        <Route path="extend-event/*" element={<ExtendEvent />} />
        <Route path="clubs/*" element={<Clubs />} />
        <Route path="post/*" element={<Post />} />

        <Route path="gdpr/*" element={<GDPR />} />
        <Route path="comments/*" element={<Comments />} />

        <Route path="university-user/*" element={<UniversityUser />} />

        <Route path="uni-user/*" element={<UniUser />} />

        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
