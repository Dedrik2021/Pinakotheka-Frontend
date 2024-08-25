import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getImageDimensions, bodyLockScroll } from '../../../utils/helper';

import './artCard.scss';

const ArtCard = ({ singleArt, imgDimensions, setImgDimensions }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleImageLoad = async () => {
		const { width, height } = await getImageDimensions(singleArt?.image);
		setImgDimensions({ width, height });
	};

	useEffect(() => {
		if (singleArt?.image) {
			handleImageLoad();
		}
	}, [singleArt?.image]);

	const handleImageClick = () => {
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		bodyLockScroll(isFullScreen);
	}, [isFullScreen]);

	return (
		<article
			className={`single-art ${
				imgDimensions.width > imgDimensions.height
					? 'single-art--landscape'
					: 'single-art--portrait'
			}`}
			style={{
				backgroundColor: `${imgDimensions.width === 0 ? 'transparent' : '#fff'}`,
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
				<h1 className="single-art__title title">{singleArt?.name}</h1>
				<div className="single-art__wrapper">
					<span className="single-art__item single-art__weight">Created By:</span>
					<Link to={`/single-user/${singleArt?.authorId}`}>{singleArt?.authorName}</Link>
				</div>
				<div className="single-art__price">
					<div className="single-art__price-wrapper">
						<span className="single-art__item">Price:</span>
						<div className={` ${singleArt?.sale ? 'single-art__price--strike' : ''}`}>€{singleArt?.price}</div>
						{singleArt?.sale && <div className="single-art__price--sale">€{singleArt?.sale}</div>}
					</div>
					{singleArt?.sale && (
						<div className="single-art__sale">
							<span className="single-art__item">Sale</span>€{singleArt?.sale}
						</div>
					)}
				</div>
				<div className="single-art__wrapper">
					<span className="single-art__item single-art__weight">Style:</span>
					{singleArt?.style?.map((style, i) => (
						<span className="single-art__item" key={i}>
							[{style}]
						</span>
					))}
				</div>
				<div className="single-art__wrapper">
					<span className="single-art__item single-art__weight">Material:</span>
					{singleArt?.material?.map((material, i) => (
						<span className="single-art__item" key={i}>
							[{material}]
						</span>
					))}
				</div>
				<p className="single-art__size">Size: {singleArt?.size}</p>
				<p className="single-art__description">{singleArt?.description}</p>
				<p className="single-art__created">Created on: {singleArt?.formattedDate}</p>
			</div>
		</article>
	);
};

export default ArtCard;
