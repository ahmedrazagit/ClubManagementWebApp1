import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Event from './event';
import GDPR from './gdpr';
import ExtendEvent from './extend-event';
import Clubs from './clubs';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="event/*" element={<Event />} />
        {/*<Route path="gdpr/*" element={<GDPR />} />*/}
        <Route path="extend-event/*" element={<ExtendEvent />} />
        <Route path="clubs/*" element={<Clubs />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
