import React from 'react';
import './Navbar.css';

import TwitterIcon from '@material-ui/icons/Twitter';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import ProfileSummary from './ProfileSummary';

const NavItem = (Icon, title, link) => {
	let location = useLocation();

	return (
		<Link
			to={link}
			className={
				'navbar__item' + (link === location.pathname ? ' active' : '')
			}
		>
			{/* <svg viewBox="0 0 24 24" aria-hidden="true" class="navbar__icon"><g><path d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path></g></svg> */}
			<Icon />
			<h3>{title}</h3>
		</Link>
	);
};

function Navbar() {
	return (
		<nav className="navbar">
			<div className="twittericon">
				<Link to="/">
					<TwitterIcon />
				</Link>
			</div>

			{NavItem(HomeIcon, 'Home', '/')}
			{NavItem(ExploreIcon, 'Explore', '/explore')}
			{NavItem(NotificationsNoneIcon, 'Notifications', '/notifications')}
			{NavItem(MailOutlineIcon, 'Messages', '/messages')}
			{NavItem(PersonOutlineIcon, 'Profile', '/profile')}
			{NavItem(MoreHorizIcon, 'More', '/more')}

			<button className="navbar__tweet">Tweet</button>

			<div className="navbar__profile">
				<Link to="profile">
					<ProfileSummary />
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
