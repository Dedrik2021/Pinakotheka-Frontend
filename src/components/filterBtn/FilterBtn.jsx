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

const FilterBtn = ({ setLoading, setCheckPaintings, checkPaintings, setFilterTitle, filterTitle, page }) => {
	const dispatch = useDispatch();
	const [buttonId, setButtonId] = useState(1);
    const location = useLocation()
    const navigate = useNavigate()

	const handleButton = async (newId, title) => {
        setFilterTitle(title)
        localStorage.setItem('lastLocation', `${location.pathname}?page=${page}&filter=${title}`);
        navigate(`?page=${page}&filter=${title}`)
		setButtonId((prevButtonId) => {
			if (prevButtonId !== newId) {
				setCheckPaintings(true);
				getFilteredPainting(newId);
				if (newId === 1 && checkPaintings) setCheckPaintings(false);
				return newId;
			}
		});
	};

	const getFilteredPainting = async (id) => {
		setLoading(true);
		await dispatch(filterPaintingsByBtn(id));
		setLoading(false);
	};

	return (
		<ul className="filter-btn">
			{btns.map(({ id, title }) => {
				return (
					<li className="filter-btn__item" key={id}>
						<button
							onClick={() => handleButton(id, title)}
							className={`btn btn--universal btn--black ${
								id === buttonId ? 'active' : ''
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
