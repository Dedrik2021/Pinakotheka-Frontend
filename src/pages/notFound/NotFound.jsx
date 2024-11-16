import { Link } from 'react-router-dom';

import img from '../../assets/images/error-404.png';

import './notFound.scss';

const NotFound = () => {
	return (
		<div className="not-found">
			<div className="container">
				<div className="not-found__content">
					<div className="not-found__img-wrapper">
						<img height={700} src={img} alt="404" />
						<span className="not-found__span title">404</span>
						<h2 className="not-found__title title">Page not found</h2>
						<Link className="not-found__link" to="/">
							Back to main page
						</Link>
					</div>
					<span className="not-found__background"></span>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
