import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import './priceFilter.scss';

const PriceFilter = ({price, minPrice, maxPrice, onPriceChange }) => {
	const [min, setMin] = useState(minPrice);
	const [max, setMax] = useState(maxPrice);
	const [isOpen, setIsOpen] = useState(false);

	const handleMinChange = (event) => {
        const value = Number(event.target.value);
    
        // Ensure min is not greater than max
        if (value >= price.max) {
            setMin(price.max);
            onPriceChange({ min: price.max, max });
        } else {
            setMin(value);
            onPriceChange({ min: value, max: price.max });
        }
    };

	const handleMaxChange = (event) => {
        const value = Number(event.target.value);
    
        // Ensure max is not less than min
        if (value <= price.min) {
            setMax(price.min);
            onPriceChange({ min: price.min, max: price.min });
        } else {
            setMax(value);
            onPriceChange({ min: min, max: value });
        }
    };

	return (
		<div className="dropdown-container">
        <div
				className={`dropdown-header ${isOpen ? 'active' : ''}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				Price
				<div className="dropdown-arrow">
					<IoIosArrowForward />
				</div>
			</div>
			<div className={`price-filter ${isOpen ? 'active' : ''}`}>
				<div className="price-filter__range">
					<input
						type="range"
						min={minPrice}
						max={maxPrice}
						value={price.min}
						onChange={(e) => handleMinChange(e)}
						className="price-filter__range-min"
					/>
					<input
						type="range"
						min={minPrice}
						max={maxPrice}
						value={price.max}
						onChange={(e) => handleMaxChange(e)}
						className="price-filter__range-max"
					/>
				</div>
				<div className="price-filter__values">
					<span>
						€{price.min} - €{price.max}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;
