import ChevronLeftIcon from '../../../../icons/chevron-left';
import { mapState, mapActions } from 'vuex';
import VueFormValidate from '../../../../components/vue-form-validate.vue';
import dayjs from 'dayjs';
const IsSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const IsSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);
import VueSelect from '../../../../components/vue-select/vue-select.vue';
import VueDropdown from '../../../../components/vue-dropdown/vue-dropdown.vue';
import MoreIcon from '../../../../icons/more';
import draggable from 'vuedraggable';
import MoveIcon from '../../../../icons/move';
import TrashIcon from '../../../../icons/trash';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
const format = require('format-duration');
import ShareIcon from '../../../../icons/share';
import EyeIcon from '../../../../icons/eye-solid';
import CogIcon from '../../../../icons/cog';
import ThumbupIcon from '../../../../icons/thumb-up';
import ThumbdownIcon from '../../../../icons/thumb-down';
import CommentIcon from '../../../../icons/comment-solid';
import PlusIcon from '../../../../icons/plus';
import ToggleSwitch from '../../../../components/toggle-switch/toggle-switch.vue';
import Modal from '../../../../components/modal/modal.vue';
import WarningIcon from '../../../../icons/warning';
import copy from 'copy-text-to-clipboard';
import AddVideoMessage from '../../video-messages/add.vue';
import Library from '../../video-messages/library.vue';
const AWS = window.AWS;
AWS.config.region = process.env.MIX_AWS_DEFAULT_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: process.env.MIX_AWS_IDENTITY_POOL
});
const S3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: process.env.MIX_AWS_BUCKET }
});
const gifshot = require('../../../../js/plugins/gifshot.min');
import { GifReader } from 'omggif';
const humanizeDuration = require('humanize-duration');
import { cover } from 'intrinsic-scale';

export default {
	components: { ChevronLeftIcon, VueFormValidate, VueSelect, VueDropdown, MoreIcon, draggable, MoveIcon, TrashIcon, Multiselect, ShareIcon, EyeIcon, CogIcon, ThumbdownIcon, ThumbupIcon, CommentIcon, PlusIcon, ToggleSwitch, Modal, WarningIcon, AddVideoMessage, Library },
	data: () => ({
		showLibrary: false,
		quickAdd: false,
		app_url: process.env.MIX_APP_URL,
		format: format,
		dayjs: dayjs,
		bookings: {
			data: []
		},
		rightTab: 'video_messages',
		member: null,
		videoMessageStatus: null,
		uploadProgress: 0,
		gifProgress: 0,
		addingVideoMessage: false,
		activeTab: 'notes',
		notes: [],
		addingNote: false,
		selectedNote: null,
		newNote: '',
		notesOrder: 'desc',
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
		linkedinUser: {
			custom_fields: [],
			tags: []
		},
		new_field: {},
		editFields: false,
		tagOptions: [],
		selectedService: null,
		videoMessages: [],
		videoMessage: {
			title: '',
			description: '',
			initial_message: {},
			service_id: null,
			contact_id: null,
			userVideos: []
		}
	}),

	computed: {
		...mapState({
			services: state => state.services.index,
			user_custom_fields: state => state.user_custom_fields.fields,
			linkedActivities: state => state.linkedin_activities.index
		}),

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
		linkedinUsers() {
			let linkedinUsers = [];
			this.linkedActivities.forEach(activity => {
				let actor = activity.data.actor;
				if (activity.data.resharedUpdate) {
					actor = activity.data.resharedUpdate.actor;
				}
				if (actor && !linkedinUsers.find(x => x.urn == actor.urn)) {
					linkedinUsers.push(actor);
				}
			});
			return linkedinUsers;
		},

		linkedinUsersOptions() {
			let linkedinUsersOptions = [];
			this.linkedinUsers.forEach(actor => {
				linkedinUsersOptions.push({
					text: actor.name.text,
					value: actor.urn
				});
			});
			return linkedinUsersOptions;
		}
	},

	created() {
		(async () => {
			await this.getLinkedinActivities();
			let actor = null;
			this.linkedActivities.forEach(activity => {
				let actorData = null;
				if (activity.data.actor && (activity.data.resharedUpdate || activity.data.header)) {
					actorData = activity.data.actor;
					if (activity.data.resharedUpdate) {
						actorData = activity.data.resharedUpdate.actor;
					}
				}
				if (actorData && actorData.urn == this.$route.params.memberID) {
					if (actorData.name.attributes && actorData.name.attributes.length && actorData.name.attributes[0].miniCompany) {
						actorData.description.text = activity.data.actor.description.text;
					}
					actor = actorData;
				}
			});
			if (!actor) {
				this.$router.replace('/dashboard/integrations/linkedin');
			} else {
				if (actor.name.attributes && actor.name.attributes.length) {
					let profile = actor.name.attributes[0].miniProfile || actor.name.attributes[0].miniCompany;
					if (profile && profile.picture && profile.picture['com.linkedin.common.VectorImage']) {
						let vectorImage = profile.picture['com.linkedin.common.VectorImage'];
						actor.profilePicture = vectorImage.rootUrl + vectorImage.artifacts[0].fileIdentifyingUrlPathSegment;
					}
				}
				this.member = actor;
				this.getContactNotes();
				this.getLinkedinUser();
				this.showUserCustomFields();
				this.getServices();
				this.getVideoMessages();
				this.getContacts({ nopaginate: true });
			}
		})();
	},

	methods: {
		...mapActions({
			getServices: 'services/index',
			getLinkedinActivities: 'linkedin_activities/index',
			showUserCustomFields: 'user_custom_fields/show',
			storeUserCustomFields: 'user_custom_fields/store',
			deleteVideoMessage: 'video_messages/delete',
			updateVideoMessage: 'video_messages/update',
			getContacts: 'contacts/index'
		}),

		setQuickAdd(videoMessage) {
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.userVideos = data.videos.map(x => x.user_video);
			this.videoMessage = data;
			this.showLibrary = true;
			this.quickAdd = true;
		},

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
			this.addingVideoMessage = false;
			if (!videoMessage.id) {
				return this.storeVideoMessageSubmit(videoMessage);
			}
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
				let index = this.videoMessages.findIndex(x => x.id == response.data.id);
				if (index > -1) {
					this.videoMessages[index] = response.data;
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

		async updateVideoMessageStatus(status, videoMessage) {
			let data = JSON.parse(JSON.stringify(videoMessage));
			data.is_active = status;
			data.user_video_ids = data.videos.map(x => x.user_video_id);
			await this.updateVideoMessage(data);
		},

		openVideoMessage(videoMessage) {
			window.open(`${process.env.MIX_APP_URL}/video-messages/${videoMessage.uuid}`, '_blank');
		},

		confirmDeleteVideoMessage() {
			if (this.videoMessage.id) {
				let index = this.videoMessages.findIndex(x => x.id == this.videoMessage.id);
				if (index > -1) {
					this.videoMessages.splice(index, 1);
				}
				this.deleteVideoMessage(this.videoMessage);
			}
			this.$refs.deleteVideoMessageModal.hide();
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

		dislikes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => !x.is_liked).length;
		},

		likes(videoMessage) {
			return videoMessage.video_message_likes.filter(x => x.is_liked).length;
		},

		async getVideoMessages() {
			if (this.member) {
				let response = await window.axios.get(`/contacts/${this.member.urn}/video_messages`);
				this.videoMessages = response.data;
			}
		},

		removeTag() {
			this.$nextTick(() => {
				this.updateLinkedinUser();
			});
		},

		addTag(newTag) {
			let exists = this.linkedinUser.tags.find(x => x == newTag);
			if (!exists) {
				this.tagOptions.push(newTag);
				this.linkedinUser.tags.push(newTag);
				this.updateLinkedinUser();
			}
		},

		addNewField() {
			if (this.new_field.name) {
				this.new_field.is_visible = false;
				this.linkedinUser.custom_fields.push(this.new_field);
				this.updateLinkedinUser();
				this.new_field = {};
				this.addField = false;
			}
			this.editFields = false;
		},

		updateLinkedinUser() {
			if (this.linkedinUser) {
				window.axios.put(`/linkedin_user/${this.linkedinUser.id}`, this.linkedinUser);
			}
		},

		async getLinkedinUser() {
			if (this.member) {
				let response = await window.axios.get(`/linkedin_user/${this.member.urn}`);
				this.linkedinUser = response.data;
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
			}
		},

		async confirmUpdateNote(contactNote) {
			let response = await window.axios.put(`/contact_notes/${contactNote.id}`, { note: contactNote.new_note });
			let index = this.notes.findIndex(x => x.id == contactNote.id);
			if (index > -1) {
				this.notes[index] = response.data;
			}
			this.selectedNote = null;
		},

		deleteContactNote(contactNote, index) {
			this.notes.splice(index, 1);
			window.axios.delete(`/contact_notes/${contactNote.id}`);
		},

		formatDate(date) {
			return dayjs(date).format('MMM D, YYYY');
		},

		async getContactNotes(order = 'desc') {
			if (this.member) {
				let response = await window.axios.get(`/contacts/${this.member.urn}/contact_notes?order=${order}`);
				this.notes = response.data;
			}
		},

		async confirmAddNote() {
			if (this.newNote) {
				let response = await window.axios.post('/contact_notes', { linkedin_user: this.member.urn, note: this.newNote });
				this.notes.unshift(response.data);
				this.addingNote = false;
				this.newNote = '';
			}
		}
	}
};
