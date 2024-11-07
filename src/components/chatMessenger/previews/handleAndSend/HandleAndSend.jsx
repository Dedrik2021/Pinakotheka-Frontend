import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router';

import Add from '../files/addFile/Add';
import { uploadFiles } from '../../../../utils/upload';
import {
	sendMessageConvo,
	clearFiles,
	removeFileFromFiles,
} from '../../../../redux/slices/chatSlice';
import SocketContext from '../../../../context/SocketContext';

import './handleAndSend.scss';

const HandleAndSend = ({ activeIndex, setActiveIndex, message, setLoading, loading, socket }) => {
	// const [loading, setLoading] = useState(false);
	const { files, activeConversation } = useSelector((state) => state.chat);
	const { user } = useSelector((state) => state.user);
	const { token } = user;
	const [progress, setProgress] = useState({ progress: 0, fileName: '' });
	const dispatch = useDispatch();
	const { authorId } = useParams();

	const sendMessageHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const upload_files = await uploadFiles(files, setProgress);

		const messageValues = {
			token,
			message,
			convo_id: activeConversation?._id,
			receiver_id: authorId,
			files: upload_files.length > 0 ? upload_files : [],
		};
		const newMsg = await dispatch(sendMessageConvo(messageValues));
		socket.emit('send-message', newMsg.payload);
		dispatch(clearFiles());
		setLoading(false);
	};

	const handlerRemoveFile = async (index) => {
		setLoading(true);
		await dispatch(removeFileFromFiles(index));
		setLoading(false);
	};

	return (
		<div className="handle-and-send">
			<ul className="handle-and-send__wrapper">
				{files.map((file, i) => {
					
					return (
						<li
							className={`handle-and-send__file ${activeIndex === i ? 'active' : ''}`}
							key={i}
							onClick={() => setActiveIndex(i)}
						>
							<div
								className={`handle-and-send__file__img ${
									activeIndex === i ? 'active' : ''
								}`}
							>
								{file?.type === 'IMAGE' ? (
									<img
										src={file?.imageData}
										className=""
										alt=""
										height={50}
										width={48}
									/>
								) : file?.type === 'VIDEO' ? (
									<video src={file?.imageData} alt="" height={50}
										width={48} ></video>
								) : (
									<img
										src={require(`../images/file/${file?.type}.png`)}
										className=""
										alt=""
										height={50}
										width={48}
									/>
								)}
							</div>
							<button
								type="button"
								className="btn handle-and-send__btn"
								onClick={() => handlerRemoveFile(i)}
								title="Remove file"
							>
								<IoIosCloseCircleOutline size={15} color="#ccc" />
							</button>
						</li>
					);
				})}
				<Add setActiveIndex={setActiveIndex} />
			</ul>
			{progress.progress > 0 || loading ? (
				<div className='handle-and-send__progress'>
					<div className="progress__file-name">{progress.fileName}</div>
					<div className="progress">
						<div
							className="progress__bar"
							style={{ width: `${progress.progress}%` }}
						></div>
						<div className="progress__text" style={{color: progress.progress <= 50 ? '#282828' : '#ccc'}} >{progress.progress}%</div>
					</div>
				</div>
			) : null}
			<div className="handle-and-send__send__send-btn">
				{loading ? (
					<ClipLoader color="white" size={24} />
				) : (
					<button onClick={sendMessageHandler} className="btn btn--black" type="button">
						Send
					</button>
				)}
			</div>
		</div>
	);
};

const HandleAndSendWithSocket = (props) => {
	return (
		<SocketContext.Consumer>
			{(socket) => <HandleAndSend {...props} socket={socket} />}
		</SocketContext.Consumer>
	);
};

export default HandleAndSendWithSocket;
