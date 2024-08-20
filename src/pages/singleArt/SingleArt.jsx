import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getPaintingById, getPaintingsByAuthorId } from '../../redux/slices/paintingSlice';
import { getAuthorById } from '../../redux/slices/userSlice';
import Spinner from '../../components/spinner/Spinner';
import { getImageDimensions } from '../../utils/helper';
import BlockAuthor from './blockAuthor/BlockAuthor';
import BlockArts from './blockArts/BlockArts';

import './singleArt.scss';

const SingleArt = () => {
	const { artId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { singleArt, error, status, authorsArts } = useSelector((state) => state.painting);
	const { author } = useSelector((state) => state.user);

	const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(getPaintingById(artId));
	}, [artId, dispatch]);

	useEffect(() => {
		if (singleArt?.authorId) {
			dispatch(getPaintingsByAuthorId(singleArt?.authorId));
			dispatch(getAuthorById(singleArt?.authorId));
		}
	}, [singleArt?.authorId, dispatch]);

	console.log(author);
	console.log(authorsArts);

	const handleImageLoad = async () => {
		const { width, height } = await getImageDimensions(singleArt?.image);
		setImgDimensions({ width, height });
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

	if (status === 'loading' && imgDimensions.width === 0) {
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
								/>
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
						<BlockArts arts={authorsArts} singleArtId={singleArt?._id} />
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleArt;
