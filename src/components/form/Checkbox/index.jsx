import React from 'react';

const Checkbox = ({ label, name, value, id, checked, onChange }) => {
	return (
		<>
			<input
				className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer"
				type="radio"
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				checked={checked}
			/>
			<label className="form-check-label inline-block text-gray-800" htmlFor={id}>
				{label}
			</label>
		</>
	);
};

Checkbox.defaultProps = {
	label: '',
	name: '',
	value: '',
	id: '',
	checked: false,
};

export default Checkbox;
