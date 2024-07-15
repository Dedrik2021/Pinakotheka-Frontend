import { useState, useEffect } from 'react';
import { calculatePasswordStrength, regexes } from '../../utils/helper';

import './passwordStrengthBar.scss';

const PasswordStrengthBar = ({ password }) => {
	const [strength, setStrength] = useState('');
	const getStyles = (strength) => {
		switch (strength) {
			case 'weak':
				return { color: 'red', width: '33%' };
			case 'medium':
				return { color: 'orange', width: '66%' };
			case 'strong':
				return { color: 'green', width: '100%' };
			default:
				return { color: 'gray', width: '0%' };
		}
	};

	useEffect(() => {
		if (password) {
			setStrength(calculatePasswordStrength(password));
		}
	}, [password]);

	return (
		<>
			<div className='password-strength'>
				<div
                    className="password-strength__bar"
					style={{
						width: getStyles(strength).width,
						backgroundColor: getStyles(strength).color
					}}
				/>
				<p className='password-strength__label'>{strength && `Password is ${strength}`}</p>
			</div>
			<ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
				{regexes.map((item, index) => (
					<li key={index}>
						{item.regex.test(password) ? (
							<span className='password-strength__label' style={{ color: 'green' }}>{item.label}</span>
						) : (
							<span className='password-strength__label' style={{ color: 'red' }}>{item.label}</span>
						)}
					</li>
				))}
			</ul>
		</>
	);
};

export default PasswordStrengthBar;