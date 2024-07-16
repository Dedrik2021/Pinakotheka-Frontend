import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaPaintBrush, FaRegNewspaper, FaPhoneAlt } from 'react-icons/fa';

const DropdownLink = ({ logout }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isHovered, setIsHovered] = React.useState(false);
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
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div>
			<button
				type="button"
				onClick={handleClick}
				style={{ fontSize: '16px', fontWeight: '600' }}
				className="header__nav__button btn btn--universal"
			>
				<span
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					style={{ borderBottom: '2px solid transparent', transition: 'border-bottom-color 0.3s ease-in-out', borderBottomColor: isHovered ? '#ce0020' : 'transparent' }}
					className="header__nav__dropdown"
				>
					Catalog
				</span>
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
				<MenuItem onClick={handleClose}>
					<FaPaintBrush size={15} />
					<span style={{ paddingLeft: '5px' }}>Creations</span>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<FaRegNewspaper size={15} />
					<span style={{ paddingLeft: '5px' }}>News</span>
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<FaPhoneAlt size={15} />
					<span style={{ paddingLeft: '5px' }}>Contacts</span>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default DropdownLink;
