import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Forum from './forum';
import ForumDetail from './forum-detail';
import ForumDeleteDialog from 'app/modules/forum/forum-delete-dialog';
import ForumUpdate from 'app/modules/forum/forum-update';

const ForumRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Forum />} />
    <Route path="new" element={<ForumUpdate />} />
    <Route path=":id">
      <Route index element={<ForumDetail />} />
      <Route path="edit" element={<ForumUpdate />} />
      <Route path="delete" element={<ForumDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ForumRoutes;
