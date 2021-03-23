<template>
	<div class="">
		<emoji-picker @emoji="insert">
			<div class="emoji-invoker text-primary transition-colors hover:bg-gray-200 p-2 rounded-full" ref="emoji-invoker" slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
				<emoticon-icon class="fill-current"></emoticon-icon>
			</div>
			<div class="emoji-picker" slot="emoji-picker" slot-scope="{ emojis, insert }">
				<div>
					<div>
						<div v-for="(emojiGroup, category) in emojis" :key="category">
							<h5>{{ category }}</h5>
							<div class="emojis">
								<span v-for="(emoji, emojiName) in emojiGroup" :key="emojiName" @click="insert(emoji)" :title="emojiName">{{ emoji }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</emoji-picker>
	</div>
</template>

<script>
import EmoticonIcon from '../icons/emoticon';
import EmojiPicker from 'vue-emoji-picker';
export default {
	components: { EmojiPicker, EmoticonIcon },

	data: () => ({}),

	methods: {
		insert(emoji) {
			this.$refs['emoji-invoker'].click();
			this.$emit('select', emoji);
		}
	}
};
</script>

<style scoped lang="scss">
@import '../sass/variables';

.emoji-picker {
	@apply absolute shadow-md border border-gray-200;
	bottom: 60px;
	left: 20px;
	position: absolute;
	z-index: 1;
	width: 350px;
	height: 400px;
	overflow-y: scroll;
	padding: 1rem;
	box-sizing: border-box;
	border-radius: 0.5rem;
	background: #fff;
	text-align: left;
}
.emoji-picker__search {
	display: flex;
}
.emoji-picker__search > input {
	flex: 1;
	border-radius: 10rem;
	border: 1px solid #ccc;
	padding: 0.5rem 1rem;
	outline: none;
}
.emoji-picker h5 {
	margin-bottom: 0;
	color: #b1b1b1;
	text-transform: uppercase;
	font-size: 0.8rem;
	cursor: default;
}
.emoji-picker .emojis {
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	font-size: 24px;
}
.emoji-picker .emojis:after {
	content: '';
	flex: auto;
}
.emoji-picker .emojis span {
	padding: 0.2rem 0.1rem;
	cursor: pointer;
	border-radius: 5px;
}
.emoji-picker .emojis span:hover {
	background: #ececec;
	cursor: pointer;
}
</style>
