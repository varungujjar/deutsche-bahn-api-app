import moment from 'moment';

export const nowDateTime = () => {
	const now = new Date();
	return now;
};

export const dateToJson = (_now) => {
	const now = _now ? _now : new Date();
	return {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
	};
};

export const timeToJson = (_now) => {
	const now = _now ? _now : new Date();
	return { hours: now.getHours(), minutes: 0 }; //We are limiting minutes to 0
};

export const isoFormatDateTime = (datetime) => {
	return moment(datetime).format('HH:mm');
};

export const stringtoMoment = (dateString, timeString) => {
	return moment(dateString + timeString, 'DD.MM.YYYY HH:mm');
};

export const isoCalculateTime = (dateTime1, dateTime2) => {
	const date1 = moment(dateTime1);
	const date2 = moment(dateTime2);

	let days = date1.diff(date2, 'days');
	date2.add(days, 'days');

	let hours = date1.diff(date2, 'hours');
	date2.add(hours, 'hours');

	let minutes = date1.diff(date2, 'minutes');
	date2.add(minutes, 'minutes');

	let journeyDuration = '';
	journeyDuration += days ? days + 'd ' : '';
	journeyDuration += hours ? hours + 'h ' : '';
	journeyDuration += minutes ? minutes + 'min' : '';

	return journeyDuration;
};

export const timeList = (format = 24) => {
	let list = [];
	for (let i = 0; i < format + 1; i++) {
		let hoursWithZero = i;
		if (hoursWithZero.toString().length === 1) {
			hoursWithZero = '0' + hoursWithZero.toString();
		}
		if (format === 12 && i === 0) continue;
		if (format === 24 && i === 24) continue;
		list.push({ name: hoursWithZero + ':00', hours: i, minutes: 0 });
	}
	return list;
};
