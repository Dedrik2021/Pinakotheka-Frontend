import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoLogOut  } from 'react-icons/io5';
import { MdAccountBox, MdDashboardCustomize  } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ logout, open }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate()
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		setAnchorEl(null);
	};

	const navigateMyAccount = () => {
		navigate('/my-account')
		handleClose()
	}

	const navigateDashboard = () => {
		navigate('/dashboard')
		handleClose()
	}

	return (
		<div>
			<button
				type="button"
				onClick={handleClick}
				className="header__nav__button btn btn--universal btn--black"
				style={{ color: 'white', backgroundColor: open ? '#ce0020' : 'black' }}
			>
				Profile
			</button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={navigateMyAccount}>
					<MdAccountBox size={20} />
					<span style={{ marginLeft: '3px' }}>My account</span>
				</MenuItem>
				<MenuItem onClick={navigateDashboard}>
					< MdDashboardCustomize size={20} />
					<span style={{ marginLeft: '3px' }}>Dashboard</span>
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<IoLogOut  size={20} />
					<span style={{ marginLeft: '3px' }}>Logout</span>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default UserDropdown;
