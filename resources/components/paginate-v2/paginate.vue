<template>
	<div>
		<div v-if="total_items > 0">
			<ul class="pagination items-center">
				<li class="page-item mr-3" :class="{ disabled: pageInput ===1 }" @click="goToPage('previous')">
					<span class="page-link cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</span>
				</li>
				<li class="page-item mx-1 paginate">
					<input type="text" class="paginate-input" v-model="pageInput" v-on:keyup.enter="change(pageInput)" />
				</li>
				<li class="page-item mx-3 disabled">
					<span class="page-link">of</span>
				</li>
				<li @click="change(last_page)">
					<span class="page-number cursor-pointer" :class="{ active: last_page == pageInput }">{{ last_page }}</span>
				</li>
				<li class="page-item ml-3" :class="{ disabled: pageInput === last_page }" @click="goToPage('next')">
					<span class="page-link cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script src="./paginate.js"></script>

<style lang="scss" scoped src="./paginate.scss"></style>
