import { Link, useLocation } from 'react-router-dom';

import paintingImg from '../../../assets/images/painting.png';
import sculptureImg from '../../../assets/images/sculpture.png';
import drawingImg from '../../../assets/images/drawing.png';
import digitalArtImg from '../../../assets/images/digital-art.png';
import handmadeImg from '../../../assets/images/handmade.png';

import './categoriesList.scss';

const categories = [
	{ id: 1, title: 'Paintings', path: '/catalog/paintings', img: paintingImg },
	{ id: 2, title: 'Sculptures', path: '/catalog/sculptures', img: sculptureImg },
	{ id: 3, title: 'Drawings', path: '/catalog/drawings', img: drawingImg },
	{ id: 4, title: 'Digital Arts', path: '/catalog/digital-arts', img: digitalArtImg },
	{ id: 5, title: 'Handmades', path: '/catalog/handmades', img: handmadeImg },
];

const CategoriesList = () => {
    const location = useLocation()

	return (
		<ul className="categories-list">
			{categories.map(({ id, title, path, img }) => {
				return (
					<li className='categories-list__item' key={id}>
						<Link className={`categories-list__link ${location.pathname === path ? 'active' : ''}`} to={path}>
							<article className='categories-card' >
								<div  className={`categories-card__img-wrapper ${location.pathname === path ? 'active' : ''}`}>
									<img src={img} alt={title} />
								</div>
								<span className='categories-card__title'>{title}</span>
							</article>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default CategoriesList;
