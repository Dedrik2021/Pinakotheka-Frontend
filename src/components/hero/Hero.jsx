import { useState } from 'react';

import HeroImgSlider from './heroImgSlider/HeroImgSlider';
import HeroInfoSlider from './heroInfoSlider/HeroInfoSlider';
import { uniquePaintingsByAuthor } from '../../utils/helper';

import './hero.scss';

const NextArrow = (props) => {
	const { style, onClick } = props;
	return (
		<div
			className={'slick-btn slick-btn--next'}
			style={{ ...style, display: 'block', cursor: 'pointer' }}
			onClick={onClick}
		/>
	);
};

const PrevArrow = (props) => {
	const { style, onClick } = props;
	return (
		<div
			className={'slick-btn slick-btn--prev'}
			style={{ ...style, display: 'block', cursor: 'pointer' }}
			onClick={onClick}
		/>
	);
};

const Hero = ({ paintings }) => {
	const [sliderImg, setSliderImg] = useState();
	const [sliderInfo, setSliderInfo] = useState();
    const uniquePaintings = uniquePaintingsByAuthor(paintings);

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

	const imgSlider = {
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: false,
		arrows: false,
        speed: 700,
		centerMode: true,
		centerPadding: '105px',
		responsive: [
			{
				breakpoint: 1890,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					centerMode: false,
				},
			},
			{
				breakpoint: 1670,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
				},
			},
		],
	};

	const infoSlider = {
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
		fade: true,
        speed: 700,
		draggable: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,
        autoplaySpeed: 5000,
		customPaging: (i) => (
			<div className="custom-dot" >
				<div style={{backgroundColor: uniquePaintings.length > 19 ? '#8c8c8c' : 'black' }} className="custom-block">{i + 1}</div>
			</div>
		),
		appendDots: (dots) => (
			<div>
				<ul className="slick-dots" style={{ margin: '0px' }}>
					<li className='slick-item slick-item--left'>
						<span className="pick-card__num">01</span>
					</li>
					{dots}
					<li className='slick-item slick-item--right'>
						<span style={{color: uniquePaintings.length > 19 ? '#ccc' : 'black' }} className="pick-card__num">
							{uniquePaintings.length > 9 ? uniquePaintings.length : `0${uniquePaintings.length}`}
						</span>
					</li>
				</ul>
			</div>
		),
	};

	return (
		<section className={`hero`}>
			<h2 className="sr-only">Our authors</h2>
			<div className="container container--lg">
				<span className="hero__circle"></span>
				<div className="hero__scroll">
					<span></span>
					Roll down
				</div>
			</div>
			<div className="hero__sliders">
				<HeroImgSlider
					imgSlider={imgSlider}
					sliderInfo={sliderInfo}
					setSliderImg={setSliderImg}
					paintings={uniquePaintings}
				/>

				<HeroInfoSlider
					infoSlider={infoSlider}
					sliderImg={sliderImg}
					setSliderInfo={setSliderInfo}
					paintings={uniquePaintings}
				/>
			</div>
		</section>
	);
};

export default Hero;
