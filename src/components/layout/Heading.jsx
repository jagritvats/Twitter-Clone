import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

function Heading({ heading }) {
	let history = useHistory();
	return (
		<header className="header">
			<ArrowBackIcon
				onClick={() => {
					history.goBack();
				}}
			/>
			<div className="header__summary">
				<h3>{heading}</h3>
			</div>
		</header>
	);
}

export default Heading;
