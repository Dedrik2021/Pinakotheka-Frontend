import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdAdd } from "react-icons/io";

import { addFiles } from '../../../../../redux/slices/chatSlice';
import { getFileType } from '../../../../../utils/files';

import './add.scss';

const Add = ({ setActiveIndex }) => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();

	const filesHandler = (e) => {
		let files = Array.from(e.target.files);
		files.forEach((file) => {
			if (
				file.type !== 'application/pdf' &&
				file.type !== 'text/plain' &&
				file.type !== 'application/msword' &&
				file.type !==
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
				file.type !== 'application/vnd.ms-excel' &&
				file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
				file.type !== 'application/vnd.rar' &&
				file.type !== 'application/zip' &&
				file.type !== 'audio/mp3' &&
				file.type !== 'audio/wav' &&
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
			} else if (file.size > 1024 * 1024 * 60) {
				files = files.filter((item) => item.name !== file.name);
				return;
			} else {
				const reader = new FileReader();
				reader.readAsDataURL(file);

				reader.onload = (e) => {
					dispatch(
						addFiles({
							file,
							imageData: getFileType(file.type) === 'IMAGE' || getFileType(file.type) === 'VIDEO' ? e.target.result : null,
							type: getFileType(file.type),
						}),
					);
				};
			}
			
		});
	};

	return (
		<div title="Add file" className="add-file" onClick={() => inputRef.current.click()}>
			<span className="add-file__icon">
				<IoMdAdd size={25} color="#ccc" />
			</span>
			<input
				type="file"
				hidden
				multiple
				ref={inputRef}
				accept="application/*, text/*, image/*,  audio/*, video/*"
				onChange={filesHandler}
			/>
		</div>
	);
};

export default Add;
