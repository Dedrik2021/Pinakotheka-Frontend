import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import PaintingCard from '../paintingCard/PaintingCard';
import FilterBtn from '../../filterBtn/FilterBtn';
import { shuffleArray } from '../../../utils/helper';
import Pagination from '../../pagination/Pagination';

import './paintingsCards.scss';

const PaintingsCards = () => {
	const [shuffledArray, setShuffledArray] = useState([]);
	const [gradient, setGradient] = useState(35);
	const [increasing, setIncreasing] = useState(true);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [filterTitle, setFilterTitle] = useState('');
	const {
		filteredPaintings = [],
		status,
	} = useSelector((state) => state.painting);

	
	useEffect(() => {
		const paintingsArray = Array.isArray(filteredPaintings) ? [...filteredPaintings] : [];
		if (filterTitle === 'random') {
			setShuffledArray(shuffleArray([...paintingsArray]))
		} else {
			setShuffledArray([...paintingsArray])
		}
	}, [filterTitle, filteredPaintings])

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	let page = parseInt(searchParams.get('page')) || 1;
	const paintingsRef = useRef();

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

	const count = 15;
	const startIndex = (currentPage - 1) * count;
	const endIndex = startIndex + count;
	const currentItems = shuffledArray?.length
		? shuffledArray?.sort((a, b) => a.index - b.index).slice(startIndex, endIndex)
		: [];
	const totalPages = shuffledArray?.length ? Math.ceil(shuffledArray?.length / count) : 1;

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
				<h2 className='paintings-cards__title title'>Art</h2>
				<FilterBtn paintRef={paintingsRef} handleScroll={handleScroll} setLoading={setLoading} setFilterTitle={setFilterTitle} page={page} />
				<ul className="paintings-cards__list">
					{currentItems.length ? (
						currentItems?.map((item) => {
							return (
								<PaintingCard
									status={status}
									loading={loading}
									{...item}
									key={item._id}
								/>
							);
						})
					) : (
						<li >
							<h2 >No Paintings</h2>
						</li>
					)}
				</ul>
				{currentItems.length ? (
                    <Pagination
					totalPages={totalPages}
					handlePageChange={handlePageChange}
					currentPage={currentPage}
					filterTitle={filterTitle}
				/>
                ) : null}
			</div>
		</section>
	);
};

export default PaintingsCards;
