import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';

import Register from './pages/auth/register/Register';
import Home from './pages/home/Home';
import Spinner from './components/spinner/Spinner';
import ErrorBoundary from './ErrorBoundary.js';

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';

import './scss/style.scss';
import './app.scss';

const App = () => {
	const { user } = useSelector((state) => state.user);
	const { token } = user;
	const location = useLocation();

	useEffect(() => {
		const body = document.body;
		if (!token) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'auto';
		}

		return () => {
			body.style.overflow = 'auto';
		};
	}, [token]);

	return (
		<>
			<ErrorBoundary>
				<Header />
			</ErrorBoundary>
			<main className="main">
				<Suspense fallback={<Spinner />}>
					<Routes location={location} key={location.pathname}>
						<Route exact path="/" element={<Home />} />
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
							path="/verify-email"
							element={token ? <Navigate to="/" /> : <Register />}
						/>
					</Routes>
				</Suspense>
			</main>
			<Footer />
		</>
	);
};

export default App;
