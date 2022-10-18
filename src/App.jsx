import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './components/pages/Profile';
import TweetPage from './components/tweets/TweetPage';
import { login, logout, selectUser } from './features/userSlice';
import ProtectedRoute from './components/functionality/ProtectedRoute';

import CircularProgress from '@material-ui/core/CircularProgress';

import { auth } from './app/config/firebase';
import OtherProfilePage from './components/pages/OtherProfilePage';
import Explore from './components/pages/Explore';
import Messages from './components/pages/Messages';
import Notifications from './components/pages/Notifications';

function App() {
	const user = useSelector(selectUser);

	const dispatch = useDispatch();

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				if (user.displayName) {
					// login
					dispatch(
						login({
							uid: user.uid,
							email: user.email,
							displayName: user.displayName,
							photoURL: user.photoURL,
						})
					);
				} else {
					// register action dispatched there itself
				}
			} else {
				dispatch(logout());
			}
		});
		return () => unsub();
	}, []);

	return (
		<div className="App">
			{user.dataStatus === 'loading' ? (
				<CircularProgress />
			) : (
				<BrowserRouter>
					<Switch>
						<Route exact path="/login">
							{user.user ? <Redirect to="/" /> : <Login />}
						</Route>

						<Route exact path="/register">
							{user.user ? <Redirect to="/" /> : <Register />}
						</Route>

						<ProtectedRoute path="/">
							{user.user ? <Navbar /> : ''}
							<div className="App__content">
								<ProtectedRoute exact path="/">
									<Homepage />
								</ProtectedRoute>
								<ProtectedRoute exact path="/profile">
									<Profile />
								</ProtectedRoute>
								<ProtectedRoute exact path="/explore">
									<Explore />
								</ProtectedRoute>
								<ProtectedRoute exact path="/messages">
									<Messages />
								</ProtectedRoute>
								<ProtectedRoute exact path="/notifications">
									<Notifications />
								</ProtectedRoute>
								<ProtectedRoute exact path="/profile/:id">
									<OtherProfilePage />
								</ProtectedRoute>
								<ProtectedRoute exact path="/tweet/:id">
									<TweetPage />
								</ProtectedRoute>
							</div>
							{user.user ? <Sidebar /> : ''}
						</ProtectedRoute>

						<Route>
							<p>404</p>
						</Route>
					</Switch>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
