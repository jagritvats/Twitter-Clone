import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { selectUser } from '../../features/userSlice';

const ProtectedRoute = (props) => {
	const user = useSelector(selectUser);
	return (
		<Route {...props}>
			{user.user ? props.children : <Redirect to="login" />}
		</Route>
	);
};

export default ProtectedRoute;
