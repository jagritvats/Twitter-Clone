import React from 'react';
import './Homepage.css';
import Feed from './Feed';

import StarsIcon from '@material-ui/icons/Stars';
import TweetForm from './tweets/TweetForm';

function Homepage() {
	return (
		<div className="home">
			<header className="home__header">
				<h2>Home</h2>
				<StarsIcon />
			</header>

			<TweetForm />
			<div className="home__feed">
				<Feed />
			</div>
		</div>
	);
}

export default Homepage;
