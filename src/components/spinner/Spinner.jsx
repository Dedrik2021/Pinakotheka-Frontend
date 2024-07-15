import PulseLoader from 'react-spinners/PulseLoader';

import './spinner.scss';

const Spinner = () => {
	return (
		<div className="spinner">
			<span className="spinner__layout"></span>
			<div className="spinner__loader">
				<PulseLoader size={35} color="#000" />
			</div>
		</div>
	);
};

export default Spinner;
