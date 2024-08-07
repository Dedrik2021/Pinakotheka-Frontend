// import { Link } from 'react-router-dom';

// import SkeletonPaintingCard from '../../skeletons/SkeletonPaintingCard';

// import './paintingColumnCard.scss';

// const PaintingColumnCard = (props) => {
// 	const {
// 		_id,
// 		authorName,
// 		createdAt,
// 		description,
// 		loading,
// 		status,
// 		image,
// 		material,
// 		price,
// 		size,
// 		name,
// 	} = props;

// 	const options = {
// 		year: 'numeric',
// 		month: 'long',
// 		day: 'numeric',
// 		hour: '2-digit',
// 		minute: '2-digit',
// 		second: '2-digit',
// 		timeZone: 'UTC',
// 		timeZoneName: 'short',
// 	};

// 	const date = new Date(createdAt);

// 	return (
// 		<li className="painting-column-card__item">
// 			{status === 'loading' || loading ? (
// 				<div style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
// 					<SkeletonPaintingCard />
// 				</div>
// 			) : (
// 				<article className="card">
// 					<Link to={''} className="card__link card__link--painting">
// 						<div className="card__img-wrapper">
// 							<img height={500} width={460} src={image} alt={name} />
// 						</div>
// 					</Link>
// 					<div className="card__content">
// 						<span className="">
//                         <span className='card__item'>Lot: </span> {_id}</span>
// 						<Link className="card__title-link" to={''}>
// 							<h2 className="card__title">{name}</h2>
// 						</Link>
// 						<div className="card__wrapper">
// 							<div className='card__author-wrapper'>
// 								<span className="card__item">Author: </span>
// 								<Link className="card__author" to={''}>
// 									<span className="card__author-name"> {authorName}</span>
// 								</Link>
// 							</div>
// 							<div>Rating</div>
// 						</div>
// 						<div className="card__wrapper">
// 							<div className="card__items">
// 								<div className="card__material">
// 									<span className="card__item">Material: </span>
// 									{material},
// 								</div>
// 								<div>
// 									<span className="card__item">Size:</span> ({size})
// 								</div>
// 							</div>
// 							<div>
// 								<span className="card__item">Price:</span> €{price}
// 							</div>
// 						</div>
// 						<div className='card__descr-wrapper'>
// 							<span className="card__item">Description: </span>
// 							<p> {description}</p>
// 						</div>
// 						<div>
// 							<span>
// 								<span className="card__item">Added: </span>
// 								{date.toLocaleDateString(options)}
// 							</span>
// 						</div>
// 					</div>
// 				</article>
// 			)}
// 		</li>
// 	);
// };

// export default PaintingColumnCard;

import { Link } from 'react-router-dom';

import SkeletonHorizontalCard from '../../skeletons/SkeletonHorizontalCard';

import './paintingColumnCard.scss';

const PaintingColumnCard = (props) => {
	const {
		_id,
		authorName,
		createdAt,
		description,
		loading,
		status,
		image,
		material,
		price,
		size,
		name,
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

	return (
                <>
		<li className="painting-column-card__item">
			{status === 'loading' || loading ? (
				<div style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
					<SkeletonHorizontalCard />
				</div>
			) : (
				<article className="card">
					<Link to={''} className="card__link card__link--painting">
						<div className="card__img-wrapper">
							<img height={500} width={460} src={image} alt={name} />
						</div>
					</Link>
					<div className="card__content">
						<span className="card__lot">
							<span className="card__item">Lot: </span> {_id}
						</span>
						<Link className="card__title-link" to={''}>
							<h2 className="card__title">{name}</h2>
						</Link>
							<div className="card__author-wrapper">
								<span className="card__item">Author: </span>
								<Link className="card__author" to={''}>
									<span className="card__author-name"> {authorName}</span>
								</Link>
							</div>
							<div className='card__rating'>Rating</div>
							<div className="card__items">
								<div className="card__material">
									<span className="card__item">Material: </span>
									{material},
								</div>
								<div className='card__size'>
									<span className="card__item">Size:</span> ({size})
								</div>
							</div>
							<div className='card__price'>
								<span className="card__item">Price:</span> €{price}
							</div>
						<div className="card__descr-wrapper">
							<span className="card__item">Description: </span>
							<p> {description}</p>
						</div>
						<div>
							<span>
								<span className="card__item">Added: </span>
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
