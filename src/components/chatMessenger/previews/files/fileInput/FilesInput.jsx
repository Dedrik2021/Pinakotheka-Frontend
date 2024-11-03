
import './fileInput.scss';

const FilesInput = ({ message, setMessage }) => {
	return (
		<div className="files-input">
			<input
				type="text"
				placeholder="Type a message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
                className=""
			/>
		</div>
	);
};

export default FilesInput;
