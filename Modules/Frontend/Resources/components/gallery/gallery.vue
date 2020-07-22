<template>
	<div id="gallery" class="position-fixed d-flex flex-nowrap flex-column" :class="{'open': open}">
        <button type="button" class="btn btn-transparent position-absolute p-0" @click="close" style="top: 0; right: 0; z-index: 10">
        	<close-icon width="48" height="48" fill="white"></close-icon>
        </button>

        <div v-if="file" class="flex-grow-1 flex-1 d-flex text-center overflow-auto">
            <div class="px-5 position-relative file-arrow cursor-pointer" :class="{'disabled': !hasPrev}" @click="goToPrev()">
                <chevron-left-icon width="48" height="48" transform="scale(1.2)" fill="white" class="position-absolute-center"></chevron-left-icon>
            </div>
            <div class="flex-grow-1 position-relative">
                <img v-if="file.type =='image'" :src="file.source" class="position-absolute-center">
                <video controls v-else-if="file.type =='video'" :poster="file.preview" :src="file.source" class="position-absolute-center outline-0 mw-100 mh-100"></video>
                <waveplayer v-else-if="file.type =='audio'" :source="file.source" :duration="file.metadata.duration" class="position-absolute-center bg-white p-1 rounded"></waveplayer>
            </div>
            <div class="px-5 position-relative file-arrow cursor-pointer" :class="{'disabled': !hasNext}" @click="goToNext()">
                <chevron-right-icon width="48" height="48" transform="scale(1.2)" fill="white" class="position-absolute-center"></chevron-right-icon>
            </div>
        </div>

        <div class="p-2 border-top overflow-hidden">
            <div class="overflow-auto w-100 text-center">
                <div class="d-inline-flex mw-100">
                    <div v-for="m in media" class="preview mx-1 cursor-pointer bg-light position-relative" :class="{'active': (file || {}).id == m.id}" :style="{'background-image': 'url('+m.preview+')'}" @click="$parent.selectedFile = m">
                        <volume-mid-icon v-if="m.type == 'audio'" width="32" height="32" class="position-absolute-center"></volume-mid-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./gallery.js"></script>
<style scoped lang="scss" src="./gallery.scss"></style>