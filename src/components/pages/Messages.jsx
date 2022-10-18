import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../app/config/firebase';
import { selectUser } from '../../features/userSlice';

function Messages() {
	let [messages, setMessages] = useState(null);

	let [message, setMessage] = useState('');

	let currentUser = useSelector(selectUser);

	useEffect(() => {
		// db.collection('messages').orderBy('time','desc').get().then(docs=>{
		//     var temp = []
		//     docs.forEach(doc=>{
		//         temp.push(doc.data())
		//     })
		//     setMessages(temp)
		// })

		const unsub = db
			.collection('messages')
			.orderBy('time', 'asc')
			.onSnapshot((docs) => {
				var temp = [];
				docs.forEach((doc) => {
					temp.push(doc.data());
				});
				setMessages(temp);
			});

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
			});
	};

	return (
		<div
			className="messages"
			style={{
				height: '100vh',
				position: 'sticky',
				overflow: 'auto',
				top: '0px',
				paddingBottom: '2em',
			}}
		>
			<header className="messages__header">
				<h2>Live Chat</h2>
			</header>

			<div className="messages">
				{messages
					? messages.map((message) => (
							<div
								className={
									'message' +
									(message.author.uid ===
									currentUser.userData.uid
										? 'your-msg'
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
			</div>

			<footer
				className="message__send"
				style={{ position: 'fixed', bottom: '10px', width: '100%' }}
			>
				<form onSubmit={sendMessage}>
					<input
						type="text"
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					/>
					<button type="submit">Send</button>
				</form>
			</footer>
		</div>
	);
}

export default Messages;
