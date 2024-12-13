import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import PulseLoader from 'react-spinners/PulseLoader';

import Spinner from '../../components/spinner/Spinner';
import SocketContext from '../../context/SocketContext';
import Hero from '../../components/hero/Hero';
import PaintingsCards from '../../components/card/paintingsCards/PaintingsCards';
import Categories from '../../components/categories/Categories';

const Home = ({ socket }) => {
	const { paintings, status, filteredPaintings, statusFiltering } = useSelector(
		(state) => state.painting,
	);
	const { user } = useSelector((state) => state.user);

	useEffect(() => window.scrollTo(0, 0), []);

	if (!status || status === 'loading') {
		return <Spinner />;
	} 
	

	return (
		<>
			<Helmet>
				<meta name="Pinakotheka | Home" />
				<title>Pinakotheka | Home</title>
			</Helmet>
			<div>
				<Hero paintings={paintings} />
				<PaintingsCards />
				<Categories/>
			</div>
		</>
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
