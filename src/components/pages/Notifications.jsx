import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../app/config/firebase';

function Notifications() {
	let [notifications, setNotifications] = useState(null);

	useEffect(() => {
		db.collection('notifications')
			.get()
			.then((docs) => {
				var notifics = [];
				docs.forEach((doc) => {
					const dt = doc.data();
					notifics.push(dt);
				});
				setNotifications(notifics);
			});
	}, []);

	return (
		<div className="notifications">
			<header className="notifications__header">
				<h2>Notifications</h2>
			</header>

			<div className="notifications__content">
				{notifications
					? notifications.map((notification) => (
							<Link
								to={'/profile/' + notification.eventAuthor}
								className="notification"
							>
								<h3>{notification.event}</h3>
							</Link>
					  ))
					: 'Loading'}
			</div>
		</div>
	);
}

export default Notifications;
