import { Link } from 'react-router-dom';

import './social.scss';

const Social = ({ author }) => {
	return (
		<ul className="social">
			{author?.facebook ? (
				<li className="social__info">
					<Link target="_blank" to={author?.facebook} className="social__link">
                        <img src="https://www.facebook.com/images/fb_icon_325x325.png" alt="" />
					</Link>
				</li>
			) : null}
			{author?.twitter ? (
				<li className="social__info">
					<Link target="_blank" to={author?.twitter} className="social__link">
                        <img src="https://seeklogo.com/images/T/twitter-x-logo-101C7D2420-seeklogo.com.png" alt="" />
					</Link>
				</li>
			) : null}
			{author?.instagram ? (
				<li className="social__info">
					<Link
						target="_blank"
						to={author?.instagram}
						className="social__link"
					>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" alt="" />
					</Link>
				</li>
			) : null}
		</ul>
	);
};

export default Social;
