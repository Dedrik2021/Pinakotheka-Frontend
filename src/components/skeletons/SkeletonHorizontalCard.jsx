import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonHorizontalCard = (props) => (
	<ContentLoader
		speed={2}
		width={1080}
		height={387}
		viewBox="0 0 1080 387"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
		{...props}
	>
		<rect x="5" y="5" rx="5" ry="5" width="550" height="380" />
		<rect x="585" y="20" rx="5" ry="5" width="300" height="15" />
		<rect x="585" y="50" rx="5" ry="5" width="400" height="20" />
		<rect x="585" y="90" rx="5" ry="5" width="300" height="15" />
		<rect x="585" y="130" rx="5" ry="5" width="250" height="15" />
		<rect x="585" y="180" rx="5" ry="5" width="200" height="15" />
		<rect x="585" y="220" rx="5" ry="5" width="150" height="15" />
		<rect x="585" y="250" rx="5" ry="5" width="480" height="10" />
		<rect x="585" y="270" rx="5" ry="5" width="480" height="10" />
		<rect x="585" y="290" rx="5" ry="5" width="400" height="10" />
		<rect x="585" y="320" rx="5" ry="5" width="200" height="15" />
	</ContentLoader>
);

export default SkeletonHorizontalCard;
