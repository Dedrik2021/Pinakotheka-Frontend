import { Link } from 'react-router-dom';

import './paintingCard.scss';

const PaintingCard = (props) => {

	const { _id, authorId, author, createdAt, description, image, material, price, size, title } =
		props;

	return (
		<li className="painting-card__item">
			<article className="card">
				<Link to={''} className="card__link card__link--painting">
					<div className="card__img-wrapper">
						<img height={300} width={260} src={image} alt="" />
					</div>
				</Link>
				<div className="card__content">
					<Link className='card__title-link' to={''}>
						<h2 className="card__title">{title}</h2>
					</Link>
					<div className="card__wrapper">
						<Link className='card__author' to={''}>
                            <span>{author}</span>
                        </Link>
						<div>Rating</div>
					</div>
					<div className="card__wrapper">
						<div className='card__items'>
							<div className='card__material'>{material},</div>
							<div>({size})</div>
						</div>
						<div>€{price}</div>
					</div>
				</div>
			</article>
		</li>
	);
};

export default PaintingCard;
