import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import { TweetButton } from './Tweet';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { db } from '../../app/config/firebase';

function Comment({ comment }) {
	const { author, commentContent, likes, time, id } = comment;
	const user = author.uid;

	let currentUser = useSelector(selectUser);

	let isLiked = likes.includes(currentUser.user.uid);

	const like = () => {
		// if(isLiked){
		//     db.collection('tweets').doc(id).update({
		//         comments:{likes : [...comment.likes.filter(likers=>likers!==currentUser.user.uid)]}
		//     })
		// }else{
		//     db.collection('tweets').doc(id).update({
		//         comments:{likes : [...likes, currentUser.user.uid]}
		//     })
		// }
	};

	return (
		<div className="comment">
			<div className="comment__content">
				<Link to={'/profile/' + user} className="tweet__authorInfo">
					<h5>{author.fname + ' ' + author.lname}</h5>
					<p>@{author.username}</p>
					<span>&middot;</span>
					<p>{time.toString()}</p>
				</Link>

				<div
					className="comment__details"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<p>{commentContent}</p>
					{TweetButton(
						isLiked ? FavoriteIcon : FavoriteBorderIcon,
						likes?.length,
						'red',
						like,
						'Like',
						isLiked
					)}
				</div>
			</div>
		</div>
	);
}

export default Comment;
