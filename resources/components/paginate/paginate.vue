<template>
	<div>
		<div v-if="data">
			<ul class="pagination">
				<li class="page-item mr-3" :class="{ disabled: !data.prev_page_url }" @click="goToPage(data.prev_page_url)">
					<span class="page-link cursor-pointer">Previous</span>
				</li>
				<li v-for="page in pages" :key="page" @click="change(page)">
					<span class="page-number cursor-pointer" :class="{ active: page == data.current_page }">{{ page }}</span>
				</li>
				<li class="page-item ml-3" :class="{ disabled: !data.next_page_url }" @click="goToPage(data.next_page_url)">
					<span class="page-link cursor-pointer">Next</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script src="./paginate.js"></script>

<style lang="scss" scoped src="./paginate.scss"></style>
