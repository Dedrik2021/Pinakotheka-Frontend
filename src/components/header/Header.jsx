import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import Logo from '../../assets/images/Logo.jsx';
import { logout } from '../../redux/slices/userSlice';
import InfoModal from '../infoModal/InfoModal.jsx';
import UserDropdown from '../userDropdown/UserDropdown.jsx';
import Search from '../search/Search.jsx';
import { getAllPaintings } from '../../redux/slices/paintingSlice.js';
import { addPainting } from '../../redux/slices/paintingSlice.js';

import './header.scss';

export const headerLinks = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'Catalog',
		path: '/catalog',
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
	const [openDropdown, setOpenDropdown] = useState(false);

	const searchRef = useRef();

	const { user } = useSelector((state) => state.user);
	const { token } = user;
	// console.log(user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		setOpenLoginModal(true);
	};

	useEffect(() => {
		const getPaint = async () => {
			await dispatch(getAllPaintings());
		};

		getPaint();
	}, [dispatch]);

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

	const handleClickOutside = (event) => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setOpenSearch(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
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
					<div className="header__search">
						{openSearch && <Search searchRef={searchRef} openSearch={openSearch} />}
						<button
							onClick={() => setOpenSearch(!openSearch)}
							type="button"
							className={`btn header__search__btn ${openSearch ? 'open' : ''}`}
						>
							{openSearch ? <IoClose size={20} /> : <FaSearch size={18} />}
						</button>
					</div>
					<ul
						style={{ fontSize: '16px', fontWeight: '600' }}
						className="header__nav__list"
					>
						{headerLinks.map((link, i) => {
							return (
								<li key={i}>
									<NavLink to={link.path} className="header__nav__link">
										{link.title}
									</NavLink>
								</li>
							);
						})}
					</ul>
					<div>
						<button
							type="button"
							onClick={() =>
								token ? setOpenDropdown(!openDropdown) : navigate('/login')
							}
							className={`btn ${
								!token ? ' btn--universal btn--black header__nav__button' : ''
							}}`}
							style={{ padding: !token && '5px 10px' }}
						>
							{token ? (
								<UserDropdown logout={() => handleLogout()} open={openDropdown} />
							) : (
								'Login'
							)}
						</button>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header;
