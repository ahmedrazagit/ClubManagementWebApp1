import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  });

  return (
    <div className="p-5">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h4>Logged out successfully!</h4>
      </div>
    </div>
  );
};

export default Logout;
