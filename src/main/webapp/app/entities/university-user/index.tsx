import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UniversityUser from './university-user';
import UniversityUserDetail from './university-user-detail';
import UniversityUserUpdate from './university-user-update';
import UniversityUserDeleteDialog from './university-user-delete-dialog';

const UniversityUserRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UniversityUser />} />
    <Route path="new" element={<UniversityUserUpdate />} />
    <Route path=":id">
      <Route index element={<UniversityUserDetail />} />
      <Route path="edit" element={<UniversityUserUpdate />} />
      <Route path="delete" element={<UniversityUserDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UniversityUserRoutes;
