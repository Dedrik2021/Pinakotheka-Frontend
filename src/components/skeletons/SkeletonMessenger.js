import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonMessenger = ({height = '85vh'}) => (
	<ContentLoader
		speed={2}
		width={1375}
		height={height}
		// viewBox={`0 0 1375 ${height}`}
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="0" rx="5" ry="5" width="283" height="85vh" />
		<rect x="285" y="0" rx="5" ry="5" width="1090" height="78vh" />
		<rect x="285" y="78.2vh" rx="5" ry="5" width="10890" height="6.7vh" />
	</ContentLoader>
);

export default SkeletonMessenger;
