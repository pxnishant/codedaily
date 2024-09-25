import React from 'react';

export default function Login({title}) {

	const googleAuth = () => {
		window.open(
			`${import.meta.env.VITE_API_URL}/auth/google/`,
			"_self"
		);
	};


  return (
    <div className="button-div">
        <button onClick = {googleAuth}>{title}</button>
    </div>
  );
}
