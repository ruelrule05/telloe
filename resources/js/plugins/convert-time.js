var TWELVE_HOUR_REGEX = /(\d{1,2})\s*:?\s*(\d{0,2})\s*(a\.?m\.?|p\.?m\.?)/i;
var TWENTY_FOUR_HOUR_REGEX = /(\d{1,2})\s*:\s*(\d{1,2})/i;

function maybePrependZero(str) {
	str = str.toString();
	if (str.length === 1) {
		return '0' + str;
	} else {
		return str;
	}
}

function getPeriod(hour) {
	if (parseInt(hour) >= 12) {
		return 'pm';
	} else {
		return 'am';
	}
}

function toTwentyFourHourTime(time, format) {
	var match = time.match(TWELVE_HOUR_REGEX);
	if (!match) return;

	var hour = match[1];
	var minute = match[2] || '00';
	var period = match[3].replace(/\./g, '').toLowerCase();

	// Default argument for format
	if (!format) {
		format = 'hh:MM';
	}

	if (period == 'pm' && hour !== '12') {
		return format
			.replace('hh', parseInt(hour) + 12)
			.replace('mm', minute)
			.replace('MM', maybePrependZero(minute));
	} else {
		let newFormat = format
			.replace('hh', hour)
			.replace('HH', maybePrependZero(hour))
			.replace('mm', minute)
			.replace('MM', maybePrependZero(minute));
		if (hour === '12' && period == 'am') {
			newFormat = newFormat.replace('12:', '00:');
		}
		return newFormat;
	}
}

function toTwelveHourTime(time, format) {
	var match = time.match(TWENTY_FOUR_HOUR_REGEX);
	if (!match) return;

	var hour = match[1];
	var minute = match[2];

	// Default argument for format
	if (!format) {
		format = 'hh:MM a';
	}

	if (parseInt(hour) > 12) {
		return format
			.replace('hh', maybePrependZero(parseInt(hour) - 12))
			.replace('h', parseInt(hour) - 12)
			.replace('HH', maybePrependZero(hour))
			.replace('mm', minute)
			.replace('MM', maybePrependZero(minute))
			.replace('a', 'pm')
			.replace('A', 'PM');
	} else {
		return format
			.replace('hh', maybePrependZero(hour))
			.replace('h', parseInt(hour))
			.replace('HH', maybePrependZero(hour))
			.replace('mm', minute)
			.replace('MM', maybePrependZero(minute))
			.replace('a', getPeriod(hour))
			.replace('A', getPeriod(hour).toUpperCase())
			.replace('00:', '12:');
	}
}

export default function(time, format) {
	return toTwentyFourHourTime(time, format) || toTwelveHourTime(time, format);
}
