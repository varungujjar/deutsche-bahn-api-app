import { useEffect, useState, useRef } from 'react';
/* Uses React modern calendar daate picker */
/* https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/getting-started */
/* Using the forked version for compatibility with latest React version  */
import { Calendar } from '@amir04lm26/react-modern-calendar-date-picker';
import { stringtoMoment, dateToJson, timeToJson } from '../../../helpers/datetime';
import Input from '../Input';
import Checkbox from '../Checkbox';
import TimePicker from './TimePicker';
import Button from '../Button';
import './index.css';

const DateTimePicker = ({ name, placeholder, value, onChange }) => {
	const [selectedDate, setSelectedDate] = useState(dateToJson(value));
	const [selectedTime, setSelectedTime] = useState(timeToJson(value));

	const dateString = String(selectedDate.day + '.' + selectedDate.month + '.' + selectedDate.year);
	const timeString = String(selectedTime.hours + ':' + selectedTime.minutes);

	const [momentType, setMomentType] = useState('depature');
	const [label, setLabel] = useState('Depart by');

	const parseDate = stringtoMoment(dateString, timeString);
	const defaultValue = parseDate.format('DD MMM, HH:mm');

	const dropdownElement = useRef();
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const momentPayload = {
		depature: momentType === 'depature' ? parseDate.toISOString() : null,
		arrival: momentType === 'arrival' ? parseDate.toISOString() : null,
	};

	const onDateHandler = (value) => {
		setSelectedDate({ ...selectedDate, ...value });
		onChange(momentPayload);
	};

	const onTimeHandler = (value) => {
		setSelectedTime({ ...selectedTime, ...value });
		onChange(momentPayload);
	};

	const onMomentTypeHandler = (event) => {
		setMomentType(event.target.value);
		setLabel(event.target.value === 'depature' ? 'Depart By' : 'Arrive by');
		onChange(momentPayload);
	};

	/* Dismiss dropdown with external click  */
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
		// console.log(momentType);
		// console.log(selectedDate);
		// console.log(selectedTime);
	}, [momentType, selectedDate, selectedTime]);

	return (
		<div className="relative" ref={dropdownElement}>
			<Input
				type="text"
				label={label}
				name={name}
				placeholder={placeholder}
				value={defaultValue}
				onClick={() => setToggleDropdown(true)}
				readOnly={true}
			/>
			<div
				data-testid="datetime-dropdown"
				style={{ display: toggleDropdown ? 'block' : 'none' }}
				className={`w-full lg:w-auto absolute z-10 p-2 mt-1 rounded bg-white text-base shadow-lg right-0`}
			>
				<div className="flex flex-col lg:flex-row items-center">
					<Calendar
						value={selectedDate}
						onChange={onDateHandler}
						minimumDate={dateToJson}
						colorPrimary="#6366f1"
						colorPrimaryLight="#6366f1"
						calendarClassName="text-xs"
					/>
					<div className="w-52 pr-4 pl-2">
						<div className="mt-2">
							<Checkbox
								label="Depart By"
								name="momentType"
								value="depature"
								id="momentTypeDepature"
								onChange={onMomentTypeHandler}
								checked={momentType === 'depature' ? true : false}
							/>
						</div>
						<div className="mt-2">
							<Checkbox
								label="Arrive By"
								name="momentType"
								value="arrival"
								id="momentTypeArrival"
								onChange={onMomentTypeHandler}
								checked={momentType === 'arrival' ? true : false}
							/>
						</div>
						<div className="mt-4">
							<TimePicker value={selectedTime} label="Select Time" onChange={onTimeHandler} />
						</div>
						<div className="mt-4">
							<Button type="button" onClick={() => setToggleDropdown(false)}>
								Done
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

DateTimePicker.defaultProps = {
	name: '',
	placeholder: '',
	value: '',
};

export default DateTimePicker;
