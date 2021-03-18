<template>
	<div>
		<div class="flex h-screen overflow-hidden flex-col">
			<div>
				<div class="content-header border-bottom">
					MESSAGES
					<div class="ml-auto">
						<button type="button" class="btn btn-md btn-outline-primary">
							<span>NEW CONVERSATION</span>
						</button>
					</div>
				</div>
			</div>
			<div class="flex-grow flex h-full overflow-hidden">
				<div class="border-right overflow-hidden h-full">
					<index></index>
				</div>
				<div class="flex-grow overflow-hidden h-full">
					<show @ready="showReady()"></show>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./conversations.js"></script>

<style lang="scss" src="./conversations.scss"></style>
