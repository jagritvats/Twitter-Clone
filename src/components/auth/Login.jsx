import './Auth.css';
import { auth } from '../../app/config/firebase';
import { TextField } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [error, setError] = useState(null);

	const doLogin = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then(() => {
				setError(null);
			})
			.catch((err) => {
				setError(err);
			});
	};
	return (
		<div className="auth login">
			<div className="auth__container">
				<div className="twittericon">
					<TwitterIcon />
				</div>

				<h1>Log in to Twitter</h1>
				<form className="auth__form" onSubmit={doLogin}>
					<TextField
						required
						label="Email"
						variant="outlined"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						required
						label="Password"
						variant="outlined"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error ? <p className="error">{error.message}</p> : ''}
					<button type="submit" className="auth__submit">
						Login
					</button>
				</form>
				<Link to="/register">Sign up for Twitter</Link>
			</div>
		</div>
	);
}

export default Login;
