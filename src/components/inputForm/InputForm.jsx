import './inputForm.scss';

const InputForm = ({ name, reference, placeholder, type, value = "", id, setValue, clearError = () => {} }) => {
	return (
		<>
			<label className='label' htmlFor={id}></label>
			<input
				className='input'
				type={type}
				name={name}
				id={id}
				ref={reference}
				placeholder={placeholder}
				value={value || ''}
				onChange={(e) => (setValue({value: e.target.value, isValid: true}), clearError())}
			/>
		</>
	);
};

export default InputForm;
