import PaintingCard from '../../../components/card/paintingCard/PaintingCard';

import './blockArts.scss';

const BlockArts = ({ arts, singleArtId, loading, itemsRef, page }) => {
	return (
		<ul className={`block-arts `} ref={itemsRef}>
			{arts?.map((art) => (
				<PaintingCard height={433} loading={loading} key={art?._id} page={page} {...art} singleArtId={singleArtId} />
			))}
		</ul>
	);
};

export default BlockArts;
