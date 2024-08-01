import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import PaintingCard from '../paintingCard/PaintingCard';
import FilterBtn from '../../filterBtn/FilterBtn';
import Spinner from '../../spinner/Spinner';
import { shuffleArray } from '../../../utils/helper';
import Pagination from '../../pagination/Pagination';

import './paintingsCards.scss';

const PaintingsCards = ({ paintings = [] }) => {
	const [gradient, setGradient] = useState(35);
	const [increasing, setIncreasing] = useState(true);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [filterTitle, setFilterTitle] = useState('');
	const {
		filteredPaintings = [],
		statusFiltering,
		status,
	} = useSelector((state) => state.painting);

	const paintingsArray = Array.isArray(filteredPaintings) ? [...filteredPaintings] : [];

	const location = useLocation();
	// const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	let page = parseInt(searchParams.get('page')) || 1;
	// const lastLocation = localStorage.getItem('lastLocation');
	// const urlParams = new URLSearchParams(lastLocation.split('?')[1]);
	const paintingsRef = useRef();
	// const shuffleredArray = shuffleArray(paintings)

	useEffect(() => {
		localStorage.setItem(
			'lastLocation',
			`${location.pathname}?page=${page}&filter=${filterTitle}`,
		);
	}, [filterTitle, location.pathname, page]);

	useEffect(() => {
		const interval = setInterval(() => {
			setGradient((prevGradient) => {
				if (increasing) {
					if (prevGradient >= 80) {
						setIncreasing(false);
						return prevGradient - 0.2;
					} else {
						return prevGradient + 0.2;
					}
				} else {
					if (prevGradient <= 35) {
						setIncreasing(true);
						return prevGradient + 0.2;
					} else {
						return prevGradient - 0.2;
					}
				}
			});
		}, 100);

		return () => clearInterval(interval);
	}, [increasing]);

	const count = 3;
	const startIndex = (currentPage - 1) * count;
	const endIndex = startIndex + count;
	const currentItems = paintingsArray?.length
		? paintingsArray?.sort((a, b) => a.index - b.index).slice(startIndex, endIndex)
		: [];
	const totalPages = paintingsArray?.length ? Math.ceil(paintingsArray?.length / count) : 1;

	const handleScroll = (ref) => {
		if (ref) {
			if (currentPage !== 1 || currentPage === totalPages || currentPage === 1) {
				window.scrollTo({
					top: ref.offsetTop - 100,
					behavior: 'smooth',
				});
			}
		}
	};

	useEffect(() => {
		if (page) {
			setCurrentPage(page);
		}
	}, [page]);

	const handlePageChange = (newPage) => {
		setLoading(true);
		setCurrentPage(newPage);
		handleScroll(paintingsRef.current);
		setTimeout(() => {
			setLoading(false);
		}, 300);
	};

	return (
		<section
			className="paintings-cards"
			style={{
				background: `linear-gradient(
            180deg,
            rgba(11, 11, 11, 1) ${gradient - 60}%,
            rgba(66, 80, 93, 1) ${gradient}%,
            rgba(255, 255, 255, 1) 100%
        )`,
			}}
		>
			<div className="container" ref={paintingsRef}>
				<FilterBtn setLoading={setLoading} setFilterTitle={setFilterTitle} page={page} />
				<ul className="paintings-cards__list">
					{currentItems?.map((item) => {
						return <PaintingCard status={status} loading={loading} {...item} key={item._id} />;
					})}
				</ul>
				<Pagination
					totalPages={totalPages}
					handlePageChange={handlePageChange}
					currentPage={currentPage}
					filterTitle={filterTitle}
				/>
			</div>
		</section>
	);
};

export default PaintingsCards;
