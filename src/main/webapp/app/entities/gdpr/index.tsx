import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import GDPR from './gdpr';
import GDPRDetail from './gdpr-detail';

const GDPRRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<GDPR />} />
    <Route path=":id">
      <Route index element={<GDPRDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GDPRRoutes;
