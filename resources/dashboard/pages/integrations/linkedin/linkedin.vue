<template>
	<div class="h-100" v-show="ready">
		<div class="content-header border-bottom lg:static fixed w-full bg-white z-20">
			<span class="ml-7 lg:ml-0 mt-2"> LinkedIn Recent Activities </span>
		</div>
		<div class="h-20 lg:hidden block" />

		<div v-if="activities.length == 0" class="absolute-center text-center w-full">No data available yet. Please come back later.</div>
		<div v-else class="page-integrations">
			<div class="mx-auto">
				<div class="flex flex-col md:flex-row justify-between items-center mt-4">
					<div class="flex items-center space-x-2">
						<!-- Custom DropDown -->
						<div class="w-11/12 md:w-1/4 ml-0 md:ml-7">
							<div class="relative">
								<button type="button" class="select" @click="show = !show" v-click-outside="() => (show = false)">
									<span class="text-sm text-muted">Choose Columns: </span>
									<div class="mr-2 text-sm whitespace-nowrap truncate text-muted capitalize">
										<span v-for="(column, i) in handleDisplayEnabledColumns()" :key="i">
											{{ column ? `&nbsp;${column}, ` : '' }}
										</span>
									</div>
									<div class="ml-auto line-height-0 text-gray-400">
										<chevron-down-icon class="fill-current" width="10" height="10"></chevron-down-icon>
									</div>
								</button>

								<div v-show="menuOpen" class="select-menu w-full" :class="[{ open: open }, 'bottom']">
									<div class="py-1 flex flex-col overflow-hidden" role="menu">
										<div class="overflow-auto h-full" ref="selectMenu">
											<template v-if="columnList.length > 0">
												<div v-for="(column, index) in columnList" :key="index" class="select-item overflow-hidden truncate flex items-center justify-between">
													<span class="capitalize block text-gray-400">{{ column.name }}</span>
													<div class="flex items-center">
														<span class="capitalize block">Enabled</span>
														<div class="flex items-center justify-center w-full ml-2">
															<label :for="column.name" class="flex items-center cursor-pointer">
																<div class="relative">
																	<input type="checkbox" :checked="column.isEnabled" class="toggle-input sr-only" :id="column.name" @change="handleIsEnabledColumn(column.name, column.isEnabled)" />
																	<div class="toggle-bg block bg-gray-300 w-14 h-6 rounded-full"></div>
																	<div class="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
																</div>
															</label>
														</div>
													</div>
												</div>
											</template>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- Custom DropDown -->

						<div>
							<div class="relative" v-click-outside="() => (filterShow = false)">
								<button type="button" class="select" @click="filterShow = !filterShow">
									<span class="text-sm text-muted">Filter by activity: </span>
									<div class="ml-auto line-height-0 text-gray-400">
										<chevron-down-icon class="fill-current" width="10" height="10"></chevron-down-icon>
									</div>
								</button>

								<div v-show="filterShow" class="select-menu w-auto" :class="[{ open: filterShow }, 'bottom']">
									<div class="py-1 flex flex-col overflow-hidden" role="menu">
										<div class="px-3 py-1 overflow-hidden truncate flex items-center justify-between text-sm justify-between space-x-1">Liked post <input type="text" @keydown="numbersOnly" v-model="filters.liked" class="w-12 px-2 py-1.5" /></div>
										<div class="px-3 py-1 overflow-hidden truncate flex items-center justify-between text-sm justify-between space-x-1">Commented on post <input type="text" @keydown="numbersOnly" v-model="filters.commented" class="w-12 px-2 py-1.5 ml-2" /></div>
										<div class="px-3 py-1 overflow-hidden truncate flex items-center justify-between text-sm justify-between space-x-1">Shared post <input type="text" @keydown="numbersOnly" v-model="filters.shared" class="w-12 px-2 py-1.5 ml-2" /></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="w-11/12 md:w-1/4 mr-0 mt-4 md:mt-0 md:mr-7 relative">
						<input class="pr-9" type="text" v-model="searchInList" placeholder="Search by name or title..." />
						<span class="absolute right-2 top-2">
							<SearchIcon />
						</span>
					</div>
				</div>

				<div class="h-full pt-16 pb-8 px-4 md:px-7">
					<div class="overflow-x-scroll w-full h-full pb-8">
						<table class="table-auto w-full">
							<thead class="mb-8">
								<tr class="whitespace-nowrap">
									<template v-for="(column, i) in columnList">
										<th :key="i" v-if="column.isEnabled" class="pr-2 font-normal text-gray-400 text-sm uppercase" :class="[i >= 2 ? 'text-center' : 'text-left']">
											<div class="w-auto inline-block">
												{{ column.name }}
											</div>
										</th>
									</template>
									<!-- <th class="w-50 block cursor-pointer flex items-center justify-center" @click="isShrink = !isShrink">
										<template v-if="isShrink"><ExpandIcon /></template>
										<template v-else><CompressIcon /></template>
									</th> -->
									<th></th>
								</tr>
							</thead>
							<paginate tag="tbody" name="linkedin" :list="activities" :per="10" ref="paginate">
								<template v-for="item in paginated('linkedin')">
									<tr v-if="inQuery(item)" class="border-b hover:bg-gray-100" :key="item.id" :data-id="item.id">
										<td v-if="columnList[0].isEnabled" class="text-sm py-3">
											<div class="w-250">
												<p class="truncate text-primary cursor-pointer hover:underline font-bold text-md" @click="goToMember(item)">
													{{ item.data.author.name }}
												</p>
												<p class="text-gray-400 truncate text-xs">{{ item.data.author_details.headline }}</p>
											</div>
										</td>
										<td v-if="columnList[1].isEnabled" class="text-sm pr-2 py-3">
											<p class="truncate">
												{{ activityLabel(item.data.type) }}
											</p>
										</td>

										<td v-if="columnList[2].isEnabled" class="text-sm py-3 text-center">
											<span v-if="item.label" class="rounded leading-none px-2 py-1 text-xs" :style="{ backgroundColor: item.label.color, color: item.label.text_color }">
												{{ item.label.label }}
											</span>
										</td>
										<!-- <td v-if="columnList[3].isEnabled" class="text-sm py-3 text-center">{{ item.connected ? 'Yes' : 'No' }}</td> -->
										<td v-if="columnList[3].isEnabled" class="text-sm py-3 text-center">{{ item.likedPost }}</td>
										<td v-if="columnList[4].isEnabled" class="text-sm py-3 text-center">{{ item.commentPost }}</td>
										<td v-if="columnList[5].isEnabled" class="text-sm py-3 text-center">{{ item.sharedPost }}</td>
										<!-- <td v-if="columnList[7].isEnabled" class="text-sm py-3 text-center">{{ item.mutualConnections }}</td> -->
										<td v-if="columnList[6].isEnabled" class="relative hover-trigger text-center">
											<a target="_blank" :href="item.linkedinProfile" class="inline-block">
												<LinkedinIcon />
												<div class="text-sm absolute text-left bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black w-300 hover-target z-10">
													{{ item.data.author.username }}
												</div>
											</a>
										</td>

										<td v-if="columnList[7].isEnabled" class="text-center text-sm relative hover-trigger">
											<a target="_blank" class="inline-block" :href="`https://www.linkedin.com/in/${item.data.author.username}/recent-activity`">
												<HistoryIcon />
											</a>
										</td>
										<!-- <td v-if="columnList[13].isEnabled" class="text-sm px-2" :class="{ 'w-50': isShrink, 'w-200': !isShrink }">{{ item.mutualConnections }}</td> -->

										<td class="px-2 text-sm relative hover-trigger">
											<div class="inline cursor-pointer" :class="{ 'w-50': isShrink, 'w-200': !isShrink }">
												<GearIcon />
											</div>
											<div @click="handleLabelSectionByLabel(item)" class="text-sm absolute right-2 w-32 top-11 bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black hover-target z-10 cursor-pointer">Choose Label</div>
										</td>
									</tr>
								</template>
							</paginate>
						</table>
					</div>
				</div>

				<div class="ml-7 mb-10">
					<paginate-links
						:step-links="{
							next: 'Next',
							prev: 'Previous'
						}"
						:key="activities.length"
						:async="true"
						for="linkedin"
						:show-step-links="true"
					></paginate-links>
				</div>
			</div>
		</div>

		<Modal ref="labelSettingModal" class="labelSettingModal" size="sm">
			<h2 class="font-bold font-serif">CHOOSE LABEL</h2>
			<div v-for="(label, i) in labels" :key="i" class="mt-4 flex justify-between items-center cursor-pointer" @click="setMemberLabel(label)">
				<p class="rounded-md py-1 px-4 font-semibold text-sm inline tracking-wide uppercase" :style="{ color: label.text_color, backgroundColor: label.color }">
					{{ label.label }}
				</p>
				<span v-if="selectedActivity && selectedActivity.tempLabel && label.label === selectedActivity.tempLabel.label">
					<CheckSolidIcon />
				</span>
			</div>
			<div class="mt-4 flex justify-between items-center">
				<div class="flex items-center">
					<input type="text" v-model="customLabel" placeholder="CUSTOM LABEL" />
					<Swatches class="ml-4" v-model="customBackgroundColor" popover-x="right" swatches="text-advanced" shapes="circles" />
				</div>
				<span class="cursor-pointer" @click="handleAddLabel()"><PlusSolidIcon /></span>
			</div>
			<div class="mt-20">
				<button class="btn btn-md btn-outline-primary w-full" type="button" @click="updateMemberLabel()"><span>Save</span></button>
			</div>
		</Modal>
	</div>
</template>

<script src="./linkedin.js"></script>

<style lang="scss" scoped src="./linkedin.scss"></style>
