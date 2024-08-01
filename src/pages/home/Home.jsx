import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../components/spinner/Spinner';
import SocketContext from '../../context/SocketContext';
import Hero from '../../components/hero/Hero';
import PaintingsCards from '../../components/card/paintingsCards/PaintingsCards';

const Home = ({ socket }) => {
	const { paintings, status, filteredPaintings, statusFiltering} = useSelector((state) => state.painting);
	const { user } = useSelector((state) => state.user);

	// useEffect(() => [window.scrollTo(0, 0)], []);

	if (status === 'loading') {
		return <Spinner />;
	} 

	return (
		<div>
			<Hero paintings={paintings}  />
			<PaintingsCards paintings={paintings} />
		</div>
	);
};

const HomeWithSocket = (props) => {
	return (
		<SocketContext.Consumer>
			{(socket) => <Home {...props} socket={socket} />}
		</SocketContext.Consumer>
	);
};

export default HomeWithSocket;
