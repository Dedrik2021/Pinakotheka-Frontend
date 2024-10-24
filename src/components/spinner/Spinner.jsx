import PulseLoader from 'react-spinners/PulseLoader';

import './spinner.scss';

const Spinner = ({styles = false, color = '#000'}) => {
	return (
		<div className="spinner">
			<span className={`spinner__layout ${styles ? 'active' : ''}`} ></span>
			<div className="spinner__loader">
				<PulseLoader size={35} color={color} />
			</div>
		</div>
	);
};

export default Spinner;
