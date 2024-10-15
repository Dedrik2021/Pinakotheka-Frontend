import { useState } from "react";
import { useDispatch } from "react-redux";
import { PulseLoader } from 'react-spinners';
import { MdDeleteForever } from 'react-icons/md';

import {
	getMessagesByUserAndAuthorId,
	updateAndRemoveMessageById,
	deleteConversationByUserIdAndAuthorId,
} from '../../../redux/slices/messageSlice';
import startChatImg from '../../../assets/images/start_chat.png';
import TriangleIcon from '../../../assets/images/TriangleIcon';

import './chatBody.scss';

const ChatBody = ({
	activeConversation,
	user,
	messagesConvo,
	status,
	chatContainerRef,
    formatDate,
	loading
}) => {
    const dispatch = useDispatch();
    const [onHover, setOnHover] = useState(null);

    const handleMouseEnter = (index) => setOnHover(index);
	const handleMouseLeave = () => setOnHover(null);

    const handleDeleteMessage = async (id) => {
		await dispatch(updateAndRemoveMessageById({ messageId: id }));
		// await dispatch(getMessagesByUserAndAuthorId({ userId: user?._id, authorId }));
	};


	return activeConversation?.users?.length ? (
		<ul
			className={`chat-body scrollbar `}
			style={{
				backgroundImage: `url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')`,
			}}
			ref={chatContainerRef}
		>
			{loading ? (
				<li className="chat-loader">
					<PulseLoader color="#fff" size={40} />
				</li>
			) : (
				<>
					{messagesConvo?.map((message, index) => (
						<li
							key={index}
							className={`chat-message ${
								message?.message === 'This message has been deleted'
									? 'deleted'
									: ''
							} ${
								message?.sender?._id === user?._id
									? `user-message ${onHover === index ? 'on-hover' : ''}`
									: `author-message ${onHover === index ? 'on-hover' : ''}`
							}`}
							onMouseEnter={() => handleMouseEnter(index)}
							onMouseLeave={handleMouseLeave}
						>
							<p>{message.message}</p>
							<small className="message-date">{formatDate(message.createdAt)}</small>
							<div
								className={`triangle ${
									message?.sender?._id === user?._id ? 'user' : 'author'
								}`}
							>
								<TriangleIcon />
							</div>
							{message?.message !== 'This message has been deleted' ? (
								<div
									className="delete-message"
									onMouseEnter={() => handleMouseEnter(index)}
									onClick={() => handleDeleteMessage(message?._id)}
								>
									<MdDeleteForever size={20} />
								</div>
							) : null}
						</li>
					))}
				</>
			)}
		</ul>
	) : (
		<div
			className="start-chat__bg"
			style={{
				backgroundImage: `url(${startChatImg})`,
			}}
		></div>
	);
};

export default ChatBody;
