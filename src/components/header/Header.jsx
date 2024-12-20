import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping, FaEnvelope } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import Logo from '../../assets/images/Logo.jsx';
import { logout, getUsers, refreshUser, setOnlineUsers } from '../../redux/slices/userSlice';
import InfoModal from '../infoModal/InfoModal.jsx';
import UserDropdown from '../userDropdown/UserDropdown.jsx';
import Search from '../search/Search.jsx';
import { getAllPaintings } from '../../redux/slices/paintingSlice.js';
import { getProducts } from '../../redux/slices/productSlice.js';
import { setUpdateMessagesConvo, clearFiles } from '../../redux/slices/chatSlice.js';
import { socket } from '../../App.js';
import { notifyUser } from '../../utils/notifyUser.js';
import mp3 from '../../assets/sounds/ring3.mp3';

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
	const [openDropdown, setOpenDropdown] = useState(false);
	const [animateCart, setAnimateCart] = useState(false);
	const [animateEnv, setAnimateEnv] = useState(false);
	const [animate, setAnimate] = useState(false);
	const [animateEnvelope, setAnimateEnvelope] = useState(false);

	const searchRef = useRef();
	const searchListRef = useRef();
	const location = useLocation();
	const locationPathname = location.pathname.split('/')[1];

	const { user, users = [] } = useSelector((state) => state.user);
	const { messagesConvo } = useSelector((state) => state.chat);
	const { paintings = [] } = useSelector((state) => state.painting);
	const { products } = useSelector((state) => state.product);
	const { token } = user;
	// const token = ''

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		setOpenLoginModal(true);
	};

	useEffect(() => {
		if (location.pathname !== '/messenger') {
			dispatch(clearFiles());
		}
	}, [dispatch, location]);

	const data = [...paintings, ...users];
	const unreadMessagesArray = Object?.entries(user?.unreadMessages)?.map(([id, mes]) => ({
		id,
		mes,
	}));

	const unreadMessagesLength = unreadMessagesArray?.length;

	const sumOfMessages = unreadMessagesArray?.reduce(
		(accumulator, { mes }) => accumulator + mes,
		0,
	);

	useEffect(() => {
		socket.emit('join', user._id);
		//get online users
		socket.on('get-online-users', (users) => {
			dispatch(setOnlineUsers(users));
		});
	}, [user]);

	useEffect(() => {
		const handleReceiveMessage = async (message) => {
			await notifyUser(mp3);
			await dispatch(setUpdateMessagesConvo(message));
			await dispatch(refreshUser(user?._id));
		};

		socket.on('receive-message', handleReceiveMessage);

		return () => {
			socket.off('receive-message', handleReceiveMessage);
		};
	}, [dispatch, user?._id]);

	useEffect(() => {
		if ((token && user?._id) || messagesConvo || location.pathname) {
			dispatch(refreshUser(user?._id));
		}
	}, [dispatch, token, user?._id, messagesConvo, location.pathname]);

	useEffect(() => {
		let intervalId;
		let timeoutId;
		let timeoutId2;

		if (unreadMessagesLength > 0) {
			// Start the initial animation
			setAnimateEnvelope(true);

			// Stop the envelope animation after 500ms
			timeoutId = setTimeout(() => setAnimateEnvelope(false), 500);

			// Set up an interval to animate every 6 seconds
			intervalId = setInterval(() => {
				setAnimateEnv(true);
				timeoutId2 = setTimeout(() => setAnimateEnv(false), 1500);
			}, 30000);
		} else {
			clearTimeout(timeoutId, timeoutId2);
			clearInterval(intervalId);
			// Clear timeout and interval if unreadMessagesLength is 0
		}

		// Clean up timeout and interval on component unmount or when unreadMessagesLength changes
		return () => {
			clearTimeout(timeoutId, timeoutId2);
			clearInterval(intervalId);
		};
	}, [unreadMessagesLength, messagesConvo]);

	useEffect(() => {
		dispatch(getAllPaintings());
	}, []);

	useEffect(() => {
		if (location.pathname !== '/cart') {
			dispatch(getProducts(user?.token));
		}
	}, [dispatch, location.pathname, user?.token]);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	useEffect(() => {
		let intervalId;
		let timeoutId;
		let timeoutId2;

		if (products?.length > 0) {
			// Start the initial animation
			setAnimateCart(true);

			// Stop the envelope animation after 500ms
			timeoutId = setTimeout(() => setAnimateCart(false), 500);

			// Set up an interval to animate every 6 seconds
			intervalId = setInterval(() => {
				setAnimate(true);
				timeoutId2 = setTimeout(() => setAnimate(false), 1500);
			}, 30000);
		} else {
			// Clear timeout and interval if unreadMessagesLength is 0
			clearTimeout(timeoutId, timeoutId2);
			clearInterval(intervalId);
		}

		// Clean up timeout and interval on component unmount or when unreadMessagesLength changes
		return () => {
			clearTimeout(timeoutId, timeoutId2);
			clearInterval(intervalId);
		};
	}, [products?.length]);

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
							<Search
								searchListRef={searchListRef}
								data={data}
								searchRef={searchRef}
							/>
					</div>
					<ul
						style={{ fontSize: '16px', fontWeight: '600' }}
						className="header__nav__list"
					>
						{headerLinks.map((link) => {
							return (
								<li key={link.id}>
									<NavLink
										to={link.path}
										className={`header__nav__link ${
											locationPathname === link.path.split('/')[1]
												? 'active'
												: ''
										}`}
									>
										{link.title}
									</NavLink>
								</li>
							);
						})}
					</ul>
					<div className="header__nav__wrapper">
						{token ? (
							<>
								<Link
									className={`header__nav__cart ${
										locationPathname === 'cart' ? 'active' : ''
									} ${animateCart && 'animate'} ${animate && 'animate__cart'} `}
									to={`/cart`}
								>
									<FaCartShopping size={27} />
									<span>{products?.length ? products?.length : 0}</span>
								</Link>
								<Link
									className={`header__nav__cart ${
										locationPathname === 'messenger' ? 'active' : ''
									} ${animateEnvelope && 'animateEnvelope'} ${
										animateEnv && 'animate__envelope'
									} `}
									to={`/messenger`}
								>
									<FaEnvelope size={26} />
									{unreadMessagesLength > 0 ? <span>{sumOfMessages}</span> : null}
								</Link>
							</>
						) : null}
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
