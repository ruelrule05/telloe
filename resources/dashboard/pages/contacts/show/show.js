import { mapState, mapActions } from 'vuex';
import Modal from '../../../../components/modal/modal.vue';
import CheckmarkCircleIcon from '../../../../icons/checkmark-circle';
import MoreIcon from '../../../../icons/more';
import ArrowLeftIcon from '../../../../icons/arrow-left';
import ClockIcon from '../../../../icons/clock';
import TrashIcon from '../../../../icons/trash';
import dayjs from 'dayjs';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import Paginate from '../../../../components/paginate/paginate.vue';
import VueSelect from '../../../../components/vue-select/vue-select.vue';
const convertTime = require('convert-time');
import VCalendar from 'v-calendar';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import VueButton from '../../../../components/vue-button.vue';
import ZoomIcon from '../../../../icons/zoom';
import ShortcutIcon from '../../../../icons/shortcut';
import NoteIcon from '../../../../icons/note';
import PencilIcon from '../../../../icons/pencil';
import MoveIcon from '../../../../icons/move';
import PlusIcon from '../../../../icons/plus';
import draggable from 'vuedraggable';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import CogIcon from '../../../../icons/cog';
import ChevronLeftIcon from '../../../../icons/chevron-left';
import Booking from '../../../components/Booking/Booking.vue';
import axios from 'axios';
import VueCheckbox from '../../../../components/vue-checkbox/vue-checkbox.vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import InfoCircleIcon from '../../../../icons/info-circle.vue';

import ThumbupIcon from '../../../../icons/thumb-up';
import ThumbdownIcon from '../../../../icons/thumb-down';
import CommentIcon from '../../../../icons/comment-solid';
import ShareIcon from '../../../../icons/share';
import EyeIcon from '../../../../icons/eye-solid';
const format = require('format-duration');
import copy from 'copy-text-to-clipboard';
import AddVideoMessage from '../../video-messages/add.vue';
const gifshot = require('../../../../js/plugins/gifshot.min');
import { GifReader } from 'omggif';
const humanizeDuration = require('humanize-duration');
import { cover } from 'intrinsic-scale';
const AWS = window.AWS;
AWS.config.region = process.env.MIX_AWS_DEFAULT_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: process.env.MIX_AWS_IDENTITY_POOL
});
const S3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: process.env.MIX_AWS_BUCKET }
});

export default {
	components: {
		AddVideoMessage,
		ShareIcon,
		CommentIcon,
		EyeIcon,
		ThumbdownIcon,
		ThumbupIcon,
		InfoCircleIcon,
		Multiselect,
		VueCheckbox,
		Booking,
		CogIcon,
		ChevronLeftIcon,
		VueDropdown,
		VCalendar,
		Modal,
		CheckmarkCircleIcon,
		MoreIcon,
		ArrowLeftIcon,
		ClockIcon,
		Paginate,
		VueSelect,
		TrashIcon,
		ToggleSwitch,
		VueFormValidate,
		VueButton,
		ZoomIcon,
		ShortcutIcon,
		NoteIcon,
		PencilIcon,
		MoveIcon,
		PlusIcon,
		draggable
	},

	data: () => ({
		format: format,
		addingPackage: false,
		selectedPackage: null,
		selectedPackageService: null,
		selectedService: null,
		contact: null,
		clonedContact: null,
		filterServices: [],
		convertTime: convertTime,
		dayjs: dayjs,
		timeslots: [],
		newField: '',
		addField: false,
		selectedBooking: null,
		bookingModalLoading: false,
		createZoomLoading: false,
		recentNotes: [],
		editFields: false,
		new_field: {},
		serviceMembers: [],
		addingNote: false,
		newNote: '',
		selectedNote: null,
		newBooking: {
			service: null,
			service_id: null,
			date: new Date(),
			timeslot: null
		},
		orders: [
			{
				text: 'Newest',
				value: 'desc'
			},
			{
				text: 'Oldest',
				value: 'asc'
			}
		],
		order: 'desc',
		notesOrder: 'desc',
		masks: {
			input: 'MMMM D, YYYY'
		},
		newEvent: false,
		activeTab: 'notes',
		page: 1,
		packageService: null,
		contactPackageIndex: 0,
		tagOptions: [],
		rightTab: 'video_messages',
		videoMessage: null,
		addingVideoMessage: false,
		videoMessageStatus: '',
		uploadProgress: 0,
		gifProgress: 0,
		app_url: process.env.MIX_APP_URL
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			user_custom_fields: state => state.user_custom_fields.fields,
			packages: state => state.packages.index
		}),

		notes() {
			let notes = this.contact.contactNotes || [];
			this.contact.bookings.data.forEach(booking => {
				let index = notes.findIndex(x => x.type == 'booking-note' && x.booking && x.booking.id == booking.id);
				if (index == -1) {
					if (booking.notes && booking.notes.trim().length > 0) {
						notes.push({
							type: 'booking-note',
							note: booking.notes,
							booking: booking,
							created_at: booking.updated_at
						});
					}
				} else {
					notes[index].note = booking.notes;
				}
			});
			if (this.notesOrder == 'desc') {
				return notes.sort((a, b) => {
					return a.created_at > b.created_at ? -1 : 1;
				});
			} else if (this.notesOrder == 'asc') {
				return notes.sort((a, b) => {
					return b.created_at > a.created_at ? -1 : 1;
				});
			}
			return notes;
		},

		selectedPackageOptions() {
			let selectedPackageOptions = [];
			if (this.selectedPackage) {
				this.selectedPackage.services.forEach(service => {
					selectedPackageOptions.push({
						text: service.name,
						value: service
					});
				});
			}
			return selectedPackageOptions;
		},

		packagesOptions() {
			let packagesOptions = [];
			this.packages.forEach(packageItem => {
				packagesOptions.push({
					text: packageItem.name,
					value: packageItem
				});
			});
			return packagesOptions;
		},

		availableServices() {
			return this.services.filter(service => {
				return this.contact.blacklisted_services.find(x => x == service.id) ? false : true && service.is_available;
			});
		},

		servicesList() {
			let servicesList = [{ text: 'All', value: 0 }];
			this.services.forEach(service => {
				servicesList.push({
					text: service.name,
					value: service.id
				});
			});
			return servicesList;
		},

		customFields() {
			let custom_fields = [];
			(this.user_custom_fields || []).forEach(custom_field => {
				custom_fields.push({
					text: custom_field,
					value: custom_field
				});
			});
			return custom_fields;
		},

		newBookingServicesList() {
			let newBookingServicesList = [];
			if (this.newBooking.service) {
				newBookingServicesList.push({
					text: this.newBooking.service.coach.full_name,
					value: this.newBooking.service.id
				});
				this.newBooking.service.assigned_services.forEach(service => {
					newBookingServicesList.push({
						text: service.coach.full_name,
						value: service.id
					});
				});
			}
			return newBookingServicesList;
		},

		availableTimeslots() {
			let availableTimeslots = [];
			this.timeslots.forEach(timeslot => {
				if (timeslot.is_available) {
					availableTimeslots.push(timeslot);
				}
			});
			return availableTimeslots;
		}
	},

	watch: {
		selectedBooking: function (value) {
			this.getServiceMembers(value);
		},
		'newBooking.service': function () {
			this.newBooking.service_id = null;
			this.newBooking.timeslot = null;
			this.timeslots = [];
		},
		'newBooking.service_id': function () {
			this.getNewBookingServiceTimeslots();
		},
		'newBooking.date': function () {
			this.getNewBookingServiceTimeslots();
		},
		page: function () {
			this.getContact();
		}
	},

	created() {
		this.getContact();
		this.getServices();
		this.showUserCustomFields();
		this.getPackages();
	},

	mounted() {},

	methods: {
		...mapActions({
			getServices: 'services/index',
			storeUserCustomFields: 'user_custom_fields/store',
			showUserCustomFields: 'user_custom_fields/show',
			updateContact: 'contacts/update',
			storeBooking: 'bookings/store',
			storeConversation: 'conversations/store',
			getPackages: 'packages/index',
			updateVideoMessage: 'video_messages/update'
		}),

		async generateLinkPreview(gif, duration) {
			return new Promise((resolve, reject) => {
				(async () => {
					const response = await fetch(gif);
					this.uploadProgress += 10;
					const blob = await response.blob();
					const arrayBuffer = await blob.arrayBuffer();
					this.uploadProgress += 10;
					const intArray = new Uint8Array(arrayBuffer);
					const reader = new GifReader(intArray);
					const info = reader.frameInfo(0);
					const results = new Array(reader.numFrames()).fill(0).map((_, k) => {
						const image = new ImageData(info.width, info.height);
						reader.decodeAndBlitFrameRGBA(k, image.data);
						return image;
					});
					let canvas = document.createElement('canvas');
					canvas.width = 600;
					canvas.height = 313;
					let ctx = canvas.getContext('2d');
					let parsedDuration = humanizeDuration(duration, { round: true, units: duration < 60000 ? ['s'] : ['m'] })
						.replace('minutes', 'minute')
						.replace('seconds', 'second');
					let durationText = `Play ${parsedDuration} video`;

					let playImage = new Image();
					playImage.src = `${this.app_url}/images/email-play.png`;

					let images = [];
					playImage.onload = () => {
						results.forEach(imageData => {
							let { width, height, x, y } = cover(canvas.width, canvas.height, imageData.width, imageData.height);
							let renderer = document.createElement('canvas');
							renderer.width = imageData.width;
							renderer.height = imageData.height;
							renderer.getContext('2d').putImageData(imageData, 0, 0);
							ctx.drawImage(renderer, x, y, width, height);
							ctx.beginPath();
							ctx.rect(30, 240, 540, 50);
							ctx.fillStyle = '#3167e3';
							ctx.fill();

							ctx.drawImage(playImage, 20, 230, 70, 70);
							ctx.font = '18px Arial';
							ctx.fillStyle = 'white';
							ctx.fillText(durationText, 230, 270);
							images.push(canvas.toDataURL());
							ctx.clearRect(0, 0, canvas.width, canvas.height);
						});

						this.uploadProgress += 5;
						gifshot.createGIF(
							{
								images: images,
								numFrames: 30,
								gifWidth: canvas.width,
								gifHeight: canvas.height
							},
							async obj => {
								if (!obj.error) {
									this.videoMessageStatus = 'Uploading...';
									this.uploadProgress += 15;
									let timestamp = new Date().getTime();
									S3.upload(
										{
											Key: 'user-videos/' + this.$root.auth.id + '/' + timestamp + '/' + 'link_preview.gif',
											Body: this.dataURLtoFile(obj.image, 'link_preview.gif'),
											ACL: 'public-read',
											ContentType: 'image/gif'
										},
										async (err, d) => {
											if (!err && d) {
												this.uploadProgress += 20;
												resolve(d.Location);
											}
										}
									);
								} else {
									console.log(obj.error);
									reject(obj.error);
								}
							}
						);
					};
				})();
			});
		},

		dataURLtoFile(dataurl, filename) {
			var arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);

			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}

			return new File([u8arr], filename, { type: mime });
		},

		async updateVideoMessageSubmit(videoMessage) {
			this.videoMessageStatus = 'Processing...';
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.user_video_ids = data.userVideos.map(x => x.id);

			this.uploadProgress += 20;
			data.link_preview = await this.generateLinkPreview(data.userVideos[0].gif, this.totalDuration);
			data.initial_message = await this.generateInitialMessage(videoMessage);

			delete data.original_message;
			delete data.new_source;
			this.videoMessageStatus = 'Finalizing...';
			this.uploadProgress += 10;
			let response = await this.updateVideoMessage(data).catch(() => {});
			if (response) {
				let index = this.contact.videoMessages.findIndex(x => x.id == response.data.id);
				if (index > -1) {
					this.contact.videoMessages[index] = response.data;
				}
			}
			this.videoMessageStatus = null;
			this.addingVideoMessage = false;
			this.uploadProgress = 0;
			this.gifProgress = 0;
		},

		async generateInitialMessage(data) {
			return new Promise(resolve => {
				(async () => {
					if (data.initial_message.new_source) {
						if (data.initial_message.new_preview) {
							let preview = await S3.upload({
								Key: 'video-messages/' + this.$root.auth.id + '/' + data.uuid + '/' + 'initial_message_preview.png',
								Body: this.dataURLtoFile(data.initial_message.new_preview, 'initial_message_preview.png'),
								ACL: 'public-read',
								ContentType: 'image/png'
							})
								.promise()
								.catch(() => {});
							if (preview) {
								data.initial_message.preview = preview.Location;
								this.uploadProgress += 5;
							}
						}
						let source = await S3.upload({
							Key: 'video-messages/' + this.$root.auth.id + '/' + data.uuid + '/' + data.initial_message.filename,
							Body: data.initial_message.new_source,
							ACL: 'public-read'
						})
							.promise()
							.catch(() => {});
						if (source) {
							data.initial_message.source = source.Location;
							this.uploadProgress += 5;
						}
					} else {
						this.uploadProgress += 10;
					}
					if (this.$refs.newInitialMessage) {
						data.initial_message.message = this.$refs.newInitialMessage.innerText.trim();
					}
					resolve(data.initial_message);
				})();
			});
		},

		videoMessageAction(action, videoMessage) {
			if (action == 'Edit') {
				let data = JSON.parse(JSON.stringify(videoMessage));
				data.userVideos = data.videos.map(x => x.user_video);
				if (data.initial_message) {
					if (Array.isArray(data.initial_message)) {
						data.initial_message = {};
					}
					data.initial_message.original_message = data.initial_message.message;
				}
				this.videoMessage = data;
				this.addingVideoMessage = true;
			} else if (action == 'Delete') {
				this.videoMessage = videoMessage;
				this.$refs.deleteVideoMessageModal.show();
			}
		},

		async updateVideoMessageStatus(status, videoMessage) {
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.is_active = status;
			data.user_video_ids = data.videos.map(x => x.user_video_id);
			await this.updateVideoMessage(data);
		},

		async copyElementToClipboard(videoMessage) {
			let element = await this.stringToElement(videoMessage);
			document.body.appendChild(element);
			window.getSelection().removeAllRanges();
			let range = document.createRange();
			range.selectNode(element);
			window.getSelection().addRange(range);
			document.execCommand('copy');
			window.getSelection().removeAllRanges();
			element.remove();
		},

		stringToElement(videoMessage) {
			return new Promise(resolve => {
				const img = new Image();
				img.onload = () => {
					let ratio = 450 / img.width;
					let height = img.height * ratio;
					let timestamp = new Date().valueOf();

					let element = `<table> <tr> <td> <div style="width: 450px; max-width: 450px;  height:${height}px"><a style=" display: block; grid-row-start: 1;  background: #3167e3;  height: 100%; width: 100%; grid-column-start: 1; " href="${this.app_url}/video-messages/${videoMessage.uuid}" ><img style="width: 100%;  height: auto" src="${videoMessage.link_preview}?ts=${timestamp}"/></a></div></td></tr></table>`;
					let template = document.createElement('template');
					template.innerHTML = element;
					resolve(template.content.firstChild);
				};
				img.src = videoMessage.link_preview;
			});
		},

		shareVideoMessage(action, videoMessage) {
			switch (action) {
				case 'Copy video link':
					if (copy(`${process.env.MIX_APP_URL}/video-messages/${videoMessage.uuid}`)) {
						this.$toast.open('Video message link copied to clipboard.');
					}
					break;

				case 'Copy video for email':
					this.copyElementToClipboard(videoMessage);
					this.$toast.open('Video message email copied to clipboard.');
					break;
			}
		},

		openVideoMessage(videoMessage) {
			window.open(`${process.env.MIX_APP_URL}/video-messages/${videoMessage.uuid}`, '_blank');
		},

		dislikes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => !x.is_liked).length;
		},

		likes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => x.is_liked).length;
		},

		removeTag() {
			this.$nextTick(() => {
				this.updateContact(this.contact);
			});
		},

		addTag(newTag) {
			let exists = this.contact.tags.find(x => x == newTag);
			if (!exists) {
				this.tagOptions.push(newTag);
				this.contact.tags.push(newTag);
				this.updateContact(this.contact);
			}
		},

		toggleBlockStatus(state, block, contactPackage) {
			if (!contactPackage.service.completed) {
				this.$set(contactPackage.service, 'completed', []);
			}
			let index = contactPackage.service.completed.findIndex(x => x == block);
			if (state && index < 0) {
				contactPackage.service.completed.push(block);
			} else if (!state && index >= 0) {
				contactPackage.service.completed.splice(index, 1);
			}
			axios.put(`/contacts/${this.contact.id}/package`, { completed: contactPackage.service.completed, contact_package_id: contactPackage.id });
		},

		deleteContactPackage(contactPackage, index) {
			this.contact.contact_packages.splice(index, 1);
			axios.delete(`/contacts/${this.contact.id}/package`, { params: { package_id: contactPackage.id } });
		},

		async addPackageService() {
			this.addingPackage = false;
			let response = await axios.post(`/contacts/${this.contact.id}/package`, { package_id: this.selectedPackage.id, service: this.selectedPackageService });
			this.contact.contact_packages = this.contact.contact_packages.concat(response.data);
			this.selectedPackage = null;
			this.selectedPackageService = null;
		},

		newBookingStored(bookings) {
			if (this.packageService) {
				bookings.forEach(booking => {
					this.contact.contact_packages[this.contactPackageIndex].bookings.unshift(booking);
				});
			}
			bookings.forEach(booking => {
				this.contact.bookings.data.unshift(booking);
			});
		},

		createNewEvent() {
			this.newEvent = true;
			this.selectedBooking = { date: dayjs().format('YYYY-MM-DD'), start: '02:00', end: '03:00' };
		},

		bookPackage(contactPackage, contactPackageIndex) {
			this.newEvent = true;
			this.packageService = contactPackage.service;
			this.contactPackageIndex = contactPackageIndex;
			this.selectedBooking = { date: dayjs().format('YYYY-MM-DD'), start: '02:00', end: '03:00', contact_package_id: contactPackage.id };
		},

		bookingDeleted(booking) {
			let index = this.contact.bookings.data.findIndex(b => b.id == booking.id);
			if (index >= -1) {
				this.contact.bookings.data.splice(index, 1);
			}
		},

		bookingUpdated(booking) {
			if (booking.id == this.selectedBooking.id) {
				this.selectedBooking.date = dayjs(booking.date).format('YYYY-MM-DD');
				this.selectedBooking.start = booking.start;
				this.selectedBooking.end = booking.end;
				this.selectedBooking.notes = booking.notes;
			}
			this.selectedBooking = null;
		},

		bookingAction(action, booking) {
			switch (action) {
				case 'Edit':
					this.selectedBooking = booking;
					break;
				case 'Delete':
					break;
			}
		},

		noteAction(action, note) {
			switch (action) {
				case 'Edit':
					this.selectedNote = note;
					this.selectedNote.new_note = note.note;
					break;
				case 'Delete':
					this.deleteContactNote(note);
					break;

				case 'View Booking':
					this.selectedBooking = note.booking;
					break;
			}
		},

		async goToConversation() {
			let conversation = await this.storeConversation({ members: [this.contact.contact_user_id] });
			if (conversation) {
				this.$router.push(`/dashboard/conversations/${conversation.id}`);
			}
		},

		resetNewBooking() {
			this.newBooking = {
				service: null,
				service_id: null,
				date: new Date(),
				timeslot: null
			};
		},

		async addNewBooking() {
			if (this.newBooking.service_id && this.newBooking.date && this.newBooking.timeslot) {
				this.bookingModalLoading = true;
				let data = Object.assign({}, this.newBooking);
				data.start = this.newBooking.timeslot;
				data.contact_id = this.contact.id;
				data.date = dayjs(this.newBooking.date).format('YYYY-MM-DD');
				let booking = await this.storeBooking(data).catch(() => {});
				if (booking) {
					this.getContact();
					this.$refs['add'].hide();
				}
				this.bookingModalLoading = false;
			}
		},

		async getNewBookingServiceTimeslots() {
			if (this.newBooking.service_id && this.newBooking.date) {
				let response = await window.axios.get(`/services/${this.newBooking.service_id}?date=${dayjs(this.newBooking.date).format('YYYY-MM-DD')}&single=1`);
				this.newBooking.timeslot = null;
				this.timeslots = response.data;
			}
		},

		async confirmUpdateNote(contactNote) {
			let response = await window.axios.put(`/contact_notes/${contactNote.id}`, { note: contactNote.new_note });
			let index = this.contact.contactNotes.findIndex(x => x.id == contactNote.id);
			if (index > -1) {
				this.contact.contactNotes[index] = response.data;
			}
			this.selectedNote = null;
		},

		deleteContactNote(contactNote, index) {
			this.contact.contactNotes.splice(index, 1);
			window.axios.delete(`/contact_notes/${contactNote.id}`);
		},

		async confirmAddNote() {
			if (this.newNote) {
				let response = await window.axios.post('/contact_notes', { contact_id: this.contact.id, note: this.newNote });
				this.contact.contactNotes.unshift(response.data);
				this.addingNote = false;
				this.newNote = '';
			}
		},

		async confirmDeleteBooking(booking) {
			await this.deleteBooking(booking);
			this.getContact();
		},

		getServiceMembers(booking) {
			if (booking && booking.id) {
				let serviceMembers = [];
				if (booking.service.parent_service) {
					serviceMembers.push({
						text: this.$root.auth.full_name,
						value: booking.service.parent_service_id
					});
					booking.service.parent_service.assigned_services.forEach(assignedService => {
						serviceMembers.push({
							text: assignedService.coach.full_name,
							value: assignedService.id
						});
					});
				} else {
					serviceMembers.push({
						text: this.$root.auth.full_name,
						value: booking.service_id
					});
					booking.service.assigned_services.forEach(assignedService => {
						serviceMembers.push({
							text: assignedService.coach.full_name,
							value: assignedService.id
						});
					});
				}
				this.serviceMembers = serviceMembers;
			}
		},

		async updateSelectedBooking(selectedBooking) {
			this.bookingModalLoading = true;
			selectedBooking = JSON.parse(JSON.stringify(selectedBooking));
			selectedBooking.date = dayjs(selectedBooking.date).format('YYYY-MM-DD');
			selectedBooking.start = dayjs(selectedBooking.start).format('HH:mm');
			await this.updateBooking(selectedBooking).catch(() => {});
			this.bookingModalLoading = false;
			this.$refs['bookingModal'].hide();
			this.getContact();
		},

		async createZoomLink(booking) {
			this.createZoomLoading = true;
			if (this.$root.auth.zoom_token) {
				let response = await window.axios.get(`/zoom/create_meeting?booking_id=${booking.id}`);
				this.createZoomLoading = false;

				booking.zoom_link = response.data;
			}
		},

		editBooking(booking) {
			let selectedBooking = JSON.parse(JSON.stringify(booking));
			this.selectedBooking = selectedBooking;
			this.$refs['bookingModal'].show();
		},

		update() {
			this.updateContact(this.contact);
			this.$refs['editModal'].hide();
		},

		toggleContactServiceBlacklist(service) {
			let index = this.contact.blacklisted_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.contact.blacklisted_services.splice(index, 1);
			} else {
				this.contact.blacklisted_services.push(service.id);
			}
		},

		async getSelectedBookingNewTimeslots(booking, date) {
			let response = await window.axios.get(`/services/${booking.service.id}?date=${dayjs(date).format('YYYY-MM-DD')}&single=1`);
			this.timeslots = response.data;
		},

		formatDate(date) {
			return dayjs(date).format('MMM D, YYYY');
		},

		async filterBookings() {
			let serviceIds = this.selectedService ? [this.selectedService.id] : [];
			let response = await window.axios.get(`/contacts/${this.contact.id}?page=${this.contact.bookings.current_page}&services=${serviceIds}&order=${this.order}`);
			this.contact.bookings = response.data.bookings;
		},

		async getData(page) {
			let response = await window.axios.get(`/contacts/${this.contact.id}?page=${page}`);
			this.contact.bookings = response.data.bookings;
		},

		async getContact() {
			let response = await window.axios.get(`/contacts/${this.$route.params.id}`, { params: { page: this.page } });
			let contact = response.data;
			contact.upcoming_bookings.forEach(booking => {
				booking.startDate = dayjs(`${booking.date} ${booking.start}`).toDate();
			});
			this.contact = contact;
			let clonedContact = JSON.parse(JSON.stringify(response.data));
			this.clonedContact = clonedContact;
			this.$root.contentloading = false;
			this.getRecentNotes();
			this.getContactNotes();
			this.getVideoMessages();
		},

		async getVideoMessages() {
			if (this.contact) {
				let response = await window.axios.get(`/contacts/${this.contact.id}/video_messages`);
				this.$set(this.contact, 'videoMessages', response.data);
			}
		},

		async getContactNotes(order = 'desc') {
			if (this.contact) {
				let response = await window.axios.get(`/contacts/${this.contact.id}/contact_notes?order=${order}`);
				this.$set(this.contact, 'contactNotes', response.data);
			}
		},

		async getRecentNotes() {
			if (this.contact) {
				// let response = await window.axios.get(`/contacts/${this.contact.id}/recent_notes`);
				// this.recentNotes = response.data;
			}
		},

		resendEmail(contact) {
			this.resendLoading = true;
			window.axios.post(`/contacts/${contact.id}/resend`).then(() => {
				this.resendLoading = false;
				this.$refs['resendModal'].hide();
				this.$toasted.show('Invitation email has been sent successfully.');
			});
		},

		toggleServiceBlacklist(service) {
			let index = this.newContact.blacklisted_services.findIndex(x => x == service.id);
			if (index > -1) {
				this.newContact.blacklisted_services.splice(index, 1);
			} else {
				this.newContact.blacklisted_services.push(service.id);
			}
		},

		openFile(file) {
			if (file.type == 'file') this.$root.downloadMedia(file);
			else this.selectedFile = file;
		},

		resetNewContact() {
			this.newContact = {
				custom_fields: {},
				blacklisted_services: []
			};
		},

		addNewField() {
			if (this.new_field.name) {
				this.new_field.is_visible = false;
				this.contact.custom_fields.push(this.new_field);
				this.updateContact(this.contact);
				this.new_field = {};
				this.addField = false;
			}
			this.editFields = false;
		},

		updateCustomField(index) {
			this.$root.auth.custom_fields[index] = this.editCustomField;
			this.storeUserCustomFields();
			this.$refs['customFieldsLabel'].click();
		},

		store() {
			if (this.newContact.email) {
				this.storeContact(this.newContact).then(() => {
					this.newContact = {
						custom_fields: {},
						blacklisted_services: [],
						sendToEmail: 1
					};
				});
				this.infoTab = '';
			}
		}
	}
};
