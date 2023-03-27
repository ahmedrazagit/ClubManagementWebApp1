import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ExtendEvent from './extend-event';
import ExtendEventDetail from './extend-event-detail';
import ExtendEventUpdate from './extend-event-update';
import ExtendEventDeleteDialog from './extend-event-delete-dialog';

const ExtendEventRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ExtendEvent />} />
    <Route path="new" element={<ExtendEventUpdate />} />
    <Route path=":id">
      <Route index element={<ExtendEventDetail />} />
      <Route path="edit" element={<ExtendEventUpdate />} />
      <Route path="delete" element={<ExtendEventDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ExtendEventRoutes;
