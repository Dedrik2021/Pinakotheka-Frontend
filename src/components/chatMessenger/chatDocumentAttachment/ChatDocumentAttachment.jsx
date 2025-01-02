import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IoDocumentText } from 'react-icons/io5';

import { addFiles } from '../../../redux/slices/chatSlice';
import { getFileType } from '../../../utils/files';


const ChatDocumentAttachment = ({ setOpenAttachments }) => {
	const inputRef = useRef(null);
    const dispatch = useDispatch();

	const documentHandler = (e) => {
		let files = Array.from(e.target.files);
		files.forEach((file) => {
			if (
				file.type !== 'application/pdf' &&
				file.type !== 'text/plain' &&
				file.type !== 'application/msword' &&
				file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
				file.type !== 'application/vnd.ms-excel' &&
				file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
				file.type !== 'application/vnd.rar' &&
				file.type !== 'application/zip' &&
				file.type !== 'audio/mp3' && 
				file.type !== 'audio/wav'
			) {
				files = files.filter((item) => item.name !== file.name);
				return;
			} else if (file.size > 1024 * 1024 * 5) {
				files = files.filter((item) => item.name !== file.name);
				return;
			} else {
				const reader = new FileReader();
				reader.readAsDataURL(file);

				reader.onload = (e) => {
					dispatch(
						addFiles({ file, type: getFileType(file.type)}),
					);
				};
                setOpenAttachments(false);
			}
		});
	};

	return (
		<li>
			<button
				onClick={() => inputRef.current.click()}
				type="button"
				className="chat-menu-attachments__btn close-btn btn"
			>
				<IoDocumentText color="#ccc" size={26} />
			</button>
			<input
				onChange={documentHandler}
				type="file"
				ref={inputRef}
				accept="application/*, video/*, audio/*, text/plain"
				multiple
				hidden
			/>
		</li>
	);
};

export default ChatDocumentAttachment;
