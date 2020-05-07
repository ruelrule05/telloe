<template>
	<Component :is="name" :stroke-width="strokeWidth" :stroke="stroke"></Component>
</template>

<script>
import Briefcase from './briefcase.vue';
import Persona from './persona.vue';
import Chat from './chat.vue';
import Clock from './clock.vue';
import User from './user.vue';
import ExclamationCircle from './exclamation-circle.vue';
import Flag from './flag.vue';
import Sync from './sync.vue';
import CheckmarkCircle from './checkmark-circle.vue';
import Close from './close.vue';
import ArrowLeft from './arrow-left.vue';
import MoreV from './more-v.vue';
import Search from './search.vue';
import ArrowDown from './arrow-down.vue';
import ArrowRight from './arrow-right.vue';
import AttachDocument from './attach-document.vue';
import ChevronDown from './chevron-down.vue';
import ChevronLeft from './chevron-left.vue';
import ChevronRight from './chevron-right.vue';
import Checkmark from './checkmark.vue';
import Pencil from './pencil.vue';
import Bookmark from './bookmark.vue';
import At from './at.vue';
import Comment from './comment.vue';
import Trash from './trash.vue';
import Plus from './plus.vue';
import Camera from './camera.vue';

export default {
	props: {
		name: {
			required: true,
			type: String,
		},
		stroke: {
			type: String,
			default: 'black',
		},
		strokeWidth: {
			type: Number,
			default: 0,
		},
	},
	components: {
		Briefcase,
		Persona,
		Chat,
		Clock,
		User,
		ExclamationCircle,
		Flag,
		Sync,
		CheckmarkCircle,
		Close,
		ArrowLeft,
		MoreV,
		Search,
		ArrowDown,
		ArrowRight,
		AttachDocument,
		ChevronDown,
		ChevronRight,
		ChevronLeft,
		Checkmark,
		Pencil,
		Bookmark,
		At,
		Comment,
		Trash,
		Plus,
		Camera
	},
};
</script>
