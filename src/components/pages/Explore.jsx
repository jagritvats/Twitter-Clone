import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../app/config/firebase';
import Tweet from '../tweets/Tweet';

import blank_profile_img from '../auth/blank_profile_img.png';

function Explore() {
	let [users, setUsers] = useState(null);
	let [tweets, setTweets] = useState(null);

	useEffect(() => {
		db.collection('users')
			.orderBy('joinedAt', 'desc')
			.limit(4)
			.get()
			.then((docs) => {
				var usersList = [];
				docs.forEach((doc) => {
					let data = doc.data();
					usersList.push(data);
				});
				setUsers(usersList);
			});

		db.collection('tweets')
			.orderBy('time', 'desc')
			.limit(4)
			.get()
			.then((docs) => {
				var tweetsList = [];
				docs.forEach((doc) => {
					let data = doc.data();
					tweetsList.push(data);
				});
				setTweets(tweetsList);
			});
	}, []);
	return (
		<div>
			<header className="explore__header">
				<h2>Explore, Find Users</h2>
			</header>

			<div className="expore__users">
				<h3>Explore Users</h3>

				{users
					? users.map((user) => (
							<Link
								to={'/profile/' + user.uid}
								className="tweet__authorInfo"
							>
								<img
									src={
										user.photoURL
											? user.photoURL
											: blank_profile_img
									}
									alt=""
									className="tweet__authorImg"
								/>
								<h5>{user.fname + ' ' + user.lname}</h5>
								<p>@{user.username}</p>
							</Link>
					  ))
					: 'loading'}
			</div>

			<div className="explore__tweets">
				<h3>Explore Tweets</h3>

				<div>
					{tweets
						? tweets.map((tweet) => (
								<Tweet
									key={tweet.id}
									{...tweet}
									isSubTweet={true}
								/>
						  ))
						: 'loading'}
				</div>
			</div>
		</div>
	);
}

export default Explore;
