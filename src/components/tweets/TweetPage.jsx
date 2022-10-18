import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../app/config/firebase';
import Heading from '../layout/Heading';

import Tweet from './Tweet';

function TweetPage() {
	let params = useParams();

	let [tweet, setTweet] = useState(null);

	let id = params.id;

	useEffect(() => {
		db.collection('tweets')
			.doc(id)
			.get()
			.then((doc) => {
				const data = doc.data();
				setTweet(data);
			});
	}, [id]);

	return (
		<div>
			<Heading heading="Tweet" />

			<div>{tweet ? <Tweet {...tweet} commentsOpen={true} /> : ''}</div>
		</div>
	);
}

export default TweetPage;
