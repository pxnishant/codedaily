import React from 'react';

export default function AfterLogin(userDetails) {
    const user = userDetails.user;

    const logout = () => {
        window.open(
          `${import.meta.env.VITE_API_URL}/auth/logout`,
          "_self"
        );
      };

  return (
    <div className="auth-home">
      <div className="button-div" id = "logout-button">
          <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
