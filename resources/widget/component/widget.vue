<template>
	<div id="widget" v-cloak>
		<button class="telloe-widget-btn" :class="{ hidden: open }" type="button" @click="open = !open"><img :src="`${$root.endpoint}/logo.svg`" height="20" />Book</button>

		<transition name="fade">
			<div v-if="open">
				<div class="telloe-widget-close">
					<button type="button" @click="open = false"><CloseIcon></CloseIcon></button>
				</div>
				<div class="widget-body">
					<iframe v-if="source" :src="source"></iframe>
				</div>
				<!-- <div class="telloe-by">
					<span>Powered by</span>&nbsp;<a :href="$root.endpoint" target="_blank"><img :src="`${$root.endpoint}/logo.svg`" height="13"/></a>
				</div> -->
			</div>
		</transition>
	</div>
</template>

<script src="./widget.js"></script>
<style scoped lang="scss" src="./widget.scss"></style>
