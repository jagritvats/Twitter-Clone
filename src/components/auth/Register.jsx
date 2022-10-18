import { TextField } from '@material-ui/core';
import './Auth.css';
import './Register.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TwitterIcon from '@material-ui/icons/Twitter';
import { useDispatch } from 'react-redux';
import { auth, db, firestore } from '../../app/config/firebase';

import blank_profile_image from './blank_profile_img.png';
import useStorage from '../../hooks/useStorage';
import { login } from '../../features/userSlice';

function Register() {
	let [fname, setFname] = useState('');
	let [lname, setLname] = useState('');
	let [username, setUserName] = useState('');
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [img, setImg] = useState(null);
	let [bday, setbday] = useState('');
	let [Rerror, setRError] = useState(null);

	let [usernameError, setUserNameError] = useState(false);
	let [isEligible, setIsEligible] = useState(true);

	const dispatch = useDispatch();

	let { URL, loading, error } = useStorage(img);

	var [usernames, setUsernames] = useState([]);

	useEffect(() => {
		(async () => {
			let usernamesDoc = await db
				.collection('usernames')
				.doc('usernames')
				.get();
			setUsernames(usernamesDoc.data().usernames);
			console.log(usernames);
		})();
	}, []);

	const imgInput = (e) => {
		const file = e.target.files[0];
		setImg(file);
	};

	const doRegister = (e) => {
		e.preventDefault();
		if (!isEligible || loading || usernameError) {
			return;
		}

		const now = new Date();

		const userData = {
			fname,
			lname,
			username: username,
			email,
			photoURL: URL,
			bday,
			joinedAt: now.toUTCString(),
			tweets: [],
			likes: [],
			comments: [],
			following: [],
			followers: [],
			isVerified: false,
			uid: null,
		};
		auth.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userData.uid = userAuth.user.uid;
				userAuth.user
					.updateProfile({
						displayName: fname + ' ' + lname,
						photoURL: URL,
					})
					.then(() => {
						return db
							.collection('users')
							.doc(userAuth.user.uid)
							.set(userData)
							.then(() => {
								dispatch(login(userAuth.user));

								return db
									.collection('usernames')
									.doc('usernames')
									.update({
										usernames:
											firestore.FieldValue.arrayUnion(
												username
											),
									});
							});
					})
					.then(() => {
						db.collection('notifications').add({
							event: 'New User Joined!',
							eventAuthor: userData.uid,
						});
					});
			})
			.catch((err) => {
				setRError(err);
			});
	};
	return (
		<div className="auth register">
			<div className="auth__container">
				<div className="twittericon">
					<TwitterIcon />
				</div>

				<h1>Sign Up for Twitter</h1>
				<form className="auth__form" onSubmit={doRegister}>
					<div
						className={
							'register__image' +
							(loading ? ' uploading' : '') +
							(Rerror ? ' error' : '')
						}
					>
						<input
							color="primary"
							accept="image/*"
							type="file"
							onChange={imgInput}
							id="icon-button-file"
							style={{ display: 'none' }}
						/>
						<label htmlFor="icon-button-file">
							<img
								src={URL === null ? blank_profile_image : URL}
								alt="profile_image"
								className="register__image"
							/>
						</label>
					</div>

					<div className="register__name">
						<TextField
							label="First Name"
							variant="outlined"
							type="text"
							value={fname}
							onChange={(e) => setFname(e.target.value)}
							required
						/>
						<TextField
							label="Last Name"
							variant="outlined"
							type="text"
							value={lname}
							onChange={(e) => setLname(e.target.value)}
						/>
					</div>
					<TextField
						label="Username"
						variant="outlined"
						type="text"
						value={username}
						onChange={(e) => {
							const userName = e.target.value.trim();
							// validate username uniquness
							//    .data()
							// const usernames = ['user','admin']; //fetch from firestore
							console.log(usernames);
							if (usernames.includes(userName)) {
								setUserNameError(
									'This username is already taken'
								);
							} else if (username.includes(' ')) {
								setUserNameError(
									'No spaces allowed in username'
								);
							} else {
								setUserNameError(false);
							}
							setUserName(userName);
						}}
						required
					/>
					{usernameError ? (
						<p className="register__validate">{usernameError}</p>
					) : (
						''
					)}
					{/* SAdd loading circle for loading of username */}
					<TextField
						label="Email"
						variant="outlined"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<TextField
						label="Password"
						variant="outlined"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<TextField
						label="Birthday"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						value={bday}
						required
						onChange={(e) => {
							setbday(e.target.value);
							var today = new Date();
							var birthDate = new Date(e.target.value);
							var age =
								today.getFullYear() - birthDate.getFullYear();
							var m = today.getMonth() - birthDate.getMonth();
							if (
								m < 0 ||
								(m === 0 &&
									today.getDate() < birthDate.getDate())
							) {
								age--;
							}
							if (age < 13) {
								setIsEligible(false);
							} else {
								setIsEligible(true);
							}
						}}
					/>
					{!isEligible ? (
						<p className="register__validate">
							You should be atleast 13 years old
						</p>
					) : (
						''
					)}
					{Rerror ? <p className="error">{Rerror.message}</p> : ''}
					{error ? <p className="error">{error.message}</p> : ''}
					<button
						type="submit"
						className="auth__submit"
						disabled={!isEligible || usernameError || loading}
					>
						Register
					</button>
				</form>

				<Link to="/login">Already have an account?</Link>
			</div>
		</div>
	);
}

export default Register;
