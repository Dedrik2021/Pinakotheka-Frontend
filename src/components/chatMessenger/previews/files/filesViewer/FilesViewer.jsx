import { useSelector } from 'react-redux';

import './filesViewer.scss';

const FilesViewer = ({ activeIndex }) => {
	const { files } = useSelector((state) => state.chat);

	return (
		<div className="files-viewer">
			<div className="files-viewer__wrapper">
				{files[activeIndex]?.type === 'IMAGE' ? (
					<div className="files-viewer__image">
						<img
							src={files[activeIndex]?.imageData}
							alt=""
							className=""
							height={280}
							width={260}
						/>
						<span className="">
							{files[activeIndex]?.file?.size} kB - {files[activeIndex]?.type}
						</span>
					</div>
				) : files[activeIndex]?.type === 'VIDEO' ? (
					<div className="files-viewer__image">
						<video
							height={200}
							width={300}
							src={files[activeIndex]?.imageData}
							controls
							className=""
						></video>
						<span className="">
							{files[activeIndex]?.file?.size} kB - {files[activeIndex]?.type}
						</span>
					</div>
				) : (
					(files[activeIndex]?.type.includes('PDF') ||
						files[activeIndex]?.type.includes('DOCX') ||
						files[activeIndex]?.type.includes('TXT') ||
						files[activeIndex]?.type.includes('PPTX')) && (
						<div className="files-viewer__content">
							<img
								src={require(`../../images/file/${files[activeIndex]?.type}.png`)}
								alt={files[activeIndex]?.type}
								height={70}
								width={60}
							/>
							<h1 className="">No preview available</h1>
							<span className="">
								{files[activeIndex]?.file?.size} kB - {files[activeIndex]?.type}
							</span>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default FilesViewer;
