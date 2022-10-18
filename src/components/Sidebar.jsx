import React from 'react';
import './Sidebar.css';

function Sidebar() {
	return (
		<div className="sidebar">
			<h3>What's this?</h3>
			<ul>
				<li>A twitter clone</li>
				<li>Made using React, Redux and Firebase</li>
				<li>
					Made by{' '}
					<a
						href="https://www.linkedin.com/in/jagritvats/"
						target="_blank"
						style={{ color: 'blue' }}
					>
						Jagrit
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
