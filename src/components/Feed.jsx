import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../app/config/firebase';
import { logout } from '../features/userSlice';

import { CircularProgress } from '@material-ui/core';

import './Feed.css';
import Tweet from './tweets/Tweet';
import Loading from './layout/Loading';

function Feed({ filterFunc = () => true }) {
	const dispatch = useDispatch(logout());
	const doLogout = () => {
		dispatch(logout());
	};

	let [tweets, setTweets] = useState([]);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		db.collection('tweets')
			.orderBy('time', 'desc')
			.get()
			.then((docs) => {
				let tempTweets = [];
				docs.forEach((doc) => {
					let data = doc.data();
					let newTweet = { ...data };
					newTweet.id = doc.id;
					tempTweets.push({ ...newTweet });
				});
				setTweets(tempTweets);
				setLoading(false);
			});
	});
	return (
		<div className="feed">
			{loading ? (
				<Loading />
			) : tweets.length > 0 ? (
				tweets
					.filter(filterFunc)
					.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
			) : (
				<p>No Tweets to show</p>
			)}
		</div>
	);
}

export default Feed;
