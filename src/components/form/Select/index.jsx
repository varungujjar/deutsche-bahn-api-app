import { useState, useEffect, useRef } from 'react';

const Select = ({ label, value, options, onChange }) => {
	const [selected, setSelected] = useState(value.name ? value : options[0]);

	const dropdownElement = useRef();
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const onClickHandler = (option) => {
		setSelected(option);
		setToggleDropdown(false);
		onChange(option);
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

	useEffect(() => {}, [selected.value]);

	return (
		<>
			<label id="listbox-label" className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<div className="relative mt-1" ref={dropdownElement}>
				<button
					type="button"
					className="relative w-full cursor-default rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
					onClick={() => setToggleDropdown(!toggleDropdown)}
				>
					<span className="flex items-center">
						<span className="block truncate text-base">{selected.name}</span>
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
						<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
				</button>

				<ul
					className={`${
						toggleDropdown ? 'block' : 'hidden'
					} absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
				>
					{options.length &&
						options.map((option, index) => (
							<li
								key={index}
								className="relative py-2 pl-3 pr-9 text-gray-700 hover:bg-indigo-500 hover:text-white cursor-pointer transition duration-200"
								onClick={() => onClickHandler(option)}
							>
								<div className="flex items-center">
									<span className="font-normal ml-3 block truncate">{option.name}</span>
								</div>
							</li>
						))}
				</ul>
			</div>
		</>
	);
};

Select.defaultProps = {
	label: '',
	value: '',
	options: [],
};

export default Select;
