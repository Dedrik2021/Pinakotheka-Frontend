import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import Logo from '../../assets/images/Logo.jsx';
import { logout } from '../../redux/slices/userSlice';
import InfoModal from '../infoModal/InfoModal.jsx';
import UserDropdown from '../userDropdown/UserDropdown.jsx';
import Search from '../search/Search.jsx';

import './header.scss';

const headerLinks = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'Creations',
		path: '/creations',
	},
	{
		title: 'About',
		path: '/about',
	},
	{
		title: 'Contact',
		path: '/contact',
	},
];

const Header = () => {
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [scroll, setScroll] = useState(0);
	const [openSearch, setOpenSearch] = useState(false);

	const { user } = useSelector((state) => state.user);
	const { token } = user;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		setOpenLoginModal(true);
	};

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY);
		});

		return () => {
			window.removeEventListener('scroll', () => {
				setScroll(window.scrollY);
			});
		};
	}, []);

	return (
		<div className={`header ${scroll > 0 ? 'scroll' : ''}`}>
			<div className="container">
				<InfoModal
					open={openLoginModal}
					func={() => dispatch(logout())}
					setOpen={setOpenLoginModal}
				/>
				<nav className="header__nav">
					<Link to="/">
						<Logo width={175} />
					</Link>
					<div>
						{openSearch && (
							<Search setOpenSearch={setOpenSearch} openSearch={openSearch} />
						)}
						<button
								onClick={() => setOpenSearch(!openSearch)}
								type="button"
								className={`btn header__search__btn ${openSearch ? 'open' : ''}`}>
							
								{openSearch ? <IoClose size={23} /> : <FaSearch size={18} />}
							</button>
					</div>
					<ul
						style={{ fontSize: '16px', fontWeight: '600' }}
						className="header__nav__list"
					>
						{headerLinks.map((link, i) => {
							return (
								<li key={i}>
									<Link to={link.path} className="header__nav__dropdown">
										{link.title}
									</Link>
								</li>
							);
						})}
					</ul>
					<div>
						<button
							type="button"
							onClick={() => (token ? null : navigate('/login'))}
							className="btn"
						>
							{token ? <UserDropdown logout={() => handleLogout()} /> : 'Login'}
						</button>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header;
