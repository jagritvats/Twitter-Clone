import React, { useState } from 'react';
import blank_profile_img from '../auth/blank_profile_img.png';
import './TweetForm.css';

import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import GifIcon from '@material-ui/icons/Gif';
import PollIcon from '@material-ui/icons/Poll';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { db } from '../../app/config/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function TweetIcon(Icon, onClick, isImage = false) {
	// add image uploading functionality
	return (
		<div className="tweetForm__icon" onClick={onClick}>
			<Icon />
		</div>
	);
}

function TweetForm() {
	let [tweetText, setTweetText] = useState('');

	const user = useSelector(selectUser);

	const doTweet = (e) => {
		e.preventDefault();
		db.collection('tweets')
			.add({
				user: user.user.uid,
				tweet: {
					tweetText,
				},
				likes: [],
				comments: [],
				retweets: [],
				time: new Date().toUTCString(),
			})
			.then((docRef) => {
				db.collection('users')
					.doc(user.user.uid)
					.update({
						tweets: [...user.userData.tweets, docRef.id],
					});
			});
		setTweetText('');
	};

	return (
		<form className="tweetForm" onSubmit={doTweet}>
			<div className="tweetForm__img">
				<img
					src={
						user.user.photoURL
							? user.user.photoURL
							: blank_profile_img
					}
					alt=""
				/>
			</div>

			<div className="tweetForm__main">
				<div className="tweetForm__input">
					<textarea
						rows="2"
						cols="60"
						type="text"
						placeholder="What's Happening?"
						className="tweetForm__text"
						value={tweetText}
						onChange={(e) => {
							setTweetText(e.target.value);
						}}
					></textarea>
				</div>

				<div className="tweetForm__bottom">
					<div className="tweetForm__icons">
						{TweetIcon(InsertPhotoOutlinedIcon, () => {}, true)}
						{TweetIcon(GifIcon, () => {})}
						{TweetIcon(PollIcon, () => {})}
						{TweetIcon(InsertEmoticonOutlinedIcon, () => {})}
						{TweetIcon(DateRangeOutlinedIcon, () => {})}
					</div>

					<button type="submit">Tweet</button>
				</div>
			</div>
		</form>
	);
}

export default TweetForm;
