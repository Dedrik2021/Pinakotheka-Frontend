import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Logo from '../../assets/images/Logo.jsx';
import { logout } from '../../redux/slices/userSlice';
import InfoModal from '../infoModal/InfoModal.jsx';
import UserDropdown from '../userDropdown/UserDropdown.jsx';
import DropdownLink from '../dropdownLink/DropdownLink.jsx';

import './header.scss';

const Header = () => {
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [scroll, setScroll] = useState(0);

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
		<div  className={`header ${scroll > 0 ? 'scroll' : ''}`}>
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
					<div>Search</div>
					<ul
						style={{ fontSize: '16px', fontWeight: '600' }}
						className="header__nav__list"
					>
						<li>
							<Link className="header__nav__dropdown">
								<DropdownLink />
							</Link>
						</li>
						<li>
							<Link className="header__nav__dropdown">About</Link>
						</li>
						<li>
							<Link className="header__nav__dropdown">Contact</Link>
						</li>
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
