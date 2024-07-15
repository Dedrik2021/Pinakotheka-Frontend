export const regexes = [
	{ regex: /[a-z]/, label: 'Lowercase letter' },
	{ regex: /[A-Z]/, label: 'Uppercase letter' },
	{ regex: /[0-9]/, label: 'Number' },
	{ regex: /[!@#$%^&*(),.?":{}|<>]/, label: 'Special character' },
	{ regex: /.{6,}/, label: 'Minimum 6 characters' },
];

export const calculatePasswordStrength = (password) => {
	let strength = '';
	const passedCriteria = regexes.reduce((acc, item) => {
		return item.regex.test(password) ? acc + 1 : acc;
	}, 0);

	switch (passedCriteria) {
		case 1:
		case 2:
		case 3:
			strength = 'weak';
			break;
		case 4:
			strength = 'medium';
			break;
		case 5:
			strength = 'strong';
			break;
		default:
			strength = '';
			break;
	}

    return strength;
};
