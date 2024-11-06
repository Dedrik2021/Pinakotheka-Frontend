import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import './emojiPicker.scss';

const EmojiPickerApp = ({
	chatRef,
	text,
	setText,
	setOpenEmoji,
	openEmoji,
	setOpenAttachments,
	setNewText,
	handleCheckHeight
}) => {
	const [cursorPosition, setCursorPosition] = useState();

	useEffect(() => {
		if (chatRef.current && cursorPosition !== null) {
			chatRef.current.selectionEnd = cursorPosition;
		}
	}, [cursorPosition]);

	const handleEmoji = (emojiData, e) => {
		const { emoji } = emojiData;

		const ref = chatRef.current;

		if (!ref) return;
		ref.focus();
		const start = text.substring(0, ref.selectionStart);
		const end = text.substring(ref.selectionStart);
		const newText = start + emoji + end;
		setNewText(newText);
		setText(newText);
		setCursorPosition(start.length + emoji.length);
	};

	const handleOpenEmoji = () => {
		setOpenAttachments(false);
		setOpenEmoji((prev) => !prev);
	};

	return (
		<>
			<button title='Emoji' type="button" className="btn close-btn chat-footer__btn" onClick={handleOpenEmoji}>
				{openEmoji ? (
					<IoIosCloseCircleOutline color="#ccc" size={25} />
				) : (
					<MdOutlineEmojiEmotions size={25} color="#ccc" />
				)}
			</button>
			{openEmoji ? (
				<div
					className="emoji-picker__content open-emoji-animation"
					style={{ bottom: handleCheckHeight() }}
				>
					<EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
				</div>
			) : null}
		</>
	);
};

export default EmojiPickerApp;
