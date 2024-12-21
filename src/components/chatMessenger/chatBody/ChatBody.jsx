import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { MdDeleteForever } from 'react-icons/md';

import startChatImg from '../../../assets/images/start_chat.png';
import TriangleIcon from '../../../assets/images/TriangleIcon';
import ChatMessageFiles from '../chatMessageFiles/ChatMessageFiles';
import { updateAndRemoveMessageConvoById } from '../../../redux/slices/chatSlice';
import { removeMessageFilesFromFirebase } from '../../../utils/removeMessageFilesFromFirebase';
import { getConversationMessages } from '../../../redux/slices/chatSlice';

import './chatBody.scss';

const ChatBody = ({
	activeConversation,
	user,
	messagesConvo,
	chatContainerRef,
	formatDate,
	loading,
}) => {
	const dispatch = useDispatch();
	const [onHover, setOnHover] = useState(null);

	const handleMouseEnter = (index) => setOnHover(index);
	const handleMouseLeave = () => setOnHover(null);

	const handleDeleteMessage = async (id, files) => {
		const values = {
			messageId: id,
			token: user?.token,
			files,
		};

		await removeMessageFilesFromFirebase(files);
		await dispatch(updateAndRemoveMessageConvoById(values));

		const valuesConvo = {
			token: user?.token,
			convo_id: activeConversation?._id,
		};
		dispatch(getConversationMessages(valuesConvo));
	};

	// return activeConversation?.users?.length  ? (
	// 	<ul
	// 		className={`chat-body scrollbar `}
	// 		style={{
	// 			backgroundImage: `url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')`,
	// 		}}
	// 		ref={chatContainerRef}
	// 	>
	// 		{loading ? (
	// 			<li className="chat-loader">
	// 				<PulseLoader color="#fff" size={40} />
	// 			</li>
	// 		) : (
	// 			<>
	// 				{messagesConvo?.map((message, index) => (
	// 					<li
	// 						key={index}
	// 						className={`chat-message ${
	// 							message?.message === 'This message has been deleted'
	// 								? 'deleted'
	// 								: ''
	// 						} ${
	// 							message?.sender?._id === user?._id
	// 								? `user-message ${onHover === index ? 'on-hover' : ''}`
	// 								: `author-message ${onHover === index ? 'on-hover' : ''}`
	// 						}`}
	// 						onMouseEnter={() => handleMouseEnter(index)}
	// 						onMouseLeave={handleMouseLeave}
	// 					>
	// 						{message?.files?.length > 0 ? (
	// 							<ChatMessageFiles message={message} />
	// 						) : null}
	// 						<p>{message.message}</p>
	// 						<small className="message-date">{formatDate(message.createdAt)}</small>
	// 						<div
	// 							className={`triangle ${
	// 								message?.sender?._id === user?._id ? 'user' : 'author'
	// 							}`}
	// 						>
	// 							<TriangleIcon />
	// 						</div>
	// 						{message?.message !== 'This message has been deleted' ? (
	// 							<div
	// 								className="delete-message"
	// 								onMouseEnter={() => handleMouseEnter(index)}
	// 								onClick={() =>
	// 									handleDeleteMessage(message?._id, message?.files)
	// 								}
	// 							>
	// 								<MdDeleteForever size={20} />
	// 							</div>
	// 						) : null}
	// 					</li>
	// 				))}
	// 			</>
	// 		)}
	// 	</ul>
	// ) : loading ? (
	// 	<div className="chat-loader">
	// 		<PulseLoader color="#fff" size={40} />
	// 	</div>
	// ) : (
	// 	<div
	// 		className="start-chat__bg"
	// 		style={{
	// 			backgroundImage: `url(${startChatImg})`,
	// 		}}
	// 	></div>
	// );
	

	return !activeConversation?.users?.length && !loading ? (
		<div
			className="start-chat__bg"
			style={{
				backgroundImage: `url(${startChatImg})`,
			}}
		></div>
	) : loading ? (
		<div className="chat-loader">
			<PulseLoader color="#fff" size={40} />
		</div>
	) : (
		<ul
			className={`chat-body scrollbar `}
			style={{
				backgroundImage: `url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')`,
			}}
			ref={chatContainerRef}
		>
			{/* {loading ? (
				<li className="chat-loader">
					<PulseLoader color="#fff" size={40} />
				</li>
			) : ( */}
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
							{message?.files?.length > 0 ? (
								<ChatMessageFiles message={message} />
							) : null}
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
									onClick={() =>
										handleDeleteMessage(message?._id, message?.files)
									}
								>
									<MdDeleteForever size={20} />
								</div>
							) : null}
						</li>
					))}
				</>
			{/* )} */}
		</ul>
	);
};

export default ChatBody;
