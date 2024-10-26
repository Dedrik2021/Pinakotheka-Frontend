import VideoThumbnail from 'react-video-thumbnail';
import { Link } from 'react-router-dom';

import './chatMessageFiles.scss';

const ChatMessageFiles = ({ message }) => {
	return (
		<ul className="message-files">
			{message?.files?.map((file, index) => (
				<li key={index} className="message-files__item">
					{file.type === 'IMAGE' ? (
						<Link to={file.file.url} target="_blank" title={file.file.original_filename}>
							<img height={105} width={84} src={file.file.url} alt="" />
						</Link>
					) : file.type === 'VIDEO' ? (
						<VideoThumbnail videoUrl={file.file.url} title={file.file.original_filename} />
					) : (
						<Link to={file.file.url} target="_blank" title={file.file.original_filename}>
							<img
								src={require(`./../previews/images/file/${file?.type}.png`)}
								alt=""
								height={60}
								width={50}
							/>
						</Link>
					)}
				</li>
			))}
		</ul>
	);
};

export default ChatMessageFiles;
