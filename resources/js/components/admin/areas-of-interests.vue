<template>
	<div class="p-3">
		<div v-if="areasOfInterests.length > 0">
			<button class="btn btn-primary btn-sm mb-2" data-toggle="modal" data-target="#manageAreaModal" data-backdrop="static" data-keyboard="false" @click="resetArea()">Add</button>
			<div class="table-responsive rounded shadow-sm bg-white">
				<table class="table mb-0">
					<thead>
						<tr>
							<th class="border-0">Area</th>
							<th class="border-0">Sample Images</th>
							<th class="border-0">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="area in areasOfInterests">
							<td class="align-middle">{{ area.area }}</td>
							<td class="align-middle">
								<div class="sample-image sample-image-sm align-middle rounded" :style="{backgroundImage: 'url('+sample+')'}" v-for="sample in area.sample_images" data-toggle="modal" data-target="#sampleViewModal" @click="selectedSample = sample"></div>
							</td>
							<td class="align-middle" style="width: 100px">
								<button class="btn btn-sm btn-light btn-circle-icon" data-toggle="modal" data-target="#manageAreaModal" @click="setSelectedArea(area)"><icon name="pencil" transform="scale(1.5)" width="12" height="12"></icon></button>
								<button class="btn btn-sm btn-light btn-circle-icon" data-toggle="modal" data-target="#deleteAreaModal" @click="setSelectedArea(area)"><icon name="trash" transform="scale(1.5)" width="12" height="12"></icon></button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div v-else class="text-center position-absolute-center">
			<h5 class="font-weight-lighter text-muted mb-3">There are no areas of interests added</h5>
			<button class="btn btn-primary" data-toggle="modal" data-target="#manageAreaModal" data-backdrop="static" data-keyboard="false" @click="resetArea()">Add Area of Interest</button>
		</div>
		

		<div class="modal fade" tabindex="-1" role="dialog" id="deleteAreaModal">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<vue-form-validate @submit="deleteArea()" class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Delete Area of Interest</h5>
						<button type="button" :disabled="manageAreaLoading" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body pt-0">
						Are you sure to delete this item?
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal" :disabled="manageAreaLoading">Close</button>
						<vue-button type="submit" :loading="manageAreaLoading" button_class="btn btn-danger">Delete</vue-button>
					</div>
				</vue-form-validate>
			</div>
		</div>

		<div class="modal fade" tabindex="-1" role="dialog" id="manageAreaModal">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<vue-form-validate @submit="submit()" class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">{{ selectedArea.id ? 'Edit' : 'Add' }} Area of Interest</h5>
						<button type="button" :disabled="manageAreaLoading" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body pt-0">
						<div class="form-group">
							<label for="" class="form-label">Area</label>
							<input type="text" class="form-control" data-required placeholder="Area" v-model="selectedArea.area" />
						</div>
						<div class="form-group">
							<label for="" class="form-label">Sample Images</label>
							<div class="font-sizex-0">
								<div class="sample-image rounded position-relative hover-opacity-1" :style="{backgroundImage: 'url('+sample+')'}" v-for="(sample, index) in selectedArea.sample_images">
									<button type="button" class="btn btn-sm btn-white btn-circle-icon position-absolute-center opacity-0 fade" @click="selectedArea.sample_images.splice(index, 1)"><icon name="close"transform="scale(1.5)" width="12" height="12"></icon></button>
								</div>
								<div class="sample-image sample-image-new rounded position-relative" @click="browseImage">
									<icon name="plus" class="position-absolute-center"></icon>
								</div>
							</div>
							<input type="file" accept="image/*" ref="inputProfileImage" @change="updateImage" hidden />
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal" :disabled="manageAreaLoading">Close</button>
						<vue-button type="submit" :loading="manageAreaLoading" button_class="btn btn-primary">{{ selectedArea.id ? 'Update' : 'Add' }}</vue-button>
					</div>
				</vue-form-validate>
			</div>
		</div>

		<div class="modal fade" tabindex="-1" role="dialog" id="sampleViewModal">
		  	<div class="modal-dialog modal-dialog-centered" role="document">
			    <div class="modal-content bg-black">
			      	<div class="modal-header p-0">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          	<span aria-hidden="true">&times;</span>
				        </button>
			      	</div>
			      	<div class="modal-body p-0 rounded overflow-hidden" v-if="selectedSample">
			      		<img :src="selectedSample" class="w-100">
			      	</div>
			    </div>
		  	</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		areasOfInterests: [],
		selectedArea: {
			id: '',
			area: '',
			sample_images: []
		},
		selectedSample: null,
		manageAreaLoading: false
	}),

	computed: {},

	mounted() {},

	created() {
		this.$root.heading = 'Areas Of Interests';
		this.resetArea();
		this.getData();
	},

	methods: {
		deleteArea() {
			axios.delete(`/areas-of-interests/${this.selectedArea.id}`).then((response) => {
				$('#deleteAreaModal').modal('hide');
				let index = this.areasOfInterests.findIndex((x) => x.id == this.selectedArea.id);
				if (index > -1) {
					this.areasOfInterests.splice(index, 1);
				}
			});
		},

		setSelectedArea(area) {
			this.selectedArea = JSON.parse(JSON.stringify(area));
		},

		resetArea() {
			this.selectedArea.id = '';
			this.selectedArea.area = '';
			this.selectedArea.sample_images = [];
			this.manageAreaLoading = false;
		},

		browseImage() {
			this.$refs['inputProfileImage'].click();
		},

		updateImage(e) {
			let input = $(e.currentTarget);
			let file = input[0].files[0];
			if (file) {
				if (file.type.match('image/jpeg') || file.type.match('image/png')) {
					let photosize = file.size / 1000000;
					if (photosize > 5) {
						alert('Error: Image file too big. Please select image file less than 5MB.');
					} else {
						let img = document.createElement('img');
						let reader = new FileReader();
						reader.readAsDataURL(file);

						reader.onload = (oFREvent) => {
							let canvas = document.createElement('canvas');
							img.src = oFREvent.target.result;
							img.addEventListener('load', () => {
								let ctx = canvas.getContext('2d');
								ctx.drawImage(img, 0, 0);

								let width = img.width;
								let height = img.height;
								canvas.width = width;
								canvas.height = height;
								ctx = canvas.getContext('2d');
								ctx.drawImage(img, 0, 0, width, height);

								let dataurl = canvas.toDataURL('image/jpeg');
								this.selectedArea.sample_images.push(dataurl);
							});
						};
					}
				} else {
					alert('Error: Invalid image file!');
					input.val('');
				}
			}
		},

		async submit() {
			this.manageAreaLoading = true;
			if (this.selectedArea.id) {
				await this.update();
			} else {
				await this.store();
			}
			this.manageAreaLoading = false;
		},

		async store() {
			await axios.post('/areas-of-interests', this.selectedArea).then((response) => {
				$('#manageAreaModal').modal('hide');
				this.areasOfInterests.unshift(response.data);
			}).catch(() => {
				this.manageAreaLoading = false;
			});	
		},

		async update() {
			await axios.put(`/areas-of-interests/${this.selectedArea.id}`, this.selectedArea).then((response) => {
				$('#manageAreaModal').modal('hide');
				let index = this.areasOfInterests.findIndex((x) => x.id == response.data.id);
				if (index > -1) {
					this.areasOfInterests[index] = response.data;
				}
			}).catch(() => {
				this.manageAreaLoading = false;
			});	
		},

		getData() {
			axios.get('/areas-of-interests').then((response) => {
				this.areasOfInterests = response.data;
				this.$root.contentloading = false;
			});
		},
	},
};
</script>
