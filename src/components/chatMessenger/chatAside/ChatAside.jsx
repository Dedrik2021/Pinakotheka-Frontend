import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { BeatLoader } from 'react-spinners';

import SocketContext from '../../../context/SocketContext';
import { formatDate, capitalizeFirstLetter } from '../../../utils/helper';
import {
	getConversationId,
	getConversationName,
	getConversationPicture,
	checkOnlineStatus,
} from '../../../utils/chat';
import { updateUnreadMessage } from '../../../redux/slices/userSlice';
import { openCreateConversation } from '../../../redux/slices/chatSlice';

import './chatAside.scss';

const ChatAside = ({ conversations, activeConversation, user, onlineUsers, typing, setLoading, socket }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const openNewChat = async (id, convo) => {
		setLoading(true);
		const values = {
			receiver_id: getConversationId(user, convo?.users),
			token: user?.token,
			sender_name: user?.name,
			receiver_name: convo?.name,
			receiver_picture: convo?.picture,
		};

		await dispatch(openCreateConversation(values));
		socket.emit('join-conversation', activeConversation?._id);
		await dispatch(updateUnreadMessage({ userId: user?._id, senderId: id }));
		navigate('/messenger/' + id);
		setLoading(false);
	};

	const unreadMessagesArray = Object.entries(user?.unreadMessages).map(([id, mg]) => ({
		id,
		mg,
	}));

	return conversations.length && conversations?.filter((convo) => convo?.latestMessage).length ? (
		<aside className={`aside-profile ${conversations?.length > 13 ? 'scroll' : ''} `}>
			<ul
				className={`aside-profile__list scrollbar ${
					conversations?.length > 13 ? 'scroll' : ''
				} `}
			>
				{conversations
					?.filter(
						(convo) => convo?.latestMessage || convo?._id === activeConversation?._id,
					)
					?.map((convo) => {
						return (
							<li
								key={convo?._id}
								onClick={() =>
									openNewChat(
										convo?.users[1]?._id === user?._id
											? convo?.users[0]?._id
											: convo?.users[1]?._id,
										convo,
									)
								}
								className={`${
									activeConversation?._id === convo?._id ? 'active' : ''
								} ${
									checkOnlineStatus(onlineUsers, user, convo?.users)
										? 'online'
										: ''
								} `}
							>
								<div className="avatar">
									<img
										src={getConversationPicture(user, convo?.users)}
										alt="avatar"
									/>
								</div>
								<div className="profile-info">
									<h3>
										{capitalizeFirstLetter(
											getConversationName(user, convo?.users),
										)}
									</h3>

									{typing === convo?._id ? (
										<div
											className="typing status"
											style={{
												color: `${
													activeConversation?._id === convo?._id
														? 'white'
														: 'black'
												}`,
											}}
										>
											Typing
											<BeatLoader
												color={`${
													activeConversation?._id === convo?._id
														? 'white'
														: 'black'
												}`}
												size={5}
											/>
										</div>
									) : (
										<p>
											{convo?.latestMessage?.createdAt
												? formatDate(convo?.latestMessage?.createdAt)
												: ''}
										</p>
									)}
								</div>
								{unreadMessagesArray?.map(({ id, mg }) => {
									return id === convo?.users[1]?._id ||
										id === convo?.users[0]?._id ? (
										<span
											style={{
												padding: mg > 9 && '1.5px',
											}}
											className={`unread ${
												conversations?.length > 13 ? 'scroll' : ''
											}`}
											key={id}
										>
											{mg}
										</span>
									) : null;
								})}
							</li>
						);
					})}
			</ul>
		</aside>
	) : null;
};

const ChatAsideWithSocket = (props) => {
	return (
		<SocketContext.Consumer>
			{(socket) => <ChatAside {...props} socket={socket} />}
		</SocketContext.Consumer>
	);
};

export default ChatAsideWithSocket;
