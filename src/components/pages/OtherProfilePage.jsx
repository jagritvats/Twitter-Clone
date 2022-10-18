import React, { useEffect, useState } from 'react';
import { db } from '../../app/config/firebase';
import Profile from './Profile';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';

function OtherProfilePage() {
	var userId = useParams().id;

	let [user, setUser] = useState(null);

	useEffect(() => {
		console.log(userId);
		db.collection('users')
			.doc(userId)
			.get()
			.then((doc) => {
				const user = doc.data();
				setUser(user);
			});
	}, [userId]);

	return (
		<>
			{!user ? (
				<CircularProgress />
			) : (
				<div>
					<Profile userProfile={user} />
				</div>
			)}
		</>
	);
}

export default OtherProfilePage;
