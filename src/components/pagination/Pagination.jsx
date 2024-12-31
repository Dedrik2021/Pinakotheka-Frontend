import { Link } from 'react-router-dom';

import './pagination.scss';

const Pagination = (props) => {
	const {
		currentPage,
		handlePageChange,
		totalPages,
		filterTitle,
		materialOptions,
		sizeOptions,
		styleOptions,
		gridBtn,
		priceMax,
		priceMin,
		filterByDependencies
	} = props;

	return totalPages > 1 ? (
		<div className="pagination">
			<Link
				className={`${currentPage === 1 && 'disabled'} pagination__prev`}
				to={
					filterTitle
						? filterTitle
							? `?page=${currentPage - 1}&filter=${filterTitle}`
							: `?page=${currentPage - 1}`
						: materialOptions?.length > 0 ||
						  sizeOptions?.length > 0 ||
						  styleOptions?.length > 0 || filterByDependencies?.length
						? `?page=${
								currentPage - 1
						  }&style=${styleOptions}&material=${materialOptions}&size=${sizeOptions}&price-min=${priceMin}&price-max=${priceMax}&grid-btn=${gridBtn}`
						: `?page=${currentPage - 1}`
				}
				onClick={() => handlePageChange(currentPage - 1)}
			>
				Prev
			</Link>
			<ul className="pagination__list">
				{new Array(totalPages).fill(0).map((_, index) => {
					const ind = index + 1;
					return (
						<li className="pagination__item" key={index}>
							<Link
								className={`${
									currentPage === ind ? 'disabled' : ''
								} pagination__link`}
								to={
									filterTitle
										? filterTitle
											? `?page=${ind}&filter=${filterTitle}`
											: `?page=${ind}`
										: materialOptions?.length > 0 ||
										  sizeOptions?.length > 0 ||
										  styleOptions?.length > 0 || filterByDependencies?.length
										? `?page=${ind}&style=${styleOptions}&material=${materialOptions}&size=${sizeOptions}&price-min=${priceMin}&price-max=${priceMax}&grid-btn=${gridBtn}`
										: `?page=${ind}`
								}
								onClick={() => handlePageChange(ind)}
							>
								{ind}
							</Link>
						</li>
					);
				})}
			</ul>
			<Link
				to={
					filterTitle
						? filterTitle
							? `?page=${currentPage + 1}&filter=${filterTitle}`
							: `?page=${currentPage + 1}`
						: materialOptions?.length > 0 ||
						  sizeOptions?.length > 0 ||
						  styleOptions?.length > 0 || filterByDependencies?.length
						? `?page=${
								currentPage + 1
						  }&style=${styleOptions}&material=${materialOptions}&size=${sizeOptions}&price-min=${priceMin}&price-max=${priceMax}&grid-btn=${gridBtn}`
						: `?page=${currentPage + 1}`
				}
				onClick={() => handlePageChange(currentPage + 1)}
				className={`${currentPage === totalPages && 'disabled'} pagination__next`}
			>
				Next
			</Link>
		</div>
	) : null;
};

export default Pagination;
