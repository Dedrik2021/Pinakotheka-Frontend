import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Logo from '../../assets/images/Logo.jsx';
import { logout } from '../../redux/slices/userSlice';
import InfoModal from '../infoModal/InfoModal.jsx';

import './header.scss';

const Header = () => {
	const [openLoginModal, setOpenLoginModal] = useState(false);

	const { user } = useSelector((state) => state.user);
	const { token } = user;

	const dispatch = useDispatch();
    const navigate = useNavigate();

	const handleLogout = () => {
		setOpenLoginModal(true);

		// dispatch(logout());
	};

	return (
		<div className="header">
			<div className="container">
				<InfoModal open={openLoginModal} func={() => dispatch(logout())} setOpen={setOpenLoginModal} />
				<nav className="header__nav">
					<Link to="/">
						<Logo width={175} />
					</Link>
					<div>Search</div>
					<ul className="header__nav__list">
						<li>Link</li>
						<li>Link</li>
						<li>Link</li>
					</ul>
					<div>
						<button
							type="button"
							onClick={() => token ? handleLogout() : navigate('/login')}
							className="header__nav__button btn btn--universal btn--black"
						>
							{token ? 'Logout' : 'Login'}
						</button>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header;

// const Header = memo(() => {

// 	return (
// 		<header >
// 			<div className="container">
// 				<nav className={`menu`}>
// 					<Link className="logo header__logo" to={'/'}>
// 						<Logo width={'180'} height={'50'} />
// 					</Link>
// 					<button
// 						className={`menu__burger btn` }
// 						type="button"
// 						// onClick={clickOnBurgerBtn}
// 						// ref={burgerBtnRefs}
// 					>
// 						<span className="sr-only">
// 							{/* {switchBtn ? 'Öffne das Menü' : 'Open the menu'} */}
// 						</span>
// 						<span></span>
// 					</button>
// 					<div className={`menu__inner`} >
// 						{/* <HeaderSearchForm
// 							searchInputRefs={searchInputRefs}
// 							searchFormProps={searchFormProps}
// 						/>
// 						<HeaderSearchList
// 							searchInput={searchInput}
// 							filteredBySearch={filteredBySearch}
// 							clearSearchInput={clearSearchInput}
// 							search={search}
// 							loading={loadingSearchItems}
// 						/> */}
// 						<ul className="menu__list" >
// 							<li
// 								className={`menu__item menu__item--dropdown 
// 								`}
// 								// onClick={() => setDropdown(true)}
// 							>
// 								<button className={`menu__link `} type="button">
// 									{/* {switchBtn ? 'Katalog' : 'Catalog'} */}
// 								</button>
// 								<span className="menu__border-bottom"></span>
// 								{/* <HeaderDropdown /> */}
// 							</li>
// 							{/* {menuBtns.map(({ id, name, href }) => (
// 								<li key={id} className="menu__item">
// 									<Link className="menu__link" to={href}>
// 										{name}
// 									</Link>
// 									<span className="menu__border-bottom"></span>
// 								</li>
// 							))} */}
// 						</ul>
// 					</div>
// 					{/* <div className={`menu__box `}>
// 						<HeaderSwitchLangBtns changeLang={clickLanguageBtn} />

// 						{changeAuth()}
// 					</div> */}
// 				</nav>
// 			</div>
// 		</header>
// 	);
// });

// export default Header;
