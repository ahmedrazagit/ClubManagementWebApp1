import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ExtendedEvents from './extended-events';
import ExtendedEventsDetail from './extended-events-detail';
import ExtendedEventsUpdate from './extended-events-update';
import ExtendedEventsDeleteDialog from './extended-events-delete-dialog';

const ExtendedEventsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ExtendedEvents />} />
    <Route path="new" element={<ExtendedEventsUpdate />} />
    <Route path=":id">
      <Route index element={<ExtendedEventsDetail />} />
      <Route path="edit" element={<ExtendedEventsUpdate />} />
      <Route path="delete" element={<ExtendedEventsDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ExtendedEventsRoutes;
