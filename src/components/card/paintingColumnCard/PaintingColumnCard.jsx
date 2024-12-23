import { Link } from 'react-router-dom';

import SkeletonHorizontalCard from '../../skeletons/SkeletonHorizontalCard';
import { isNew } from '../../../utils/helper';
import {
	paintingSize,
	sculptureSize,
	drawingSize,
	digitalArtSize,
	handmadeSize,
} from '../../../utils/sizes';
import { capitalizeFirstLetter, calculateSalePercentage } from '../../../utils/helper';

import './paintingColumnCard.scss';

const PaintingColumnCard = (props) => {
	const {
		_id,
		authorName,
		authorId,
		path,
		createdAt,
		description,
		loading,
		status,
		image,
		material,
		price,
		style,
		size,
		sale,
		name,
		slug = '',
	} = props;

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'UTC',
		timeZoneName: 'short',
	};

	const date = new Date(createdAt);

	const discountPercentage = calculateSalePercentage(price, sale);

	return (
		<>
			<li className="painting-column-card__item">
				{status === 'loading' || loading ? (
					<div style={{ backgroundColor: '#e7e7e7', borderRadius: '5px' }}>
						<SkeletonHorizontalCard />
					</div>
				) : (
					<article className="card">
						<Link to={`${path}${_id}`} className="card__link card__link--painting">
							<div className="card__img-wrapper">
								{isNew(date) ? <div className="card__label-new">New</div> : null}
								<img height={380} width={550} src={image} alt={name} />
								<div
									className="card__img-copy"
									style={{ backgroundImage: `url(${image})` }}
								></div>
							</div>
						</Link>
						<div className="card__content">
							<span className="card__lot">
								<span className="card__item">Lot: </span> {_id}
							</span>
							<Link className="card__title-link" to={`${path}${_id}`}>
								<h2 className="card__title title">{name}</h2>
							</Link>
							<div className="card__author-wrapper">
								<span className="card__item">Author: </span>
								<Link className="card__author" to={`/single-user/${authorId}`}>
									<span className="card__author-name"> {authorName}</span>
								</Link>
							</div>
							<div className="card__rating">Rating</div>
							<div className="card__material">
								<span className="card__item">Material: </span>
								<ul className="card__list">
									{material?.map((item, i) => {
										return (
											<li key={i} className="card__element-item">
												<span>[{capitalizeFirstLetter(item)}]</span>
											</li>
										);
									})}
								</ul>
							</div>
							<div className="card__style">
								<span className="card__item">Style:</span>
								<ul className="card__list">
									{style?.map((item, i) => {
										return (
											<li key={i} className="card__element-item">
												[{capitalizeFirstLetter(item)}]
											</li>
										);
									})}
								</ul>
							</div>
							<div className="card__size">
								<span className="card__item">Size:</span>
								{slug === 'paintings' && paintingSize(size)}
								{slug === 'sculptures' && sculptureSize(size)}
								{slug === 'drawings' && drawingSize(size)}
								{slug === 'digital-arts' && digitalArtSize(size)}
								{slug === 'handmades' && handmadeSize(size)}
							</div>
							<div className="card__price">
								<div className="card__price-wrapper">
									<span className="card__item">Price:</span>
									<div className={` ${sale ? 'card__price--strike' : ''}`}>
										€{price}
									</div>
									{sale && <div className="single-art__price--sale">€{sale}</div>}
								</div>
								{sale && (
									<div className="card__sale">
										<span className="card__item">Sale</span>-{discountPercentage}%
									</div>
								)}
							</div>
							<div className="card__descr-wrapper">
								<span className="card__item">Description: </span>
								<p> {description}</p>
							</div>
							<div>
								<span>
									<span className="card__item">Date: </span>
									{date.toLocaleDateString(options)}
								</span>
							</div>
						</div>
					</article>
				)}
			</li>
			{/* <SkeletonHorizontalCard /> */}
		</>
	);
};

export default PaintingColumnCard;
