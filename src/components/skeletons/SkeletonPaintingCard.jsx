import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonPaintingCard = ({height = 413}) => (
	<ContentLoader
		speed={2}
		width={262}
		height={height}
		viewBox="0 0 262 413"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
		
	>
		<rect x="5" y="5" rx="5" ry="5" width="253" height="319" />
		<rect x="10" y="337" rx="5" ry="5" width="180" height="20" />
		<rect x="10" y="370" rx="5" ry="5" width="130" height="10" />
		<rect x="160" y="370" rx="5" ry="5" width="100" height="10" />
		<rect x="10" y="395" rx="5" ry="5" width="130" height="10" />
		<rect x="180" y="395" rx="5" ry="5" width="80" height="10" />
	</ContentLoader>
);

export default SkeletonPaintingCard;
