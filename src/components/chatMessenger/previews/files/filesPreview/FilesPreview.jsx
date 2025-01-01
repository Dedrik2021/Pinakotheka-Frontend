import { useState } from 'react';

import FilesHeader from '../filesHeader/FilesHeader';
import FilesViewer from '../filesViewer/FilesViewer';
import FilesInput from '../fileInput/FilesInput';
import HandleAndSend from '../../handleAndSend/HandleAndSend';

import './filesPreview.scss';

const FilesPreview = () => {
	const [message, setMessage] = useState('');
	const [activeIndex, setActiveIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	return (
		<div className="files-preview">
			<div className="files-preview__wrapper scrollbar">
				<FilesHeader activeIndex={activeIndex} />
				<FilesViewer activeIndex={activeIndex} />
				<div className="">
					<FilesInput message={message} setMessage={setMessage} />
					<HandleAndSend
						message={message}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						setLoading={setLoading}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default FilesPreview;
