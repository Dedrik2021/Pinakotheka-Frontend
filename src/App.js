import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { io } from 'socket.io-client';

import Register from './pages/auth/register/Register';
import Home from './pages/home/Home';
import Catalog from './pages/catalog/Catalog.jsx';
import SingleArt from './pages/singleArt/SingleArt.jsx';
import SingleUser from './pages/singleUser/SingleUser.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import Cart from './pages/cart/Cart.jsx';
import Messenger from './pages/messager/Messenger.jsx';

import Spinner from './components/spinner/Spinner';
import ErrorBoundary from './ErrorBoundary.js';
import SocketContext from './context/SocketContext.js';

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';

import './scss/style.scss';
import './app.scss';

export const socket = io(process.env.REACT_APP_API_URL.split('/api/v1')[0]);

const App = () => {
	const { user } = useSelector((state) => state.user);
	const { token } = user;
	// let token = ''
	const location = useLocation();

	// useEffect(() => {
	// 	socket.on('receiveMessage', (msg) => {
	// 		console.log(msg);
	// 	});
	// });

	// const sendMsg = () => {
	// 	socket.emit('sendMessage', 'hallo howe are you');
	// };

	return (
		<SocketContext.Provider value={socket}>
			<ErrorBoundary>
				<Header />
			</ErrorBoundary>
			{/* <button onClick={() => sendMsg()}>Send message</button> */}
			<main className="main">
				<Suspense fallback={<Spinner />}>
					<Routes location={location} key={location.pathname}>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/catalog/:slug" element={<Catalog />} />
						<Route exact path="/single-user/:userId" element={<SingleUser />} />
						<Route exact path="/single-art/:artId" element={<SingleArt />} />
						<Route exact path="/messenger" element={!token ? <Navigate to="/login" /> : <Messenger />} />
						<Route exact path="/messenger/:authorId" element={!token ? <Navigate to="/login" /> : <Messenger />} />
						<Route
							exact
							path="/login"
							element={token ? <Navigate to="/" /> : <Register />}
						/>
						<Route
							exact
							path="/register"
							element={token ? <Navigate to="/" /> : <Register />}
						/>
						<Route
							exact
							path="/forgot-password"
							element={token ? <Navigate to="/" /> : <Register />}
						/>
						<Route
							exact
							path="/reset-password"
							element={token ? <Navigate to="/" /> : <Register />}
						/>
						<Route
							exact
							path="/cart"
							element={<Cart />}
						/>
						<Route
							exact
							path="/verify-email"
							element={token ? <Navigate to="/" /> : <Register />}
						/>
						<Route
							exact
							path="*"
							element={<NotFound />}
						/>
					</Routes>
				</Suspense>
			</main>
			<Footer />
		</SocketContext.Provider>
	);
};

export default App;
