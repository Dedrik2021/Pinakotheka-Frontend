import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../components/spinner/Spinner';
import SocketContext from '../../context/SocketContext';
import Hero from '../../components/hero/Hero';

const Home = ({ socket }) => {
    const { paintings, status } = useSelector((state) => state.painting);
    const { user } = useSelector((state) => state.user);

    console.log(user);

    if (status === 'loading') return <Spinner/>

	return (
		<div>
            <Hero paintings={paintings} />
			<div className="container">
				home
				{/* <Spinner /> */}
			</div>
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
