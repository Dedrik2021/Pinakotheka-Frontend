import { BsThreeDotsVertical } from 'react-icons/bs';
import { BeatLoader } from 'react-spinners';

import './chatHeader.scss';

const ChatHeader = ({
	activeConversation,
	user,
	typing,
	onlineUsers,
	checkOnlineStatus,
	capitalizeFirstLetter,
	getConversationName,
}) => {
	return activeConversation?.users?.length ? (
		<div className="chat-header">
			<div className="chat-header__wrapper">
				<div className="chat-header__info">
					<img
						height={40}
						width={40}
						src={activeConversation?.picture}
						alt={activeConversation?.name}
					/>
					<h2>
						{
							capitalizeFirstLetter(
								activeConversation?.users[0]?._id === user?._id
									? activeConversation?.name
									: activeConversation?.sender_name,
							).split(' ')[0]
						}
					</h2>

					<OnlineOfflineIndicator
						isOnline={checkOnlineStatus(onlineUsers, user, activeConversation?.users)}
					/>
				</div>
				<button className="btn chat-header__btn" type="button">
					<BsThreeDotsVertical size={25} />
				</button>
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