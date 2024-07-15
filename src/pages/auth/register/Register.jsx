import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import InputForm from '../../../components/inputForm/InputForm';
import Logo from '../../../assets/images/Logo.jsx';
import InputCheckbox from '../../../components/inputCheckbox/InputCheckbox.jsx';
import {
	registerUser,
	setError,
	loginUser,
	forgotPassword,
	resetPassword,
	verifyEmail,
} from '../../../redux/slices/userSlice.js';
import Spinner from '../../../components/spinner/Spinner.jsx';
import PasswordStrengthBar from '../../../components/passwordStrengthBar/PasswordStrengthBar.jsx';

import './register.scss';

const style = {
	position: 'absolute',
	maxWidth: '440px',
	width: '100%',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	display: 'flex',
	flexDirection: 'column',
	bgcolor: 'background.paper',
	borderRadius: '5px',
	boxShadow: 24,
	p: 2,
};

const Register = () => {
	const [politicsCheck, setPoliticsCheck] = useState({
		checked: false,
		isValid: true,
	});
	const [authorCheck, setAuthorCheck] = useState({
		checked: false,
		isValid: true,
	});
	const [customerCheck, setCustomerCheck] = useState({
		checked: false,
		isValid: true,
	});
	const [name, setName] = useState({
		value: '',
		isValid: true,
	});
	const [email, setEmail] = useState({
		value: '',
		isValid: true,
	});
	const [phone, setPhone] = useState({
		value: '',
		isValid: true,
	});
	const [password, setPassword] = useState({
		value: '',
		isValid: true,
	});
	const [confirmPassword, setConfirmPassword] = useState({
		value: '',
		isValid: true,
	});
	const [styles, setStyles] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const nameRef = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const { error, status, user } = useSelector((state) => state.user);

	console.log(user);

	useEffect(() => {
		let interval;
		if (error || styles) {
			interval = setInterval(() => {
				dispatch(setError(''));
				setStyles(false);
			}, 5000);
		}

		return () => clearInterval(interval);
	}, [dispatch, error, styles]);

	useEffect(() => {
		if (error?.split(' ')[0] === 'Name' && nameRef.current) {
			nameRef.current.focus();
		}
		if (
			(error?.split(' ')[0] === 'Email' || error?.split(' ')[1] === 'Email') &&
			emailRef.current
		) {
			emailRef.current.focus();
		}
		if (error?.split(' ')[0] === 'Phone' && phoneRef.current) {
			phoneRef.current.focus();
		}
		if (
			(error?.split(' ')[0] === 'Password' || error?.split(' ')[1] === 'Password') &&
			passwordRef.current
		) {
			passwordRef.current.focus();
		}
		if (error?.split(' ')[0] === 'Passwords' && confirmPasswordRef.current) {
			confirmPasswordRef.current.focus();
		}
	}, [error]);

	useEffect(() => {
		if (customerCheck.checked) {
			setAuthorCheck({ checked: false, isValid: false });
		}

		if (authorCheck.checked) {
			setCustomerCheck({ checked: false, isValid: false });
		}
	}, [authorCheck.checked, customerCheck.checked]);

	const picture =
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

	const handleClearData = () => {
		setName({ value: '', isValid: true });
		setEmail({ value: '', isValid: true });
		setPhone({ value: '', isValid: true });
		setPassword({ value: '', isValid: true });
		setConfirmPassword({ value: '', isValid: true });
		setAuthorCheck({ checked: false, isValid: true });
		setCustomerCheck({ checked: false, isValid: true });
		setPoliticsCheck({ checked: false, isValid: true });
		dispatch(setError(''));
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (password.value !== confirmPassword.value) {
			dispatch(setError('Passwords do not match.'));
			return null;
		}

		const data = await dispatch(
			registerUser({
				name: name.value,
				email: email.value,
				phone: phone.value,
				picture,
				author: authorCheck.checked,
				customer: customerCheck.checked,
				politics: politicsCheck.checked,
				password: password.value,
			}),
		);

		if (!data?.payload?.user?.isEmailVerified && data?.payload?.user) {
			setEmail({ value: '', isValid: true });
			setPassword({ value: '', isValid: true });
			setPoliticsCheck({ checked: false, isValid: true });
			navigate('/login');

			dispatch(setError(data?.payload?.message));
			setStyles(true);

			setTimeout(() => {
				handleClearData();
			}, 5000);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(loginUser({ email: email.value, password: password.value }));
		if (data?.payload?.user) {
			navigate('/');
			handleClearData();
		}
	};

	useEffect(() => {
		if (
			location.pathname === '/verify-email' &&
			error === 'Invalid or expired token' &&
			!user?.isEmailVerified
		) {
			navigate('/register');
			dispatch(setError('Time expired. Please register again.'));
		} else if (location.pathname === '/verify-email' && user?.isEmailVerified) {
			navigate('/login');
		}
	}, [dispatch, error, location.pathname, navigate, user?.isEmailVerified]);

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		const data = await dispatch(forgotPassword({ email: email.value }));
		if (data?.payload?.message) {
			dispatch(setError(data?.payload?.message));
			setStyles(true);
			setTimeout(() => {
				navigate('/login');
				handleClearData();
			}, 5000);
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		if (password.value !== confirmPassword.value) {
			dispatch(setError('Passwords do not match.'));
			return null;
		}

		const searchParams = new URLSearchParams(location.search);
		const token = searchParams.get('token');
		const userId = searchParams.get('id');

		const data = await dispatch(
			resetPassword({ newPassword: password.value, userId: userId, token }),
		);
		if (data?.payload?.message) {
			navigate('/login');
			dispatch(setError(data?.payload?.message));
			setStyles(true);
			setPassword({ value: '', isValid: true });
			setConfirmPassword({ value: '', isValid: true });
		}
	};

	useEffect(() => {
		if (location.pathname === '/register') {
			if (nameRef.current) nameRef.current.focus();
		}

		if (location.pathname === '/login') {
			if (emailRef.current) emailRef.current.focus();
		}

		if (user?.isEmailVerified && location.pathname === '/forgot-password') {
			if (emailRef.current) emailRef.current.focus();
		}

		if (location.pathname === '/reset-password') {
			if (passwordRef.current) passwordRef.current.focus();
		}
	}, [location.pathname, user?.isEmailVerified]);

	useEffect(() => {
		const verify = async () => {
			if (location.pathname === '/verify-email') {
				const params = new URLSearchParams(location.search);
				const token = params.get('token');
				const id = params.get('id');

				if (token && id) {
					const resultAction = await dispatch(verifyEmail({ token, id }));

					console.log(resultAction);

					if (resultAction?.payload?.message) {
						navigate('/login');
						dispatch(setError(resultAction?.payload?.message));
						setStyles(true);
					}
				}
			}
		};
		verify();
	}, [dispatch, location.pathname, location.search, navigate]);

	return (
		<Modal
			open={true}
			onClose={() => setShowModal(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				{status === 'loading' && <Spinner />}
				<div className="auth">
					<Link to={'/'} className="auth__logo">
						<Logo width={185} />
					</Link>
					<div className="auth__buttons">
						<Link
							style={{
								color: location.pathname === '/login' ? '#ce0020' : '#272727',
							}}
							to={'/login'}
							className="btn auth__btn auth__btn--left"
						>
							Login
						</Link>
						<Link
							style={{
								color: location.pathname === '/register' ? '#ce0020' : '#272727',
							}}
							to={'/register'}
							className="btn auth__btn"
						>
							Register
						</Link>
					</div>
					<form
						className="auth__form"
						onSubmit={(e) =>
							(location.pathname === '/register' && handleRegister(e)) ||
							(location.pathname === '/login' && handleLogin(e)) ||
							(location.pathname === '/forgot-password' && handleForgotPassword(e)) ||
							(location.pathname === '/reset-password' && handleResetPassword(e))
						}
					>
						{location.pathname === '/register' ? (
							<div className="auth__checkboxes">
								<div
									style={{
										pointerEvents: authorCheck.checked ? 'none' : 'auto',
										opacity: authorCheck.checked ? 0.5 : 1,
									}}
								>
									<InputCheckbox
										label="Customer"
										value={customerCheck.checked}
										setValue={setCustomerCheck}
									/>
								</div>
								<div
									style={{
										pointerEvents: customerCheck.checked ? 'none' : 'auto',
										opacity: customerCheck.checked ? 0.5 : 1,
									}}
								>
									<InputCheckbox
										label="Author"
										value={authorCheck.checked}
										setValue={setAuthorCheck}
									/>
								</div>
							</div>
						) : null}

						<div className="auth__inputs">
							{location.pathname === '/register' ? (
								<>
									<InputForm
										name="name"
										placeholder="Name"
										type="text"
										reference={nameRef}
										value={name.value}
										setValue={setName}
									/>
									<InputForm
										name="phone"
										placeholder="Phone number"
										type="text"
										value={phone.value}
										reference={phoneRef}
										setValue={setPhone}
									/>
								</>
							) : null}
							{location.pathname !== '/reset-password' && (
								<InputForm
									name="email"
									placeholder="Email"
									reference={emailRef}
									type="text"
									value={email.value}
									setValue={setEmail}
								/>
							)}
							{location.pathname === '/register' ||
							location.pathname === '/login' ||
							location.pathname === '/reset-password' ? (
								<InputForm
									name="password"
									placeholder="Password"
									type="password"
									reference={passwordRef}
									value={password.value}
									setValue={setPassword}
								/>
							) : null}
							{location.pathname === '/register' ||
							location.pathname === '/reset-password' ? (
								<>
									<InputForm
										name="confirmPassword"
										placeholder="Confirm password"
										type="password"
										reference={confirmPasswordRef}
										value={confirmPassword.value}
										setValue={setConfirmPassword}
									/>
									{password.value ? (
										<PasswordStrengthBar password={password.value} />
									) : null}
								</>
							) : null}
						</div>

						{location.pathname === '/register' ? (
							<div className="auth__terms">
								<InputCheckbox
									value={politicsCheck.checked}
									setValue={setPoliticsCheck}
									styles={{ fontWeight: '400' }}
									label="I agree to the terms of service under the conditions and for the purposes described in the User Agreement."
								/>
							</div>
						) : (
							location.pathname === '/login' && (
								<div className="auth__terms">
									<InputCheckbox
										value={politicsCheck.checked}
										setValue={setPoliticsCheck}
										styles={{ fontWeight: '400' }}
										label="Remember password"
									/>
									<Link
										className="auth__forgot"
										to={'/forgot-password'}
									>
										Forgot password?
									</Link>
								</div>
							)
						)}
						<div className="error-message">
							{error ? (
								<p style={{ color: styles ? '#03a600' : 'red' }}>{error}</p>
							) : null}
						</div>
						<button
							className="btn btn--universal btn--red-hover auth__submit"
							type="submit"
						>
							{location.pathname === '/register' && 'Register'}
							{location.pathname === '/login' && 'Login'}
							{location.pathname === '/forgot-password' && 'Send'}
							{location.pathname === '/reset-password' && 'Reset'}
							{location.pathname === '/verify-email' && 'Please wait...'}
						</button>
					</form>
				</div>
			</Box>
		</Modal>
	);
};

export default Register;
