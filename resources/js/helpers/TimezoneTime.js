import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);
dayjs.extend(utc);
import jstz from 'jstz';
const timezoneDetermine = jstz.determine();

function getTimeZoneOffset(date, timeZone) {
	const options = { timeZone, calendar: 'iso8601', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
	const dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
	const parts = dateTimeFormat.formatToParts(date);
	const map = new Map(parts.map(x => [x.type, x.value]));
	const year = map.get('year');
	const month = map.get('month');
	const day = map.get('day');
	let hour = map.get('hour');
	const minute = map.get('minute');
	const second = map.get('second');
	const ms = date
		.getMilliseconds()
		.toString()
		.padStart(3, '0');
	if (hour == '24') hour = '00';
	const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}`;
	const lie = new Date(iso + 'Z');
	return -(lie - date) / 60 / 1000;
}

export default {
	get(datetime, from, to, format = 'HH:mm') {
		let defaultTimezone = timezoneDetermine.name();
		from = from || defaultTimezone;
		to = to || defaultTimezone;
		let fromTZ = getTimeZoneOffset(new Date(), from);
		let toTZ = getTimeZoneOffset(new Date(), to);

		let timezoneTime = dayjs.tz(datetime, to).add(fromTZ - toTZ, 'minute');
		return timezoneTime.format(format);
	}
};
