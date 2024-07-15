import './inputCheckbox.scss'; // Optional: for custom styles

const InputCheckbox = ({
	label,
	setValue,
    value,
	labelPlacement = 'right',
	className = '',
	styles,
}) => {
	const handleChange = (event) => {
		setValue({ checked: event.target.checked, isValid: true });
	};

	return (
		<div className={`custom-checkbox ${className}`}>
			{labelPlacement === 'left' && (
				<span style={styles} className="checkbox-label">
					{label}
				</span>
			)}
			<label style={styles} className="checkbox-label">
				<input
					className="original-checkbox"
					type="checkbox"
					checked={value}
					onChange={handleChange}
				/>
				<span className="checkbox-custom"></span>
				{labelPlacement === 'right' && (
					<span style={styles} className="checkbox-label">
						{label}
					</span>
				)}
			</label>
		</div>
	);
};

export default InputCheckbox;
