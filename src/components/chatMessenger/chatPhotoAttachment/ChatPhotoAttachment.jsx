import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdPhotos } from 'react-icons/io';

import { addFiles } from '../../../redux/slices/chatSlice';
import { getFileType } from '../../../utils/files';

const ChatPhotoAttachment = ({setOpenAttachments}) => {
	const inputRef = useRef(null);
    const dispatch = useDispatch();

	const imageHandler = (e) => {
		let files = Array.from(e.target.files);
		files.forEach((file) => {
			if (
				file.type !== 'image/jpeg' &&
				file.type !== 'image/png' &&
				file.type !== 'image/jpg' &&
				file.type !== 'image/webp' &&
				file.type !== 'image/gif' &&
				file.type !== 'video/mp4' &&
				file.type !== 'video/mpeg' &&
				file.type !== 'image/svg+xml'
			) {
                files = files.filter((item) => item.name !== file.name);
				return;
			} else if (file.size > 1024 * 1024 * 50) {
                files = files.filter((item) => item.name !== file.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onload = (e) => {
                    dispatch(addFiles({ file, imageData: e.target.result, type: getFileType(file.type) }));
                }
                setOpenAttachments(false)
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
				<IoMdPhotos color="#ccc" size={26} />
			</button>

			<input
				onChange={imageHandler}
				type="file"
				ref={inputRef}
				accept="image/*, video/*"
				multiple
				hidden
			/>
		</li>
	);
};

export default ChatPhotoAttachment;
