import { BeatLoader } from 'react-spinners';

import ChatHeaderDropdown from '../chatHeaderDropdown/ChatHeaderDropdown';

import './chatHeader.scss';

const ChatHeader = ({
	activeConversation,
	user,
	typing,
	onlineUsers,
	checkOnlineStatus,
	capitalizeFirstLetter,
	getConversationName,
	getConversationPicture,
	handleDeleteConversation
}) => {


	return activeConversation?.users?.length ? (
		<div className="chat-header">
			<div className="chat-header__wrapper">
				<div className="chat-header__info">
					<img
						height={40}
						width={40}
						src={getConversationPicture(user, activeConversation?.users)}
						alt={getConversationName(user, activeConversation?.users)}
					/>
					<h2>
						{
							capitalizeFirstLetter(
								getConversationName(user, activeConversation?.users),
							).split(' ')[0]
						}
					</h2>

					<OnlineOfflineIndicator
						isOnline={checkOnlineStatus(onlineUsers, user, activeConversation?.users)}
					/>
				</div>
				
				<ChatHeaderDropdown handleDeleteConversation={handleDeleteConversation} />
			</div>
			{typing === activeConversation?._id ? (
				<div className="typing">
					{capitalizeFirstLetter(
						getConversationName(user, activeConversation?.users).split(' ')[0],
					)}{' '}
					typing
					<BeatLoader color="#fff" size={5} />
				</div>
			) : null}
		</div>
	) : (
		<div className="chat-header">
			<h2>Start Chatting </h2>
		</div>
	);
};

export default ChatHeader;

const OnlineOfflineIndicator = ({ isOnline }) => {
	return (
		<div>
			{isOnline ? (
				<div style={{ color: 'green' }}>🟢 Online</div>
			) : (
				<div style={{ color: 'red' }}>🔴 Offline</div>
			)}
		</div>
	);
};
