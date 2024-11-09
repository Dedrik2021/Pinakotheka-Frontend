import { Link } from 'react-router-dom';

import { capitalizeFirstLetter } from '../../../utils/helper';

import './searchList.scss';

const SearchList = ({ data, handleOpenAndCloseSearch }) => {

	return data.length ? (
		<ul className={`search-list scrollbar ${data.length > 6 ? 'scroll' : ''}`}>
			{data.map((item) => {
				return (
					<li key={item._id} className="search-list__item">
						<Link onClick={handleOpenAndCloseSearch} className="search-list__link" to={`${item.path}${item._id}`}>
							<article className="search__article">
								<div className="search__img-wrapper">
									<img src={item.image} alt={item.name} width={60} height={50} />
								</div>
								<div className="search__content">
									<span className="search__name">{item.name}</span>
									<div className="search__init">
										{item.customer
											? item.customer && 'User'
											: item.author && 'Author'}
									</div>
									<div className="search__init">
										{capitalizeFirstLetter(item.category)}
									</div>
								</div>
							</article>
						</Link>
					</li>
				);
			})}
		</ul>
	) : null;
};

export default SearchList;
