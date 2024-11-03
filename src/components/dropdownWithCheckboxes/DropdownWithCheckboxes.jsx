import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import InputCheckbox from '../inputCheckbox/InputCheckbox';

import './dropdownWithCheckboxes.scss';

const DropdownWithCheckboxes = ({ title, items, setSelectedOptions, selectedOptions }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOption = (optionValue) => {
		setSelectedOptions((prevSelected) => {
			const isSelected = prevSelected.some((option) => option.value === optionValue);

			if (isSelected) {
				return prevSelected.filter((option) => option.value !== optionValue);
			} else {
				return [...prevSelected, { value: optionValue, type: title.toLowerCase() }];
			}
		});
	};

	return (
		<div className="dropdown-container">
			<div
				className={`dropdown-header ${isOpen ? 'active' : ''}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{title}
				<div className="dropdown-arrow">
					<IoIosArrowForward />
				</div>
			</div>
			<div className={`dropdown-list scrollbar ${isOpen ? 'active' : ''}`}>
				{items?.map((option, i) => (
					<div key={i} className="dropdown-item">
						<InputCheckbox
							label={option.label}
							value={selectedOptions.some(
								(selected) => selected.value === option.value,
							)}
							onChange={() => toggleOption(option.value)}
							styles={{ marginLeft: '10px', fontSize: '12px', width: '260px', marginRight: '0px' }}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default DropdownWithCheckboxes;