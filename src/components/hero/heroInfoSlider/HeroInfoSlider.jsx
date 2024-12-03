import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './heroInfoSlider.scss';

const HeroInfoSlider = (props) => {
	const { infoSlider, sliderImg, setSliderInfo, paintings } = props;

	return (
		<Slider
			className="hero__content-slider"
			{...infoSlider}
			asNavFor={sliderImg}
			slide="ul"
			ref={(sliderInfo) => setSliderInfo(sliderInfo)}
		>
			{paintings?.map(({ _id, authorId, authorName, name, price }) => {
				return (
					<li className="hero__item" key={_id}>
						<article className="pick-card">
							<h3 className="pick-card__title">{name}</h3>
							<span className="pick-card__id">
								<span className='pick-card__span' >Lot:</span> <span className="pick-card__item">{_id}</span>
							</span>
							<div className="pick-card__wrapper">
								<span className='pick-card__span'>Author:</span>
								<Link className="pick-card__item pick-card__item--link" to={`/single-user/${authorId}`} rel="author">
									{authorName}
								</Link>
							</div>
							<div className="pick-card__box">
								<Link
									className="pick-card__btn btn btn--red btn--universal"
									to={`/single-art/${_id}`}
								>
									More details
								</Link>
								<span className="pick-card__price">
									<span>€</span>
									{price}
								</span>
							</div>
						</article>
					</li>
				);
			})}
		</Slider>
	);
};

export default HeroInfoSlider;
