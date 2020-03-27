<template>
	<div>
		dsd
	</div>
</template>

<script>
import InstagramSearch from './instagram-search';
export default {
	components: {InstagramSearch},
	methods: {
        selectIGImage(igImage) {
            let exists = this.enquiry.items.find((x) => x.url == igImage.url);
            if (!exists) {
                this.enquiry.items.push(igImage);
                this.$refs['instagramSearch'].open = false;
            }
        },
	}
};
</script>
