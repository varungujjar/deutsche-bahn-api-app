const Input = ({ label, name, type, value, placeholder, onClick, onChange, error, readOnly }) => {
	return (
		<>
			<input
				type={type}
				className={`${
					error ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-indigo-500'
				} w-full h-14 pt-6 px-4 pb-2 rounded bg-slate-100	focus:bg-white  text-base font-bold text-gray-700 border-2 transition duration-500 focus:text-gray-700 focus:outline-none placeholder:font-normal placeholder:text-gray-500`}
				id={name}
				name={name}
				placeholder={placeholder}
				autoComplete="off"
				value={value}
				onClick={onClick}
				onChange={onChange}
				readOnly={readOnly}
			/>
			<label htmlFor={name} className="text-gray-700 top-2 absolute left-4 text-sm font-semibold">
				{label}
			</label>
		</>
	);
};

Input.defaultProps = {
	label: '',
	name: '',
	type: 'text',
	placeholder: '',
	value: '',
	error: false,
	readOnly: false,
};

export default Input;
