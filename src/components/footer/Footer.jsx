import { Link, useLocation, NavLink } from 'react-router-dom';

import Logo from '../../assets/images/Logo';
import { headerLinks } from '../header/Header';

import './footer.scss';

const Footer = () => {
	const location = useLocation();
	const locationPathname = location.pathname.split('/')[1]

	return (
		<div className="footer">
			<div className="container">
				<nav className="footer__nav">
					<Link to={'/'}>
						<Logo width={175} fill={'#fff'} />
					</Link>
					<ul className="footer__nav__list">
						{headerLinks.map((link) => (
							<li key={link.id} className="footer__nav__item">
								<NavLink
									className={`footer__nav__link ${
										locationPathname === link.path.split('/')[1] ? 'active' : ''
									}`}
									to={link.path}
								>
									{link.title}
								</NavLink>
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
