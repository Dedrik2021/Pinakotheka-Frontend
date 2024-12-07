import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { filterPaintingsByBtn } from '../../redux/slices/paintingSlice';

import './filterBtn.scss';

const btns = [
	{ id: 1, title: 'Random' },
	{ id: 2, title: 'New' },
	{ id: 3, title: 'Recommend' },
	{ id: 4, title: 'Popular' },
	{ id: 5, title: 'Sale' },
];

const FilterBtn = ({
	setLoading,
	setFilterTitle,
	paintRef,
	handleScroll,
	currentPage,
	totalPages,
}) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const filter = location.search ? location?.search?.split('&')[1].split('=')[1] : '';
	const [titleFilterBtn, setTitleFilterBtn] = useState(filter ? filter : 'random');

	useEffect(() => {
		if (filter) {
			localStorage.setItem('lastLocation', `${location.pathname}?page=${1}&filter=${filter}`);
		}
	}, [filter, location.pathname, setFilterTitle]);

	const handleButton = async (title) => {
		setFilterTitle(title);
		handleScroll(paintRef.current, currentPage, totalPages, 250);
		setTitleFilterBtn((prevTitleBtn) => {
			if (prevTitleBtn !== title) {
				navigate(`?page=${1}&filter=${title}`);
				localStorage.setItem(
					'lastLocation',
					`${location.pathname}?page=${1}&filter=${title}`,
				);
				return title;
			}
		});
	};

	useEffect(() => {
		const getFilteredPainting = async (slug) => {
			setLoading(true);
			await dispatch(filterPaintingsByBtn({ dependenciesArray: [], slug }));
			setLoading(false);
		};
		if (titleFilterBtn) {
			getFilteredPainting(titleFilterBtn);
		}
		setFilterTitle(titleFilterBtn);
	}, [dispatch, titleFilterBtn]);

	return (
		<ul className="filter-btn">
			{btns.map(({ id, title }) => {
				return (
					<li className="filter-btn__item" key={id}>
						<button
							onClick={() => handleButton(title.toLowerCase())}
							className={`btn btn--universal btn--black ${
								title.toLowerCase() === titleFilterBtn ? 'active' : ''
							} `}
							type="button"
						>
							{title}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default FilterBtn;
