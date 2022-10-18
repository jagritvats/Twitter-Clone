import React, { useEffect, useState } from 'react';
import './Tweet.css';

import blank_profile_img from '../auth/blank_profile_img.png';

import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import LoopIcon from '@material-ui/icons/Loop';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import CircularProgress from '@material-ui/core/CircularProgress';
import { db } from '../../app/config/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Loading from '../layout/Loading';

export const TweetButton = (
	Icon,
	num,
	color,
	onClick,
	name,
	active = false
) => {
	return (
		<div
			className={
				'tweet__button active-' + color + (active ? ' active-btn' : '')
			}
			onClick={onClick}
			data-tooltip={name}
		>
			<Icon />
			<p>{num}</p>
		</div>
	);
};

function Tweet({
	isSubTweet = false,
	id,
	user,
	tweet,
	likes,
	comments,
	retweets,
	time,
	commentsOpen = false,
}) {
	// id refers to tweet id

	const currentUser = useSelector(selectUser);

	let [loading, setLoading] = useState(true);

	let [author, setAuthor] = useState(null);

	let isLiked = likes.includes(currentUser.user.uid);

	let [comment, setComment] = useState('');

	let [commentVisibility, setCommentVisibility] = useState(commentsOpen);

	const attachments = [];

	useEffect(() => {
		db.collection('users')
			.doc(user)
			.get()
			.then((doc) => {
				setAuthor(doc.data());
				setLoading(false);
			});
	}, [id]);

	// author, name, username, tweet, attachments,likes,comments,retweets,profPic

	const like = (e) => {
		if (isLiked) {
			db.collection('users')
				.doc(currentUser.user.uid)
				.update({
					likes: [
						...currentUser.userData.likes.filter(
							(like) => like !== id
						),
					],
				});

			db.collection('tweets')
				.doc(id)
				.update({
					likes: [
						...likes.filter(
							(likers) => likers !== currentUser.user.uid
						),
					],
				});
		} else {
			db.collection('users')
				.doc(currentUser.user.uid)
				.update({
					likes: [...currentUser.userData.likes, id],
				});

			db.collection('tweets')
				.doc(id)
				.update({
					likes: [...likes, currentUser.user.uid],
				});
		}
	};

	const retweet = () => {};

	const commentShow = () => {
		setCommentVisibility((prev) => !prev);
	};

	const share = () => {};

	const doComment = (e) => {
		e.preventDefault();
		const commentingTime = new Date().toUTCString();
		const commentObj = {
			author: {
				uid: currentUser.userData.uid,
				fname: currentUser.userData.fname,
				lname: currentUser.userData.lname,
			},
			time: commentingTime,
			likes: [],
			commentContent: comment,
			id: comments[comments.length - 1]
				? comments[comments.length - 1].id + 1
				: 0,
		};

		db.collection('tweets')
			.doc(id)
			.update({
				comments: [...comments, commentObj],
			});

		// db.collection('comments').doc(id).update({
		//     comments : [...comments, currentUser.user.uid]
		// })

		setComment('');
	};

	return (
		<Link to={'/tweet/' + id} className="tweet">
			{loading ? (
				<Loading />
			) : (
				<>
					<Link to={'/profile/' + user} className="tweet__authorImg">
						<img
							src={
								author.photoURL
									? author.photoURL
									: blank_profile_img
							}
							alt=""
						/>
					</Link>

					<div className="tweet__content">
						<Link
							to={'/profile/' + user}
							className="tweet__authorInfo"
						>
							<h5>{author.fname + ' ' + author.lname}</h5>
							<p>@{author.username}</p>
							<span>&middot;</span>
							<p>{time.toString()}</p>
						</Link>

						<div className="tweet__main">
							<p className="tweet__text">{tweet.tweetText}</p>
							<div className="tweet__attachments">
								{attachments
									? attachments.map((att) => (
											<div className="tweet__attachment">
												<img src={att.url} alt="" />
											</div>
									  ))
									: ''}
							</div>
						</div>

						{isSubTweet ? (
							''
						) : (
							<>
								<div
									className="tweet__buttons"
									onClick={(e) => e.preventDefault()}
								>
									{TweetButton(
										ChatBubbleOutlineRoundedIcon,
										comments ? comments.length : '',
										'blue',
										commentShow,
										'Comment'
									)}
									{TweetButton(
										LoopIcon,
										retweets?.length,
										'green',
										retweet,
										'ReTweet'
									)}
									{TweetButton(
										isLiked
											? FavoriteIcon
											: FavoriteBorderIcon,
										likes?.length,
										'red',
										like,
										'Like',
										isLiked
									)}
									{TweetButton(
										ShareIcon,
										'',
										'blue',
										share,
										'Share'
									)}
								</div>

								{commentVisibility ? (
									<div className="tweet__comments">
										<form
											className="tweet__commentsInput"
											onSubmit={doComment}
										>
											<input
												type="text"
												value={comment}
												onChange={(e) => {
													setComment(e.target.value);
												}}
											/>
											<button type="submit">
												Comment
											</button>
										</form>
										{comments.map((comment) => (
											<Comment comment={comment} />
										))}
									</div>
								) : (
									''
								)}
							</>
						)}
					</div>
				</>
			)}
		</Link>
	);
}

export default Tweet;
