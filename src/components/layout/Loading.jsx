import { CircularProgress } from '@material-ui/core';
import React from 'react';
import './Loading.css';

const Loading = () => {
	return (
		<div className="loading__container">
			<CircularProgress />
		</div>
	);
};

export default Loading;
