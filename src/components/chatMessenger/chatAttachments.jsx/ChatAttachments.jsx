import { IoIosCloseCircleOutline } from 'react-icons/io';
import { TiAttachment } from 'react-icons/ti';

import ChatMenuAttachments from '../chatMenuAttachments/ChatMenuAttachments';

const ChatAttachments = ({
	openAttachments,
	setOpenAttachments,
	setOpenEmoji,
	handleCheckHeight,
}) => {
	const handleOpenAttachments = () => {
		setOpenAttachments((prev) => !prev);
		setOpenEmoji(false);
	};

	return (
		<>
			<button
				title="Attachments"
				type="button"
				className={`btn close-btn chat-footer__btn ${openAttachments ? '' : 'active'} `}
				onClick={handleOpenAttachments}
			>
				{openAttachments ? (
					<IoIosCloseCircleOutline color="#ccc" size={25} />
				) : (
					<TiAttachment color="#ccc" size={29} />
				)}
			</button>
			{openAttachments ? (
				<ChatMenuAttachments
					setOpenAttachments={setOpenAttachments}
					handleCheckHeight={handleCheckHeight}
				/>
			) : null}
		</>
	);
};

export default ChatAttachments;
