import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import GDPR from 'app/entities/gdpr/gdpr';
import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';

import Clubs from 'app/modules/clubs/clubs';
import Announcements from 'app/modules/announcements/announcements';
import Messages from 'app/modules/messages/messages';
import Forum from 'app/modules/forum/forum';
import Profile from 'app/modules/profile/profile';
import Universities from 'app/modules/universities/universities';
import ViewEvents from 'app/modules/view-events/view-events';
import OpenAIChat from 'app/modules/AIAdviceBot/OpenAIChatBox';
import Chatbotty from 'app/modules/chatbot/Chatbotty';

import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import AIAdviceBotPage from 'app/modules/AIAdviceBot/AIAdviceBotPage';

const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => loading,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => loading,
});

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route
          index
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="gdpr/*" element={<GDPR />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="events-page" element={<ViewEvents />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="messages" element={<Messages />} />
        <Route path="forum" element={<Forum />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="universities" element={<Universities />} />
        {/*<Route path="chatbot" element={<Chatbotty />} />*/}
        <Route path="OpenAIChatBox" element={<AIAdviceBotPage />} />
        <Route path="account">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>
        <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
