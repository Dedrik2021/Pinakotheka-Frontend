import Slider from 'react-slick';
import { useState, useEffect } from 'react';

import { getImageDimensions } from '../../../utils/helper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './heroImgSlider.scss';

const HeroImgSlider = (props) => {
	const { imgSlider, sliderInfo, setSliderImg, paintings } = props;
	const [imageDimensions, setImageDimensions] = useState({});

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

	console.log(imageDimensions);

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
						<li className="hero__item hero__item--img" key={_id}>
							{imageDimensions[_id] && (
								<img
									src={image}
									alt={title}
									height={540}
									width={imageDimensions[_id]?.width < imageDimensions[_id]?.height ? 400 : 900}
								/>
							)}

							{/* <div
								className="hero__img-blur blur"
								style={{ backgroundImage: `url(${image})`, height:  imageDimensions[_id]?.width < imageDimensions[_id]?.height ? "540px" : "540px", width: imageDimensions[_id]?.width < imageDimensions[_id]?.height ? "430px" : "900px" }}
							></div> */}
							{/* {imageDimensions[_id] && (
								<p>
									Размер: {imageDimensions[_id].width}x
									{imageDimensions[_id].height}
								</p>
							)} */}
						</li>
					);
				})}
			</Slider>
		</div>
	);
};

export default HeroImgSlider;
