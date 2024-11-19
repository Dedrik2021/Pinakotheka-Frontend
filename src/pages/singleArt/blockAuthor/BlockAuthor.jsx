import { Link } from 'react-router-dom';

import Social from '../../../components/social/Social';

import './blockAuthor.scss';
const BlockAuthor = ({ author, user, loading }) => {
	if (!author || loading) return null;

	return (
		<div className="author-card">
			<h2 className='author-card__title title'>Author</h2>
			<div className="author-card__wrapper">
				<img
					src={author?.image}
					alt={`${author?.name}'s profile`}
					className="author-card__image"
				/>
				<Link className="author-card__name" to={`${author?.path}${author?._id}`}>
					{author?.name}
				</Link>
			</div>
			<div className="author-card__divider">
				<div className="author-card__info">
					<strong>Email:</strong> {author?.email}
				</div>
				<div className="author-card__info">
					<strong>Phone:</strong> {author?.phone}
				</div>

				<div className="author-card__info">
					<strong>About Me:</strong>{' '}
					<span className="author-card__small-text">{author?.about}</span>
				</div>
				<div className='author-card__socials'>

				<Social author={author} />
				</div>
				{user?._id !== author?._id ? (
				<Link className='author-card__link btn btn--red btn--universal' to={`/messenger/${author?._id}`}>
					Chat
				</Link>

				) : null}
			</div>
		</div>
	);
};

export default BlockAuthor;
