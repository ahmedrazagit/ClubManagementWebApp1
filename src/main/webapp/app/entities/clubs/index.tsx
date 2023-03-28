import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Clubs from './clubs';
import ClubsDetail from './clubs-detail';
import ClubsUpdate from './clubs-update';
import ClubsDeleteDialog from './clubs-delete-dialog';

const ClubsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Clubs />} />
    <Route path="new" element={<ClubsUpdate />} />
    <Route path=":id">
      <Route index element={<ClubsDetail />} />
      <Route path="edit" element={<ClubsUpdate />} />
      <Route path="delete" element={<ClubsDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ClubsRoutes;
