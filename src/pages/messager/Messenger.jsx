import { useParams, useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { formatDate, capitalizeFirstLetter } from '../../utils/helper';
import { refreshUser } from '../../redux/slices/userSlice';
import SocketContext from '../../context/SocketContext';
import {
	getConversations,
	openCreateConversation,
	setActiveConversation,
	getConversationMessages,
	removeMessagesAndConversation
} from '../../redux/slices/chatSlice';
import { getConversationName, checkOnlineStatus, getConversationPicture } from '../../utils/chat';
import ChatAside from '../../components/chatMessenger/chatAside/ChatAside';
import ChatHeader from '../../components/chatMessenger/chatHeader/ChatHeader';
import ChatBody from '../../components/chatMessenger/chatBody/ChatBody';
import ChatAction from '../../components/chatMessenger/chatAction/ChatAction';
import FilesPreview from '../../components/chatMessenger/previews/files/filesPreview/FilesPreview';
import SkeletonMessenger from '../../components/skeletons/SkeletonMessenger';
import { removeMessageFilesFromFirebase } from '../../utils/removeMessageFilesFromFirebase';

import './messenger.scss';

const Messenger = ({ socket }) => {
	const { authorId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const chatContainerRef = useRef(null);
	const chatInputRef = useRef(null);

	const [typing, setTyping] = useState(false);
	const [loading, setLoading] = useState(true);
	const [skeletonLoading, setSkeletonLoading] = useState(true);

	const { user, error, author, onlineUsers } = useSelector((state) => state.user);
	const { conversations, activeConversation, messages, status, files } = useSelector(
		(state) => state.chat,
	);

	useEffect(() => {
		const func = async () => {
			if (user?.token) {
				await dispatch(getConversations(user?.token));
				setSkeletonLoading(false);
			}
		};

		func();
	}, [user]);

	useEffect(() => {
		const func = async () => {
			if (activeConversation?._id) {
				const values = {
					token: user?.token,
					convo_id: activeConversation?._id,
				};
				await dispatch(getConversationMessages(values));
				socket.emit('join-conversation', activeConversation?._id);
				setLoading(false);
				setSkeletonLoading(false);
			}
		};

		func();
	}, [activeConversation]);

	useEffect(() => {
		socket.on('typing', (conversation) => setTyping(conversation));
		socket.on('stop-typing', () => setTyping(false));
	}, []);

	useEffect(() => {
		if (location.pathname === `/messenger`) {
			setLoading(false);
		}
	}, [location.pathname]);

	useEffect(() => {
		if (authorId) {
			dispatch(
				openCreateConversation({
					token: user?.token,
					receiver_id: authorId,
					sender_name: user?.name,
					receiver_name: author?.name,
					receiver_picture: author?.image,
				}),
			);
			dispatch(refreshUser(user?._id));
		} else {
			dispatch(setActiveConversation(null));
		}
	}, [authorId]);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (chatContainerRef.current && chatInputRef.current && !skeletonLoading) {
			chatInputRef.current.focus();
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [messages, skeletonLoading]);

	const handleDeleteConversation = async () => {
		setLoading(true);
		try {
			messages.map(async (message) => {
				if (message.files && Array.isArray(message.files)) {
					await removeMessageFilesFromFirebase(message.files);
				}
			});

			const values = {
				token: user?.token,
				messages: messages,
				convo_id: activeConversation?._id,
			};

			await dispatch(removeMessagesAndConversation(values));
			await dispatch(setActiveConversation(null))
		} catch (error) {
			console.error('Error deleting conversation:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (error) {
			navigate('*');
		}
	}, [error, navigate]);

	return (
		<>
			{activeConversation?._id ? (
				<Helmet>
					<meta
						name={`Pinakotheka | Messenger: ${getConversationName(
							user,
							activeConversation?.users,
						)} `}
					/>
					<title>{`Pinakotheka | Messenger: ${getConversationName(
						user,
						activeConversation?.users,
					)} `}</title>
				</Helmet>
			) : (
				<Helmet>
					<meta name={`Pinakotheka | Messenger`} />
					<title>{`Pinakotheka | Messenger`}</title>
				</Helmet>
			)}
			<div className="messenger">
				<div className="container">
					{skeletonLoading ? (
						<SkeletonMessenger />
					) : (
						<div className="messenger__wrapper">
							<ChatAside
								user={user}
								conversations={conversations}
								activeConversation={activeConversation}
								onlineUsers={onlineUsers}
								typing={typing}
								setLoading={setLoading}
							/>

							<div className="messenger__container">
								<ChatHeader
									activeConversation={activeConversation}
									user={user}
									typing={typing}
									onlineUsers={onlineUsers}
									capitalizeFirstLetter={capitalizeFirstLetter}
									getConversationName={getConversationName}
									checkOnlineStatus={checkOnlineStatus}
									getConversationPicture={getConversationPicture}
									handleDeleteConversation={handleDeleteConversation}
								/>
								<span
									className={`messenger__layer ${
										files.length > 0 ? 'active' : ''
									}`}
								></span>
								{files.length > 0 ? <FilesPreview /> : null}
								<ChatBody
									messagesConvo={messages}
									formatDate={formatDate}
									user={user}
									activeConversation={activeConversation}
									status={status}
									chatContainerRef={chatContainerRef}
									loading={loading}
								/>

								{activeConversation?.users?.length ? (
									<ChatAction
										user={user}
										activeConversation={activeConversation}
										typing={typing}
										setTyping={setTyping}
										status={status}
										chatInputRef={chatInputRef}
										authorId={authorId}
										setLoading={setLoading}
										loading={loading}
									/>
								) : null}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

const MessengerWithSocket = (props) => {
	return (
		<SocketContext.Consumer>
			{(socket) => <Messenger {...props} socket={socket} />}
		</SocketContext.Consumer>
	);
};

export default MessengerWithSocket;
