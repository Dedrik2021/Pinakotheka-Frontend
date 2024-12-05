import Slider from 'react-slick';
import { useState, useEffect } from 'react';

import { getImageDimensions } from '../../../utils/helper';
import img_frame_horizontal from '../../../assets/images/frame_horizontal.png';
import img_frame_vertical from '../../../assets/images/frame_vertical.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './heroImgSlider.scss';

const HeroImgSlider = (props) => {
	const { imgSlider, sliderInfo, setSliderImg, paintings } = props;
	const [imageDimensions, setImageDimensions] = useState({});
	const [imgCheck, setImgCheck] = useState(false);

	useEffect(() => {
		const fetchImageDimensions = async () => {
			const dimensions = {};
			for (const painting of paintings) {
				try {
					const { width, height } = await getImageDimensions(painting.image);
					dimensions[painting._id] = { width, height };
				} catch (error) {
					console.error(`Error loading image ${painting.image}:`, error);
				}
			}
			setImageDimensions(dimensions);
		};

		fetchImageDimensions();
	}, []);

	useEffect(() => {
		if (Object.keys(imageDimensions).length > 0) {
			setTimeout(() => {
				setImgCheck(true);
			}, 0);
		}
	}, [imageDimensions]);

	return (
		<div className="container container--lg">
			<Slider
				className="hero__pick-slider"
				slide="ul"
				{...imgSlider}
				asNavFor={sliderInfo}
				ref={(sliderImg) => setSliderImg(sliderImg)}
			>
				{paintings?.map(({ _id, image, title }) => {
					return (
						<li
							className={`hero__item hero__item--img ${
								imageDimensions[_id]?.width > imageDimensions[_id]?.height
									? 'big'
									: 'small'
							}`}
							key={_id}
						>
							{imgCheck ? (
								<div
									className="hero__img-wrapper"
									style={{
										width:
											imageDimensions[_id]?.width <
											imageDimensions[_id]?.height
												? 400
												: 900,
									}}
								>
									<div
										className="hero__frame"
										style={{
											backgroundImage: `url(${
												imageDimensions[_id]?.width >
												imageDimensions[_id]?.height
													? img_frame_horizontal
													: img_frame_vertical
											})`,
											width:
												imageDimensions[_id]?.width <
												imageDimensions[_id]?.height
													? 620
													: 1120,
											height:
												imageDimensions[_id]?.width <
												imageDimensions[_id]?.height
													? 880
													: 760,
											left:
												imageDimensions[_id]?.width <
												imageDimensions[_id]?.height
													? -110
													: -175,
											top:
												imageDimensions[_id]?.width <
												imageDimensions[_id]?.height
													? -145
													: -135,
										}}
									></div>
									<img
										src={image}
										alt={title}
										height={
											imageDimensions[_id]?.width >
											imageDimensions[_id]?.height
												? 500
												: 600
										}
										width={
											imageDimensions[_id]?.width <
											imageDimensions[_id]?.height
												? 400
												: 770
										}
										style={{
											boxShadow:
												imageDimensions[_id]?.width <
												imageDimensions[_id]?.height
													? '35px 21px 10px 47px rgba(0, 0, 0, 0.5)'
													: '38px 32px 10px 55px rgba(0, 0, 0, 0.5)',
										}}
									/>
								</div>
							) : null}
						</li>
					);
				})}
			</Slider>
		</div>
	);
};

export default HeroImgSlider;
