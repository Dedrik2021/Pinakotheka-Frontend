import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import EmojiPickerApp from '../../../components/emojiPicker/EmojiPicker';
import SocketContext from '../../../context/SocketContext';
import { sendMessageConvo } from '../../../redux/slices/chatSlice';
import { refreshUser, updateUnreadMessage } from '../../../redux/slices/userSlice';

import './chatAction.scss';

const ChatAction = ({user, authorId, activeConversation, setLoading, loading, status, typing, chatInputRef, setTyping, socket}) => {
	const dispatch = useDispatch();
	const [height, setHeight] = useState(0);
	const [text, setText] = useState('');

	const handleChange = (event) => {
		setText(event.target.value);

		const newHeight = event.target.scrollHeight;
		const maxHeight = 150;
		const heightToSet = Math.min(newHeight, maxHeight);
		setHeight(heightToSet);
		event.target.style.height = `${heightToSet}px`;
		event.target.style.overflow = newHeight > maxHeight ? 'auto' : 'hidden';

		if (!typing) {
			setTyping(true);
			socket.emit('typing', activeConversation?._id);
		}

		let lastTyping = new Date().getTime();
		const timer = 2000;

		setTimeout(() => {
			let timeNow = new Date().getTime();
			let timeDiff = timeNow - lastTyping;
			if (timeDiff >= timer && typing) {
				socket.emit('stop-typing', activeConversation?._id);
				setTyping(false);
			}
		}, timer);
	};

	const handleSend = async (e) => {
		e?.preventDefault();
		setLoading(true);

		const values = {
			token: user?.token,
			message: text,
			convo_id: activeConversation?._id,
			receiver_id: authorId,
		};
		const createdMessage = await dispatch(sendMessageConvo(values));

		await socket.emit('send-message', createdMessage.payload);

		setText('');
		setHeight(0);
		setLoading(false);
	};

	useEffect(() => {
		// if (user?._id !== authorId) {
			// setTimeout(async() => {
				dispatch(refreshUser(user?._id));
				dispatch(updateUnreadMessage({ userId: user?._id, senderId: authorId }));
			// }, 2000);
		// }
	}, [loading])

	return (
		<form className="chat-footer" onSubmit={handleSend}>
			<EmojiPickerApp height={height} chatRef={chatInputRef} text={text} setText={setText} />
			<textarea
				className="chat-input scrollbar"
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
				{status === 'loading' && loading ? <ClipLoader size={22} color="#fff" /> : 'Send'}
			</button>
		</form>
	);
};

const ChatActionWithSocket = (props) => {
	return (
		<SocketContext.Consumer>
			{(socket) => <ChatAction {...props} socket={socket} />}
		</SocketContext.Consumer>
	);
};

export default ChatActionWithSocket;
