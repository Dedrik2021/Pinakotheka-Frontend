import ChatPhotoAttachment from '../chatPhotoAttachment/ChatPhotoAttachment';
import ChatDocumentAttachment from '../chatDocumentAttachment/ChatDocumentAttachment';

import './chatMenuAttachments.scss';

const ChatMenuAttachments = ({ handleCheckHeight, setOpenAttachments }) => {
    
	return (
		<ul
			className="chat-menu-attachments open-attachments-animation"
			style={{ bottom: handleCheckHeight()}}
		>
			<ChatDocumentAttachment setOpenAttachments={setOpenAttachments} />
			<ChatPhotoAttachment setOpenAttachments={setOpenAttachments} />
		</ul>
	);
};

export default ChatMenuAttachments;
