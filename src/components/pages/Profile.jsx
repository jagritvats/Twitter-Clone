import React, { useState } from 'react';
import './Profile.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EventIcon from '@material-ui/icons/Event';
import Feed from '../Feed';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import { auth } from '../../app/config/firebase';

import { useHistory } from 'react-router-dom';

import blank_profile_img from '../auth/blank_profile_img.png';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

function Profile({ userProfile }) {
	const currentUser = useSelector(selectUser);

	let user = null;
	let otherProfile = true;
	if (userProfile) {
		if (currentUser.userData.uid === userProfile.uid) {
			user = currentUser;
			otherProfile = false;
		} else {
			user = { userData: userProfile };
		}
	} else {
		user = currentUser;
		otherProfile = false;
	}
	const displayName = user.userData.fname + ' ' + user.userData.lname;
	const joinedDate = new Date(Date.parse(user.userData.joinedAt));
	const joinedMonth = joinedDate.toLocaleString('default', { month: 'long' });

	let history = useHistory();

	let [selectedTab, setSelectedTab] = useState('Tweets');

	return (
		<div className="profilePage">
			<header className="profilePage__header">
				<ArrowBackIcon
					onClick={() => {
						history.goBack();
					}}
				/>
				<div className="profilePage__headerSummary">
					<h3>{displayName}</h3>
					<p>{user.userData.tweets.length} tweets</p>
				</div>
			</header>

			<div className="profilePage__info">
				<div className="profilePage__cover">
					<img src="" alt="" />
				</div>

				<div className="profilePage__details">
					<div className="profilePage__profImg">
						<img
							src={
								user.userData.photoURL
									? user.userData.photoURL
									: blank_profile_img
							}
							alt=""
						/>
					</div>

					{!otherProfile ? (
						<button className="profilePage__editProfileBtn">
							Edit Profile
						</button>
					) : (
						<button className="profilePage__editProfileBtn">
							Follow
						</button>
					)}

					<h3>{displayName}</h3>
					<p className="profilePage__username">
						@{user.userData.username}
					</p>

					<p className="bio">
						This is an empty bio, add some bio so that people can
						get to know you better!
					</p>

					<div className="joined">
						<EventIcon />
						<p>
							{' '}
							Joined {joinedMonth} {joinedDate.getFullYear()}
						</p>
					</div>

					<div className="profilePage__followState">
						<p className="following">
							<strong>{user.userData.following.length}</strong>{' '}
							following
						</p>
						<p className="followers">
							<strong>{user.userData.followers.length}</strong>{' '}
							followers
						</p>
						{!otherProfile ? (
							<Button
								onClick={() => {
									auth.signOut();
								}}
								variant="outlined"
								color="secondary"
							>
								Sign Out
							</Button>
						) : (
							''
						)}
					</div>
				</div>
			</div>

			<div className="profilePage__tabs">
				<div
					className={
						'profilePage__tab' +
						(selectedTab === 'Tweets' ? ' active' : '')
					}
					onClick={() => setSelectedTab('Tweets')}
				>
					Tweets
				</div>
				<div
					className={
						'profilePage__tab' +
						(selectedTab === 'Tweets & Replies' ? ' active' : '')
					}
				>
					Tweets &amp; Replies
				</div>
				<div
					className={
						'profilePage__tab' +
						(selectedTab === 'Media' ? ' active' : '')
					}
				>
					Media
				</div>
				<div
					className={
						'profilePage__tab' +
						(selectedTab === 'Likes' ? ' active' : '')
					}
					onClick={() => setSelectedTab('Likes')}
				>
					Likes
				</div>
			</div>

			<div className="profilePage__tabContent">
				{/* logic */}
				{selectedTab === 'Tweets' ? (
					<Feed
						filterFunc={(tweet) => tweet.user === user.userData.uid}
					/>
				) : (
					''
				)}
				{selectedTab === 'Tweets & Replies' ? (
					<Feed
						filterFunc={(tweet) => tweet.user === user.userData.uid}
					/>
				) : (
					''
				)}
				{selectedTab === 'Media' ? (
					<Feed
						filterFunc={(tweet) => tweet.user === user.userData.uid}
					/>
				) : (
					''
				)}
				{selectedTab === 'Likes' ? (
					<Feed
						filterFunc={(tweet) =>
							tweet.likes.includes(user.userData.uid)
						}
					/>
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default Profile;
