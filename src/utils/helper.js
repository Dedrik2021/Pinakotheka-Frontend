import moment from 'moment';

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
	paintings?.forEach((painting) => {
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

export const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export const capitalizeFirstLetter = (string) => {
	if (!string) return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isNew = (date) => {
	const now = new Date();
	const diffInTime = now.getTime() - date.getTime();
	const diffInDays = diffInTime / (1000 * 3600 * 24);
	return diffInDays <= 7;
};

export const handleScroll = (ref, currentPage, totalPages, top = 0) => {
	if (ref) {
		if (currentPage !== 1 || currentPage === totalPages || currentPage === 1) {
			window.scrollTo({
				top: ref.offsetTop - top,
				behavior: 'smooth',
			});
		}
	}
};

export const getPaginationItems = (length, authorsArtsArray, currentPage) => {
	const count = length;
	const startIndex = (currentPage - 1) * count;
	const endIndex = startIndex + count;
	const currentItems = authorsArtsArray?.length
		? authorsArtsArray?.sort((a, b) => a.index - b.index).slice(startIndex, endIndex)
		: [];
	const totalPages = authorsArtsArray?.length ? Math.ceil(authorsArtsArray?.length / count) : 1;

	return {
		currentItems,
		totalPages,
	};
};

export const bodyLockScroll = (lock) => {
	if (lock) {
		document.body.classList.add('lock')
	} else {
		document.body.classList.remove('lock')
	}
}

export const calculateSalePercentage = (originalPrice, salePrice) => {
	if (originalPrice <= 0) {
		throw new Error("Original price must be greater than 0.");
	}
	const discount = originalPrice - salePrice;
	const discountPercentage = (discount / originalPrice) * 100;
	const roundedDiscountPercentage = discountPercentage.toFixed(1)
	return parseFloat(roundedDiscountPercentage)
}

export const formatDate = (dateString) => {
	const date = moment(dateString);
	const now = moment();
	const duration = moment.duration(now.diff(date));

	if (duration.asSeconds() < 60) {
		return `Now`;
	} else if (duration.asMinutes() < 60) {
		return `${Math.floor(duration.asMinutes())} min`;
	} else if (date.isSame(now, 'day')) {
		return `Today, ${date.format('HH:mm')}`;
	} else if (date.isSame(now.subtract(1, 'day'), 'day')) {
		return `Yesterday, ${date.format('HH:mm')}`;
	} else if (date.isSame(now, 'week')) {
		return date.format('dddd, HH:mm');
	} else if (date.isSame(now, 'year')) {
		return date.format('D MMM, HH:mm'); 
	} else {
		return date.format('DD/MM/YYYY, HH:mm');
	}
};

export const formatDateForMessages = (dateString) => {
    const date = moment(dateString);
    const now = moment();

    if (date.isSame(now, 'day')) {
        return 'Today';
    } else if (date.isSame(moment().subtract(1, 'day'), 'day')) { 
        return 'Yesterday';
    } else {
        return date.format('DD/MM/YYYY'); 
    }
};