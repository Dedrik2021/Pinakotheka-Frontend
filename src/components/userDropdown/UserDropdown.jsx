import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoLogOutOutline } from "react-icons/io5";

const Dropdown = ({logout}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		setAnchorEl(null);
	}

	return (
		<div>
			<button
				type="button"
				onClick={handleClick}
				className="header__nav__button btn btn--universal btn--black"
			>
				Profile
			</button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleLogout}>
					<IoLogOutOutline size={20} />
					<span style={{ marginLeft: "3px" }}>Logout</span>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default Dropdown;
