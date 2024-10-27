import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaMessage } from "react-icons/fa6";

const ChatHeaderDropdown = ({handleDeleteConversation}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
    
	return (
		<div >
			<button className={`btn chat-header__btn ${anchorEl ? 'active' : ''} `} type="button" onClick={handleClick}>
				<BsThreeDotsVertical size={25} />
			</button>
			<Menu
				id="mesage-appbar-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
                style={{ left: '-70px', top: '5px', padding: '0' }}
			>
				<MenuItem onClick={handleDeleteConversation} style={{ padding: '0 10px 0' }}>
					<FaMessage size={17} />
					<span style={{ marginLeft: '5px', fontSize: '14px' }}>Delete Conversation</span>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default ChatHeaderDropdown;
