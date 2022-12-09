import { useEffect, useState, useRef } from 'react';
import CONFIG from '../../../config';
import serviceApi from '../../../service/axios';
import Input from '../Input';

const LocationDropDown = ({ label, name, placeholder, value, onChange, error }) => {
	const [inputValue, setInputValue] = useState(value);
	const [locations, setLocations] = useState([]);

	const [toggleDropdown, setToggleDropdown] = useState(false);
	const dropdownElement = useRef();

	const onChangeHandler = (e) => {
		onChange();
		setToggleDropdown(true);
		setInputValue(e.target.value);
	};

	const onSelectHandler = (location) => {
		setInputValue(location.name ? location.name : location.address && location.address);
		setToggleDropdown(false);
		onChange(location);
	};

	const fetchLocations = async (inputValue) => {
		await serviceApi
			.get(CONFIG.locationApi.url, {
				params: {
					...CONFIG.locationApi.params,
					query: inputValue,
				},
			})
			.then((response) => {
				setLocations(response.data);
			});
	};

	const LocationsList = ({ locations }) => {
		return (
			<ul
				className={`absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
				aria-labelledby="locations-list"
			>
				{locations.length ? (
					locations.map((location, index) => {
						return (
							location.type === 'stop' && (
								<li
									key={index}
									className="relative py-2 pl-3 pr-9 text-gray-700 hover:bg-indigo-500 hover:text-white cursor-pointer transition duration-200"
									onClick={() => onSelectHandler(location)}
									data-testid={name + '-row'}
								>
									<div className="flex items-center">
										<span className="font-normal ml-3 block truncate">{location.name ? location.name : location.address && location.address}</span>
									</div>
								</li>
							)
						);
					})
				) : (
					<li className="py-2 text-center">
						<div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-indigo-500" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</li>
				)}
			</ul>
		);
	};

	/* Toggle dropdown controller */
	useEffect(() => {
		const onBodyClick = (event) => {
			if (dropdownElement.current.contains(event.target)) {
				return;
			}
			setToggleDropdown(false);
		};
		document.body.addEventListener('click', onBodyClick, { capture: true });

		return () => {
			document.body.removeEventListener('click', onBodyClick, {
				capture: true,
			});
		};
	}, []);

	useEffect(() => {
		if (!inputValue) {
			setToggleDropdown(false);
		}
		const debounceTimerId = setTimeout(() => {
			inputValue && toggleDropdown && fetchLocations(inputValue);
		}, 500);

		return () => {
			clearTimeout(debounceTimerId);
		};
	}, [inputValue, toggleDropdown]);

	return (
		<div className="relative" ref={dropdownElement}>
			<Input label={label} name={name} type="text" placeholder={placeholder} value={inputValue} onChange={onChangeHandler} error={error} />
			<div data-testid={name + '-dropdown'} style={{ display: toggleDropdown ? 'block' : 'none' }}>
				<LocationsList locations={locations} />
			</div>
		</div>
	);
};

LocationDropDown.defaultProps = {
	label: '',
	name: '',
	placeholder: '',
	value: '',
	error: false,
};

export default LocationDropDown;
