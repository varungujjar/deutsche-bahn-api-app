import { useState } from 'react';
import CONFIG from '../../../config';
import DateTimePicker from '../../form/DateTimePicker';
import LocationDropDown from '../../form/LocationDropDown';
import Button from '../../form/Button';

const SearchBar = ({ isLoading, onSubmitQuery }) => {
	const [searchQuery, setSearchQuery] = useState(CONFIG.journeysApi.params);

	const validatefields = { from: 'Required', to: 'Required' };
	const [formErrors, setFormErrors] = useState({});

	const submitValidation = () => {
		let errors = {};
		Object.keys(validatefields).forEach((field) => {
			if (!searchQuery[field]) {
				errors[field] = validatefields[field];
			}
		});
		setFormErrors({ ...errors });
		if (Object.keys(errors).length) {
			return false;
		}
		return true;
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (!submitValidation()) return;
		onSubmitQuery(searchQuery);
	};

	return (
		<form onSubmit={onSubmitHandler}>
			<div className="grid grid-cols-12 gap-3">
				<div className="lg:col-span-4 col-span-12">
					<LocationDropDown
						label="From"
						name="from"
						placeholder="Station / Stop"
						onChange={(location) => {
							setSearchQuery({ ...searchQuery, from: location });
							setFormErrors({ ...formErrors, from: '' });
						}}
						error={formErrors.from ? true : false}
					/>
				</div>
				<div className="lg:col-span-4 col-span-12">
					<LocationDropDown
						label="To"
						name="to"
						placeholder="Station / Stop"
						onChange={(location) => {
							setSearchQuery({ ...searchQuery, to: location });
							setFormErrors({ ...formErrors, to: '' });
						}}
						error={formErrors.to ? true : false}
					/>
				</div>
				<div className="lg:col-span-3 col-span-12">
					<DateTimePicker
						name="datetime"
						placeholder="Date & Time"
						onChange={(momentPayload) => setSearchQuery({ ...searchQuery, ...momentPayload })}
					/>
				</div>
				<div className="lg:col-span-1 col-span-12">
					<Button type="submit">
						<div className={`${isLoading ? 'block' : 'hidden'} spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-white`}>
							<span className="visually-hidden">Loading...</span>
						</div>
						<div className={`${!isLoading ? 'inline-block  w-4 h-4' : 'hidden'}`}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path
									fill="#FFFFFF"
									d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
								/>
							</svg>
						</div>
					</Button>
				</div>
			</div>
		</form>
	);
};

SearchBar.defaultProps = {
	isLoading: false,
};

export default SearchBar;
