<template>
	<div>
		<div v-if="data">
			<ul class="pagination shadow-sm mb-0 d-inline-flex">
				<li class="page-item" :class="{ disabled: !data.prev_page_url }" @click="goToPage(data.prev_page_url)">
					<span class="page-link cursor-pointer"><chevron-left-icon width="10" height="10" transform="scale(3.0)"></chevron-left-icon></span>
				</li>
				<li v-for="page in pages" :key="page" class="page-item" :class="{ active: page == data.current_page }" @click="change(page)">
					<span class="page-link cursor-pointer">{{ page }}</span>
				</li>
				<li class="page-item" :class="{ disabled: !data.next_page_url }" @click="goToPage(data.next_page_url)">
					<span class="page-link cursor-pointer"><chevron-right-icon width="10" height="10" transform="scale(3.0)"></chevron-right-icon></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script src="./paginate.js"></script>

<style lang="scss" scoped src="./paginate.scss"></style>
