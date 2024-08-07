import CategoriesList from './categoriesList/CategoriesList';

import './categories.scss';

const Categories = () => {
	return (
		<section className="categories">
			<div className="container">
				<h2 className='categories__title title'>Categories</h2>
				<CategoriesList />
			</div>
		</section>
	);
};

export default Categories;
