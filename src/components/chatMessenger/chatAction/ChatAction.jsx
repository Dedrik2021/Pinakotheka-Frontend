import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import EmojiPickerApp from '../../../components/emojiPicker/EmojiPicker';
import SocketContext from '../../../context/SocketContext';
import { sendMessageConvo } from '../../../redux/slices/chatSlice';
import { refreshUser, updateUnreadMessage } from '../../../redux/slices/userSlice';
import ChatAttachments from '../chatAttachments.jsx/ChatAttachments';

import './chatAction.scss';

const ChatAction = ({
	user,
	authorId,
	activeConversation,
	setLoading,
	loading,
	status,
	typing,
	chatInputRef,
	setTyping,
	socket,
}) => {
	const dispatch = useDispatch();
	const [height, setHeight] = useState(0);
	const [text, setText] = useState('');
	const [openAttachments, setOpenAttachments] = useState(false);
	const [openEmoji, setOpenEmoji] = useState(false);
	const [newText, setNewText] = useState('');
	const [checkHeight, setCheckHeight] = useState(0);    

    useEffect(() => {
        setCheckHeight(height);
    }, [height]);

    const handleCheckHeight = () => {
        if (checkHeight === 0) {
            return '51px';
        } else if (checkHeight === 44) {
            return '51px';
        } else if (checkHeight === 68) {
            return '63px';
        } else if (checkHeight === 92) {
            return '74px';
        } else if (checkHeight === 116) {
            return '87px';
        } else if (checkHeight === 140) {
            return '98px';
        } else if (checkHeight === 150) {
            return '104px';
        }
    };

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

	useEffect(() => {
		if (!text || text.length < newText.length || text.length > newText.length) {
			setOpenEmoji(false);
			setOpenAttachments(false);
		}
		if (!text) {
			setHeight(0);
		}
	}, [text]);

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
	}, [loading]);

	return (
		<form className="chat-footer" onSubmit={handleSend}>
			<ul className="chat-footer__list">
				<li className="chat-footer__item">
					<EmojiPickerApp
						chatRef={chatInputRef}
						text={text}
						setText={setText}
						setOpenAttachments={setOpenAttachments}
						openEmoji={openEmoji}
						setOpenEmoji={setOpenEmoji}
						setNewText={setNewText}
						handleCheckHeight={handleCheckHeight}
					/>
				</li>
				<li className="chat-footer__item">
					<ChatAttachments
						setOpenEmoji={setOpenEmoji}
						openAttachments={openAttachments}
						setOpenAttachments={setOpenAttachments}
						handleCheckHeight={handleCheckHeight}
					/>
				</li>
			</ul>
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
