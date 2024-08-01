import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonPaintingCard = (props) => (
	<ContentLoader
		speed={2}
		width={262}
		height={393}
		viewBox="0 0 262 393"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
		{...props}
	>
		<rect x="5" y="5" rx="5" ry="5" width="255" height="300" />
		<rect x="10" y="320" rx="5" ry="5" width="130" height="15" />
		<rect x="10" y="345" rx="5" ry="5" width="130" height="15" />
		<rect x="160" y="345" rx="5" ry="5" width="100" height="15" />
		<rect x="10" y="370" rx="5" ry="5" width="130" height="15" />
		<rect x="160" y="370" rx="5" ry="5" width="100" height="15" />
	</ContentLoader>
);

export default SkeletonPaintingCard;
