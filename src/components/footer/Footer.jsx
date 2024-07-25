import { Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo';
import { headerLinks } from '../header/Header';

import './footer.scss';

const Footer = () => {
	return (
		<div className="footer">
			<div className="container">
				<nav className="footer__nav">
					<Link to={'/'}>
						<Logo width={175} fill={'#fff'} />
					</Link>
					<ul className="footer__nav__list">
						{headerLinks.map((link, i) => (
							<li key={i} className="footer__nav__item">
								<Link className="footer__nav__link" to={link.path}>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
					<p className="footer__copyright">
						Copyright © {new Date().getFullYear()}. All Rights Reserved.
					</p>
				</nav>
			</div>
		</div>
	);
};

export default Footer;
