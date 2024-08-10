export const paintingSize = (size) => {
	return (
		<>
			{size === 'small' && <div>(up to 12x12)</div>}
			{size === 'medium' && <div>(12x12 to 24x24)</div>}
			{size === 'large' && <div>(24x24 to 48x48)</div>}
			{size === 'extra_large' && <div>(over 48x48)</div>}
			{size === 'custom_size' && <div>(Custom Size)</div>}
		</>
	);
};

export const sculptureSize = (size) => {
	return (
		<>
			{size === 'small' && <div>(up to 12 inches)</div>}
			{size === 'medium' && <div>(12 to 24 inches)</div>}
			{size === 'large' && <div>(24 to 48 inches)</div>}
			{size === 'extra_large' && <div>(over 48 inches)</div>}
			{size === 'monumental' && <div>(life-sized or larger)</div>}
		</>
	);
};

export const drawingSize = (size) => {
	return (
		<>
			{size === 'small' && <div>(up to 9x12)</div>}
			{size === 'medium' && <div>(9x12 to 18x24)</div>}
			{size === 'large' && <div>(18x24 to 24x36)</div>}
			{size === 'extra_large' && <div>(over 24x36)</div>}
			{size === 'panoramic' && <div>(Panoramic)</div>}
		</>
	);
};

export const digitalArtSize = (size) => {
	return (
		<>
			{size === 'small' && <div>(up to 1080p resolution)</div>}
			{size === 'medium' && <div>(1080p to 4K resolution)</div>}
			{size === 'large' && <div>(4K to 8K resolution)</div>}
			{size === 'ultra_large' && <div>(over 8K resolution)</div>}
			{size === 'custom_resolution' && <div>(Custom Resolution)</div>}
			{size === 'panoramic' && <div>(Panoramic)</div>}
		</>
	);
};

export const handmadeSize = (size) => {
	return (
		<>
			{size === 'small' && <div>(up to 6x6)</div>}
			{size === 'medium' && <div>(6x6 to 12x12)</div>}
			{size === 'large' && <div>(12x12 to 24x24)</div>}
			{size === 'extra_large' && <div>(over 24x24)</div>}
			{size === 'oversized' && <div>(over 36x36)</div>}
			{size === 'custom_size' && <div>(Custom Size)</div>}
		</>
	);
};
