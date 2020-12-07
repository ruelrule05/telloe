<template>
	<div id="knowledgebase">
		<div v-if="!open" class="bg-white badge-pill p-1 line-height-0" role="button" @click="open = true">
			<book-icon></book-icon>
		</div>
		<div v-else class="rounded bg-white p-3 knowledgebase-body d-flex flex-column">
			<div>
				<h5 class="font-heading mb-2">
					Knowledgebase Portal
				</h5>
				<button class="btn btn-sm btn-white badge-pill line-height-0 p-0 ml-aut shadow-none btn-close" type="button" @click="open = false">
					<close-icon></close-icon>
				</button>
				<input type="text" class="form-control shadow-none border" placeholder="Search for topics..." v-model="search" v-debounce:400ms="getTopics" />
			</div>
			<div class="flex-grow-1 position-relative">
				<div v-if="loading" class="position-absolute-center">
					<div class="spinner-border spinner-border-sm text-primary"></div>
				</div>
				<a v-else-if="topics.length > 0" v-for="(topic, topicIndex) in topics" :key="topicIndex" class="d-block pt-3 topic" target="_blank" :href="topic.link">
					<div class="d-flex align-items-center">
						<h6 class="font-heading mb-0 text-ellipsis mr-1">{{ topic.title.rendered }}</h6>
						<div class="flex-1 line-height-0">
							<shortcut-icon width="14" height="14" class="fill-primary"></shortcut-icon>
						</div>
					</div>
					<p class="text-ellipsis mb-0 text-muted small">{{ stripTags(topic.excerpt.rendered) }}</p>
				</a>
				<div v-else class="position-absolute-center text-muted">No topics found.</div>
			</div>
		</div>
	</div>
</template>

<script src="./knowledge-base.js"></script>

<style lang="scss" scopeds src="./knowledge-base.scss"></style>
