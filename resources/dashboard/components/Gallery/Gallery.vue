<template>
	<div id="gallery" class="position-fixed d-flex flex-nowrap flex-column" :class="{ open: open }">
		<button type="button" class="absolute top-3 right-3 z-50" @click="close">
			<close-icon width="25" height="25" fill="white"></close-icon>
		</button>

		<div v-if="file" class="flex-grow flex text-center overflow-hidden">
			<div>
				<div class="px-5 relative file-arrow h-2/3 mt-24 cursor-pointer" :class="{ disabled: !hasPrev }" @click="goToPrev()">
					<chevron-left-icon width="90" height="90" fill="white" class="absolute-center"></chevron-left-icon>
				</div>
			</div>
			<div class="flex-grow relative">
				<template v-if="fileExtension == 'svg'">
					<img :src="svg" class="absolute-center" />
				</template>
				<div v-else>
					<template v-if="file.type == 'image'">
						<div v-if="!file.loaded" class="absolute-center w-full h-full image-loader">
							<div class="absolute-center"><div class="spinner spinner-sm spinner-light"></div></div>
						</div>
						<v-lazy-image :src="file.source" class="absolute-center" :class="{ 'opacity-0': !file.loaded }" @load="imageLoaded(file)" />
					</template>
					<video controls controlsList="nodownload" disablePictureInPicture v-else-if="file.type == 'video'" :poster="file.preview" :src="file.source" class="absolute-center outline-none mw-full h-full "></video>
					<waveplayer v-else-if="file.type == 'audio'" :source="file.source" :duration="file.metadata.duration" class="absolute-center bg-primary p-1 rounded text-white"></waveplayer>
				</div>
			</div>
			<div>
				<div class="px-5 relative file-arrow h-2/3 mt-24 cursor-pointer" :class="{ disabled: !hasNext }" @click="goToNext()">
					<chevron-right-icon width="90" height="90" fill="white" class="absolute-center"></chevron-right-icon>
				</div>
			</div>
		</div>

		<div class="p-2 border-top overflow-hidden">
			<div class="overflow-auto w-full text-center">
				<div class="inline-flex max-w-full">
					<div v-for="(m, mediaIndex) in media" :key="mediaIndex" class="preview mx-1 cursor-pointer bg-gray-100 relative" :class="{ active: (file || {}).id == m.id }" :style="{ 'background-image': 'url(' + m.preview + ')' }" @click="$parent.selectedFile = m">
						<volume-mid-icon v-if="m.type == 'audio'" width="32" height="32" class="absolute-center"></volume-mid-icon>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./Gallery.js"></script>
<style scoped lang="scss" src="./Gallery.scss"></style>
