const introJS = require('intro.js');
let options = {
	showStepNumbers: false,
	showBullets: false,
	hidePrev: true,
	hideNext: true,
	tooltipClass: 'rounded',
	highlightClass: 'rounded bg-white',
	tooltipPosition: 'right',
	disableInteraction: true,
	overlayOpacity: 0.35,
	exitOnOverlayClick: false,
	skipLabel: 'Done',
	scrollToElement: false
};
export default {
	services_index: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['View service and manage availability and bookings.', 'Click here for quick actions.', 'Click here to add a new service.']
	},

	services_show: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Click here to toggle between coaches and timeslots.', 'Add a member in this service.', 'Navigate between dates or pick from calendar.', 'Click here for actions to edit, manage availability or delete this service.']
	},

	packages_index: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['View package and manage slots and services.', 'Click here for quick actions.', 'Click here to add a new service.']
	},

	packages_show: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Click here to toggle between services slots.', 'Add a service in this package.', 'Click here for actions to edit or delete this package.']
	},

	conversations: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Start a new conversation or group chat.', 'Turn message notifications on or off.', 'Start a video call.', 'Start an audio call.', 'Toggle details panel.', 'Send an emoji message.', 'Record an audio and send as a message', 'Attach a file and send as a message.', 'Record your screen and download or send as a message.']
	},

	contacts_index: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Click here to add a new contact.', 'Manage default fields for your contacts.', 'Filter contacts by status.', 'Manage or delete contact.']
	},

	contacts_show: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Click here to add a new contact.', 'Manage default fields for your contacts.', 'Filter contacts by status.', 'Manage or delete contact.']
	},

	organizations_index: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Click here to access booking link, edit or delete options.', 'Click here to add a new organization.']
	},

	members_index: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['View member and edit details, assign services or manage bookings.', 'Click here for quick actions.', 'Click here to add a new member.']
	},

	members_show: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Click here for actions to edit or delete this member.']
	},

	subscriptions_index: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Filter subscriptions by status.', 'Click here to create a new subscription for your contacts.']
	},

	invoices_index: {
		intro: introJS().setOptions(options),
		enabled: false,
		steps: ['Filter invoices by status.', 'Click here to create a new invoice for your contacts.']
	}

	// service_card: {
	// 	step: 2,
	// 	intro: 'Click to go to service page to edit details, availability and manage bookings.',
	// 	enabled: true
	// },

	// add_service: {
	// 	step: 3,
	// 	intro: 'Click here to create a new service.',
	// 	enabled: true
	// },

	// edit_service: {
	// 	step: 15,
	// 	intro: 'Edit or delete the selected booking type.',
	// 	enabled: true
	// },
	// service_availability: {
	// 	step: 16,
	// 	intro: 'Manage availability by day of the week, time and breaktime.',
	// 	enabled: true
	// },
	// service_holidays: {
	// 	step: 17,
	// 	intro: 'Set holidays for the selected booking type.',
	// 	enabled: true
	// },

	// messages: {
	// 	step: 100,
	// 	intro: 'All of your conversations are here. Send a message to your contacts or do a video call!',
	// 	enabled: true
	// },
	// contacts: {
	// 	step: 300,
	// 	intro: 'Add and manage all of your contacts here.',
	// 	enabled: true
	// },
	// members: {
	// 	step: 4,
	// 	intro: 'Add and manage all of your members here.',
	// 	enabled: true
	// },
	// payments: {
	// 	step: 5,
	// 	intro: 'Create invoices for your contacts or subscribe them to your services.',
	// 	enabled: true
	// },
	// new_chat: {
	// 	step: 6,
	// 	intro: 'Start a new conversation or create a group chat.',
	// 	enabled: true
	// },
	// emoji: {
	// 	step: 7,
	// 	intro: 'Send an emoji message.',
	// 	enabled: true
	// },
	// audio: {
	// 	step: 8,
	// 	intro: 'Send an audio message.',
	// 	enabled: true
	// },
	// file: {
	// 	step: 9,
	// 	intro: 'Attach a file and send as a message.',
	// 	enabled: true
	// },
	// screen: {
	// 	step: 10,
	// 	intro: 'Record your screen and send as a message, or download the recording.',
	// 	enabled: true
	// },
	// video_call: {
	// 	step: 11,
	// 	intro: 'Star a video call with the current conversation.',
	// 	enabled: true
	// },
	// audio_call: {
	// 	step: 12,
	// 	intro: 'Star an audio call with the current conversation.',
	// 	enabled: true
	// },
	// calendar_settings: {
	// 	step: 13,
	// 	intro: 'Sync your Google and Outlook calendars.',
	// 	enabled: true
	// },
	// add_contact: {
	// 	step: 18,
	// 	intro: 'Add a new contact.',
	// 	enabled: true
	// },
	// manage_fields: {
	// 	step: 19,
	// 	intro: 'Manage default fields for your contacts.',
	// 	enabled: true
	// },
	// subscriptions_filter: {
	// 	step: 20,
	// 	intro: 'Filter subscriptions by status.',
	// 	enabled: true
	// },
	// add_subscription: {
	// 	step: 21,
	// 	intro: 'Create a subscription for a contact.',
	// 	enabled: true
	// },
	// invoices_filter: {
	// 	step: 22,
	// 	intro: 'Filter invoices by status.',
	// 	enabled: true
	// },
	// add_invoice: {
	// 	step: 23,
	// 	intro: 'Create an invoice for a contact.',
	// 	enabled: true
	// },
	// add_member: {
	// 	step: 24,
	// 	intro: 'Add a new contact.',
	// 	enabled: true
	// }
};
