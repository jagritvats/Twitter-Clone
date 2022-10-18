import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../app/config/firebase';
import { selectUser } from '../../features/userSlice';
import './Messages.css';

function Messages() {
	let [messages, setMessages] = useState(null);

	let [message, setMessage] = useState('');

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	let [rendered, setRendered] = useState(false);

	const endmsgs = useRef(null);

	let currentUser = useSelector(selectUser);

	useEffect(() => {
		// db.collection('messages').orderBy('time','desc').get().then(docs=>{
		//     var temp = []
		//     docs.forEach(doc=>{
		//         temp.push(doc.data())
		//     })
		//     setMessages(temp)
		// })

		let unsub;

		try {
			unsub = db
				.collection('messages')
				.orderBy('time', 'asc')
				// .limitToLast(10)
				.onSnapshot((docs) => {
					var temp = [];
					docs.forEach((doc) => {
						temp.push(doc.data());
					});
					setMessages(temp);
					setLoading(false);
				});
			// workaround for scrolling to end
			setTimeout(() => {
				endmsgs.current.scrollIntoView({ behavior: 'smooth' });
			}, 1000);
		} catch (err) {
			setError(true);
		}
		return () => unsub();
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();

		const msgTime = new Date().toUTCString();

		const messageObj = {
			author: {
				uid: currentUser.userData.uid,
				fname: currentUser.userData.fname,
			},
			txt: message,
			time: msgTime,
		};

		db.collection('messages')
			.add(messageObj)
			.then(() => {
				setMessage('');
				setTimeout(() => {
					endmsgs.current.scrollIntoView({ behavior: 'smooth' });
				}, 1000);
			});
	};

	if (error) {
		return (
			<div>
				<p color="red">Error Occured</p>
			</div>
		);
	}

	if (!loading && endmsgs.previous) {
		endmsgs.current.scrollIntoView({ behavior: 'smooth' });
	}

	return (
		<div className="messages">
			<header className="messages__header">
				<h2>Live Chat</h2>
			</header>

			<div className="messages__list">
				{messages
					? messages.map((message) => (
							<div
								className={
									'message' +
									(message.author.uid ===
									currentUser.userData.uid
										? ' your__msg'
										: '')
								}
							>
								<div className="message__author">
									<h4>{message.author.fname}</h4>
									<span>.</span>
									<span>{message.time}</span>
								</div>
								<div className="message__content">
									<p>{message.txt}</p>
								</div>
							</div>
					  ))
					: 'Loading'}
				<div id="endmsgs" ref={endmsgs}></div>
			</div>

			<footer className="message__send">
				<form onSubmit={sendMessage}>
					<TextField
						autoFocus
						type="text"
						className="message__box"
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						variant="outlined"
						placeholder="Enter your message"
					/>
					<Button variant="contained" color="primary" type="submit">
						Send
					</Button>
				</form>
			</footer>
			{/* for position sticky to work for message sending box */}
			<div></div>
		</div>
	);
}

export default Messages;
