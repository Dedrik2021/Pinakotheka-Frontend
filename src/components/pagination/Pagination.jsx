import { Link } from 'react-router-dom';

import './pagination.scss';

const Pagination = ({ currentPage, handlePageChange, totalPages, filterTitle }) => {

	return totalPages > 1 ? (
		<div className="pagination">
			<Link
				className={`${currentPage === 1 && 'disabled'} pagination__prev`}
				to={`?page=${currentPage - 1}&filter=${filterTitle}`}
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
								to={`?page=${ind}&filter=${filterTitle}`}
								onClick={() => handlePageChange(ind)}
							>
								{ind}
							</Link>
						</li>
					);
				})}
			</ul>
			<Link
            to={`?page=${currentPage + 1}&filter=${filterTitle}`}
				onClick={() => handlePageChange(currentPage + 1)}
				className={`${currentPage === totalPages && 'disabled'} pagination__next`}
			>
				Next
			</Link>
		</div>
	) : null;
};

export default Pagination;
