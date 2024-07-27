import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './heroInfoSlider.scss';

const HeroInfoSlider = (props) => {
	const { infoSlider, sliderImg, setSliderInfo, paintings } = props;

	// const firstPaintings = paintingsInfo.map((item) => item.works[0]);

	return (
		<Slider
			className="hero__content-slider"
			{...infoSlider}
			asNavFor={sliderImg}
			slide="ul"
			ref={(sliderInfo) => setSliderInfo(sliderInfo)}
		>
			{paintings?.map(({ _id, author, title, material, size, price }) => {
				return (
					<li className="hero__item" key={_id}>
						<article className="pick-card">
							<h3 className="pick-card__title">{title}</h3>
							<span className="pick-card__id">
								ID: <span>{_id}</span>
							</span>
							<div className="pick-card__wrapper">
								<span>Author:</span>
								<Link className="pick-card__item pick-card__item--link" to={''} rel="author">
									{author}
								</Link>
							</div>
							<span className="pick-card__material">
								<span>Material:</span>
								<span className="pick-card__item">{material}</span>
							</span>
							<span className="pick-card__material">
								<span>Size:</span>
								<span className="pick-card__item">{size}</span>
							</span>
							<div className="pick-card__box">
								<Link
									className="pick-card__btn btn btn--red btn--universal"
									// to={`/SinglePainting/${work.id}`}
									// to={''}
									// onClick={() => onPainting(work.emailId)}
								>
									More details
								</Link>
								<span className="pick-card__price">
									<span>€</span>
									{price}
								</span>
							</div>
							{/* <div className="pick-card__dots">
									<span className="pick-card__num">01</span>
									<span className="pick-card__num">{paintings.length > 9 ? paintings.length : `0${paintings.length}`}</span>
								</div> */}
						</article>
					</li>
				);
			})}
		</Slider>
	);
};

export default HeroInfoSlider;
