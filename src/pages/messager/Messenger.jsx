import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { getAuthorById } from '../../redux/slices/userSlice';
import {
	sendMessage,
	getMessagesByUserId,
	getMessagesByUserAndAuthorId,
	createMessage,
} from '../../redux/slices/messageSlice';
import Spinner from '../../components/spinner/Spinner';
import { formatDate } from '../../utils/helper';
import { socket } from '../../App';
import wallpaper from '../../assets/images/chat_wallpaper.jpg';
import startChatImg from '../../assets/images/start_chat.png';
import { updateUnreadMessage, refreshUser } from '../../redux/slices/userSlice';

import './messenger.scss';

const Messenger = () => {
	const { authorId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const chatContainerRef = useRef(null);
	const chatInputRef = useRef(null);

	const [text, setText] = useState('');
	const [height, setHeight] = useState(0);
	const [activeChat, setAuthorChat] = useState(null);

	const { user, error, status, author, users } = useSelector((state) => state.user);
	const { error: messageError, messages, userMessages } = useSelector((state) => state.message);

	// const messagesByAuthor = messages?.reduce((acc, message) => {
	// 	if (authorId) {
	// 		const author = users?.find((a) => a?._id === authorId);

	// 		if (!acc[message?.authorId]) {
	// 			acc[message?.authorId] = {
	// 				authorId: message?.authorId,
	// 				name: author?.name,
	// 				email: author?.email,
	// 				image: author?.image,
	// 				messages: [],
	// 			};
	// 		} 

	// 		acc[message?.authorId]?.messages?.push({
	// 			message: message?.message,
	// 			timestamp: message?.createdAt,
	// 		});
	// 	} 

	// 	return acc;
	// }, {});

	// const messagesByAuthors = messagesByAuthor && Object?.values(messagesByAuthor);

	// console.log('messagesByAuthors:', messagesByAuthors);
	

	const findConversationAuthors = (userId, messages) => {
		// Filter messages where the user is involved in the conversation but exclude self-authored messages
		const involvedMessages = messages?.filter(
			(msg) => msg?.userId === userId || (msg?.authorId === userId && msg?.authorId !== userId),
		);

		// Extract unique authorIds
		const uniqueAuthorIds = [...new Set(involvedMessages?.map((msg) => msg?.authorId))];

		return uniqueAuthorIds;
	};

	const authorsIdArray = findConversationAuthors(user?._id, userMessages);
	const usersWithAuthorIds = users?.filter(user => authorsIdArray?.includes(user._id));

	useEffect(() => {
		if (messages && messages.length ) {
			socket.on(
				`get-messages-by-user-and-author-id/${user?._id}/${author?._id}`,
				(newMessage) => {
					dispatch(createMessage(newMessage));
				},
			);

			return () => {
				socket.off(`get-messages-by-user-and-author-id/${user?._id}/${author?._id}`);
			};
		}
	}, [dispatch, messages, user?._id, author?._id]);

	// useEffect(() => {
	//     socket.on('newMessage', ({ senderId }) => {
	//         // Dispatch an action to update the unread count
	//         dispatch(incrementUnreadCount(senderId));
	//     });

	//     return () => {
	//         socket.off('newMessage');
	//     };
	// }, [dispatch]);

	useEffect(() => {
		dispatch(getMessagesByUserId({ userId: user?._id }));
		if (authorId) {
			dispatch(updateUnreadMessage({ userId: user?._id, senderId: authorId }));
			setAuthorChat(authorId);
			dispatch(getAuthorById(authorId));
			dispatch(getMessagesByUserAndAuthorId({ userId: user?._id, authorId }));
		}
	}, [authorId]);

	const handleChange = (event) => {
		setText(event.target.value);

		const newHeight = event.target.scrollHeight;
		setHeight(newHeight);
		event.target.style.height = `${newHeight}px`;
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (chatInputRef.current) {
			chatInputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (chatContainerRef.current && chatInputRef.current) {
			chatInputRef.current.focus();
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const handleSend = async (e) => {
		e?.preventDefault();
		if (text.trim()) {
			const newMessage = {
				userId: user?._id,
				authorId,
				chatId: author?._id,
				image: author?.image,
				message: text,
			};
			const message = await dispatch(sendMessage(newMessage));
			const createdMessage = message.payload;
			socket.emit('send-message', createdMessage);
			setText('');
			setHeight(0);
		}
	};

	const openNewChat = async (id) => {
		setAuthorChat(id);
		navigate('/messenger/' + id);
		await dispatch(updateUnreadMessage({ userId: user?._id, senderId: authorId }));
		await dispatch(refreshUser(user?._id));
	};

	const unreadMessagesArray = Object.entries(user?.unreadMessages).map(([id, mg]) => ({
		id,
		mg,
	}));

	useEffect(() => {
		if (error) {
			navigate('*');
		}
	}, [error, navigate]);

	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<>
			<Helmet>
				<meta name={`Pinakotheka | Messenger: ${author?.name} `} />
				<title>{`Pinakotheka | Messenger: ${author?.name} `}</title>
			</Helmet>
			<div className="messenger">
				<div className="container">
					<div className="messenger__wrapper">
						<aside className="aside-profile">
							<ul>
								{usersWithAuthorIds?.map((author) => {
									return (
										<li
											key={author?._id}
											onClick={() => openNewChat(author?._id)}
											className={`${
												activeChat === author?._id ? 'active' : ''
											}`}
										>
											<div className="avatar">
												<img src={author?.image} alt={author?.name} />
											</div>
											<div className="profile-info">
												<h3>{author?.name}</h3>
											</div>
											{unreadMessagesArray?.map(({ id, mg }) => {
												return id === author?._id ? (
													<span
														style={{ padding: mg > 9 && '1.5px' }}
														className="unread"
														key={id}
													>
														{mg}
													</span>
												) : null;
											})}
										</li>
									)
								})}
							</ul>
						</aside>
						<div className="chat-container">
							{authorId ? (
								<div className="chat-header">
									<h2>Chat with: {author?.name}</h2>
								</div>
							) : (
								<div className="chat-header">
									<h2>Start Chatting </h2>
								</div>
							)}
							<ul
								className={`chat-body scrollbar ${authorId ? 'active' : ''} `}
								style={{
									backgroundImage: authorId
										? `url(${wallpaper})`
										: `url(${startChatImg})`,
								}}
								ref={chatContainerRef}
							>
								{messages?.map((message, index) => (
									<li
										key={index}
										className={`chat-message ${
											message.userId === user?._id
												? 'user-message'
												: 'author-message'
										}`}
									>
										<p>{message.message}</p>
										<small className="message-date">
											{formatDate(message.createdAt)}
										</small>
									</li>
								))}
							</ul>
							{authorId ? (
								<form className="chat-footer" onSubmit={handleSend}>
									<textarea
										className="chat-input"
										value={text}
										type="text"
										ref={chatInputRef}
										onChange={handleChange}
										rows={1}
										style={{ height: height ? `${height}px` : 'auto' }}
										placeholder="Type your message..."
									/>
									<button
										style={{
											pointerEvents: text === '' ? 'none' : 'auto',
											opacity: text === '' ? '0.7' : '1',
										}}
										className="send-button"
										type="submit"
									>
										Send
									</button>
								</form>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Messenger;
