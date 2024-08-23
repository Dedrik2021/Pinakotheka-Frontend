import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getPaintingById, getPaintingsByAuthorId } from '../../redux/slices/paintingSlice';
import { getAuthorById } from '../../redux/slices/userSlice';
import Spinner from '../../components/spinner/Spinner';
import { getImageDimensions, handleScroll, getPaginationItems } from '../../utils/helper';
import BlockAuthor from './blockAuthor/BlockAuthor';
import BlockArts from './blockArts/BlockArts';
import Pagination from '../../components/pagination/Pagination';

import './singleArt.scss';

const SingleArt = () => {
	const { artId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const itemsRef = useRef(null);
	const { singleArt, error, status, authorsArts } = useSelector((state) => state.painting);
	const { author } = useSelector((state) => state.user);

	const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);

	const searchParams = new URLSearchParams(location.search);
	let page = parseInt(searchParams.get('page')) || 1;

	const authorsArtsArray = Array.isArray(authorsArts) ? [...authorsArts] : [];

	useEffect(() => {
		if (page) {
			setCurrentPage(page);
		}
	}, [page]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		localStorage.setItem('lastLocation', `${location.pathname}?page=${page}`);
	}, [location.pathname, page]);

	useEffect(() => {
		dispatch(getPaintingById(artId));
	}, [artId, dispatch]);

	useEffect(() => {
		if (singleArt?.authorId) {
			dispatch(getPaintingsByAuthorId(singleArt?.authorId));
			dispatch(getAuthorById(singleArt?.authorId));
		}
	}, [singleArt?.authorId, dispatch]);

	const { currentItems, totalPages } = getPaginationItems(
		imgDimensions.width > imgDimensions.height ? 17 : 16,
		authorsArtsArray,
		currentPage,
	);

	const handlePageChange = (newPage) => {
		setLoading(true);
		setCurrentPage(newPage);
		handleScroll(itemsRef.current, currentPage, totalPages);
		setTimeout(() => {
			setLoading(false);
		}, 300);
	};

	const handleImageLoad = async () => {
		const { width, height } = await getImageDimensions(singleArt?.image);
		setImgDimensions({ width, height });
	};

	const handleImageClick = () => {
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		if (singleArt?.image) {
			handleImageLoad();
		}
	}, [singleArt?.image]);

	useEffect(() => {
		if (error) {
			navigate('*', { replace: true });
		}
	}, [error, navigate]);

	// Format the created date
	const formattedDate = new Date(singleArt?.createdAt).toLocaleDateString();

	if (status === 'loading' && imgDimensions.width === 0 && authorsArtsArray?.length === 0) {
		return <Spinner />;
	}

	return (
		<>
			<Helmet>
				<meta name={`Pinakotheka | Catalog: ${singleArt?.name}`} />
				<title>{`Pinakotheka | ${singleArt?.name}`}</title>
			</Helmet>
			<div className="art-page">
				<div className="art-page__wrapper">
					<div className="art-page__content">
						<article
							className={`single-art ${
								imgDimensions.width > imgDimensions.height
									? 'single-art--landscape'
									: 'single-art--portrait'
							}`}
							style={{
								backgroundColor: `${
									imgDimensions.width === 0 ? 'transparent' : '#fff'
								}`,
							}}
						>
							<div
								className={`single-art__image ${
									imgDimensions.width > imgDimensions.height
										? 'single-art__image--landscape'
										: 'single-art__image--portrait'
								}`}
							>
								<img
									src={singleArt?.image}
									alt={singleArt?.name}
									style={{
										height: `${imgDimensions.width === 0 ? '0' : '100%'}`,
									}}
									onClick={handleImageClick}
								/>
								{isFullScreen && (
									<div className="single-art__overlay">
										<div
											className={`overlay ${
												imgDimensions.width > imgDimensions.height
													? 'overlay--landscape'
													: 'overlay--portrait'
											}`}
											onClick={handleImageClick}
										>
											<img
												src={singleArt?.image}
												alt={singleArt?.name}
												className="image-full-screen"
												onClick={handleImageClick}
											/>
										</div>
									</div>
								)}
							</div>
							<div className="single-art__details">
								<h1 className="single-art__title">{singleArt?.name}</h1>
								<p className="single-art__author">
									By{' '}
									<Link to={`/single-user/${singleArt?.authorId}`}>
										{singleArt?.authorName}
									</Link>
								</p>
								<p className="single-art__price">
									{singleArt?.sale ? (
										<span className="sale-price">${singleArt?.sale}</span>
									) : (
										`$${singleArt?.price}`
									)}
								</p>
								<p className="single-art__style">Style: {singleArt?.style}</p>
								<p className="single-art__material">
									Material: {singleArt?.material}
								</p>
								<p className="single-art__size">Size: {singleArt?.size}</p>
								<p className="single-art__status">Status: {status}</p>
								<p className="single-art__description">{singleArt?.description}</p>
								<p className="single-art__created">
									Created on: {singleArt?.formattedDate}
								</p>
							</div>
						</article>

						<BlockAuthor author={author} />
					</div>
					<div className="">
						<BlockArts
							itemsRef={itemsRef}
							arts={currentItems}
							loading={loading}
							page={currentPage}
							singleArtId={singleArt?._id}
							compareHeightImage={imgDimensions.width > imgDimensions.height}
						/>

						<Pagination
							totalPages={totalPages}
							handlePageChange={handlePageChange}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleArt;
