import { Link } from 'react-router-dom';

import SkeletonPaintingCard from '../../skeletons/SkeletonPaintingCard';
import { isNew } from '../../../utils/helper';
import {
	paintingSize,
	sculptureSize,
	drawingSize,
	digitalArtSize,
	handmadeSize,
} from '../../../utils/sizes';
import { capitalizeFirstLetter } from '../../../utils/helper';

import './paintingCard.scss';

const PaintingCard = (props) => {
	const {
		_id,
		authorName,
		authorId,
		loading,
		status,
		image,
		material,
		price,
		size,
		sale,
		name,
		path,
		createdAt,
		slug = '',
		background = '#fff',
	} = props;

	const date = new Date(createdAt);

	return (
		<>
			<li className="painting-card__item">
				{status === 'loading' || loading ? (
					<SkeletonPaintingCard />
				) : (
					<article className="card" style={{ backgroundColor: `${background}` }}>
						<Link to={`${path}${_id}`} className="card__link card__link--painting">
							<div className="card__img-wrapper">
								{isNew(date) ? <div className="card__label-new">New</div> : null}
								<img height={320} width={260} src={image} alt={name} />
							</div>
						</Link>
						<div className="card__content">
							<Link className="card__title-link" to={`${path}${_id}`}>
								<h2 className="card__title title">{name}</h2>
							</Link>
							<div className="card__items">
								<span className="card__element">Author:</span>
								<Link className="card__author" to={`/single-user/${authorId}`}>
									<span>{authorName}</span>
								</Link>
							</div>

							<div className="card__price">
								<div className={` ${sale ? 'card__price--strike' : ''}`}>
									<span className="card__element">Price:</span>€{price}
								</div>
								{sale && (
									<div className="card__sale">
										<span className="card__element">Sale:</span>€{sale}
									</div>
								)}
							</div>
						</div>
					</article>
				)}
			</li>
			{/* <SkeletonPaintingCard /> */}
		</>
	);
};

export default PaintingCard;
