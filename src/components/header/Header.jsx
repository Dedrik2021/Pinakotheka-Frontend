import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import Logo from '../../assets/images/Logo.jsx';
import { logout, getUsers } from '../../redux/slices/userSlice';
import InfoModal from '../infoModal/InfoModal.jsx';
import UserDropdown from '../userDropdown/UserDropdown.jsx';
import Search from '../search/Search.jsx';
import { getAllPaintings } from '../../redux/slices/paintingSlice.js';

import './header.scss';

export const headerLinks = [
	{
		id: 1,
		title: 'Home',
		path: '/',
	},
	{
		id: 2,
		title: 'Catalog',
		path: '/catalog/paintings',
	},
	{
		id: 3,
		title: 'About',
		path: '/about',
	},
	{
		id: 4,
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
	const searchListRef = useRef();
	const location = useLocation()
	const locationPathname = location.pathname.split('/')[1]
	
	const { user, users = [] } = useSelector((state) => state.user);
	const { paintings = [], status } = useSelector((state) => state.painting);
	const { token } = user;
	// console.log(user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		setOpenLoginModal(true);
	};

	const data = [...paintings, ...users];

	useEffect(() => {
		dispatch(getAllPaintings());
	}, []);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

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
					<div className="header__search">
						{openSearch && (
							<Search
								searchListRef={searchListRef}
								data={data}
								searchRef={searchRef}
								openSearch={openSearch}
								setOpenSearch={setOpenSearch}
							/>
						)}
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
						{headerLinks.map((link) => {
							return (
								<li key={link.id}>
									<NavLink to={link.path}  className={`header__nav__link ${locationPathname === link.path.split('/')[1] ? "active" : ""}`}>
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
							{token || openDropdown ? (
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
