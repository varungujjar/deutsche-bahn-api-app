import Select from '../Select';
import { timeList } from '../../../helpers/datetime';

const TimePicker = ({ label, value, onChange }) => {
	const options = timeList(24);

	const getDefaultOption = (options, value) => {
		return options.filter((item) => item.hours === value.hours && item.minutes === value.minutes);
	};

	const onChangeHandler = (option) => {
		onChange({ hours: option.hours, minutes: 0 });
	};

	const defaultOption = getDefaultOption(options, value);

	return <Select label={label} value={defaultOption[0]} options={options} onChange={onChangeHandler} />;
};

TimePicker.defaultProps = {
	label: 'Select time',
	value: { hours: 0, minutes: 0 },
};

export default TimePicker;
