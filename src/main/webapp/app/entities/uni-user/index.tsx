import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UniUser from './uni-user';
import UniUserDetail from './uni-user-detail';
import UniUserUpdate from './uni-user-update';
import UniUserDeleteDialog from './uni-user-delete-dialog';

const UniUserRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UniUser />} />
    <Route path="new" element={<UniUserUpdate />} />
    <Route path=":id">
      <Route index element={<UniUserDetail />} />
      <Route path="edit" element={<UniUserUpdate />} />
      <Route path="delete" element={<UniUserDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UniUserRoutes;
