import React from 'react';
import './ProfileSummary.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import blank_profile_img from './auth/blank_profile_img.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function ProfileSummary() {
	const user = useSelector(selectUser);

	return (
		<div className="profile">
			<div className="profile__img">
				<img
					src={
						user.user.photoURL
							? user.user.photoURL
							: blank_profile_img
					}
					alt=""
				/>
			</div>
			<div className="profile__info">
				<h4>{user.user.displayName}</h4>
				<p>@{user.userData.username}</p>
			</div>

			<div className="moreicon">
				<MoreHorizIcon />
			</div>
		</div>
	);
}

export default ProfileSummary;
