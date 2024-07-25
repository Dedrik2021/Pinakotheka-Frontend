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

export const uniquePaintingsByAuthor = (paintings) => {
    const paintingMap = new Map();
    paintings?.forEach(painting => {
        if (!paintingMap.has(painting.authorId)) {
            paintingMap.set(painting.authorId, painting);
        }
    });
    return Array.from(paintingMap.values());
};

export const getImageDimensions = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = src;
    });
};