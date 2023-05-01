import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ExtendClub from './extend-club';
import ExtendClubDetail from './extend-club-detail';
import ExtendClubUpdate from './extend-club-update';
import ExtendClubDeleteDialog from './extend-club-delete-dialog';

const ExtendClubRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ExtendClub />} />
    <Route path="new" element={<ExtendClubUpdate />} />
    <Route path=":id">
      <Route index element={<ExtendClubDetail />} />
      <Route path="edit" element={<ExtendClubUpdate />} />
      <Route path="delete" element={<ExtendClubDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ExtendClubRoutes;
