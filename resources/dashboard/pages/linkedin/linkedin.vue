<template>
	<div class="h-100">
		<div class="content-header border-bottom lg:static fixed w-full bg-white z-20">
			<span class="ml-7 lg:ml-0 mt-2">
				Linkedin
			</span>
      <div class="ml-auto">
        <button
          type="button"
          class="btn btn-md btn-primary flex items-center justify-center"
        >
          <span>Filter</span>
        </button>
      </div>
		</div>
		<div class="h-20 lg:hidden block" />
		<div class="page-integrations">
			<div class="mx-auto">
				<div class="h-full pt-16 pb-8 px-7">
          <div class="overflow-x-scroll w-full h-full">
            <table class="table-auto hover:table-fixed">
              <thead class="mb-8 block">
                <tr class="flex">
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">FIRST</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">LAST</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">TITLE</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">LABEL</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">MY LAST ACTIVITY</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">DATE</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">CONNECTED</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">1ST ACTIVITY</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">CONNECTED</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">LIKED POST</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">COMMENT ON POST</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">LIKED COMMENT</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">COMMENT POST LIKED</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">MUTUAL CONNECTIONS</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">LINKEDIN PROFILE</th>
                  <th class="w-200 block font-normal text-left text-gray-400 text-sm tracking-wider">RECENT ACTIVITY</th>
                  <th class="w-100 block"></th>
                </tr>
              </thead>
              <paginate tag="tbody" name="linkedin" :list="linkedinList" :per="10" ref="paginate">
                <template v-for="item in paginated('linkedin')">
                  <tr class="flex border-b py-4 hover:bg-gray-100" :key="item.id">
                    <td class="w-200 text-sm">{{ item.first }}</td>
                    <td class="w-200 text-sm">{{ item.last }}</td>
                    <td class="w-200 text-sm text-gray-400 relative hover-trigger">
                      {{ truncatedWords(item.title, 15)}}
                      <div class="absolute bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black w-300 hover-target z-10">
                        {{ item.title }}
                      </div>
                    </td>
                    <td class="w-200 text-sm">
                      <p 
                        class="rounded-md py-1 px-4 text-sm inline tracking-wide" 
                        :class="item.label === 'CUSTOMER' ? 'bg-green-400 text-white' : 'bg-orange-400 text-black'"
                      >
                        {{ item.label }}
                      </p>
                    </td>
                    <td class="w-200 text-sm">{{ item.lastActivity }}</td>
                    <td class="w-200 text-sm">{{ item.date }}</td>
                    <td class="w-200 text-sm">{{ item.isConnected }}</td>
                    <td class="w-200 text-sm">{{ item.firstActivity }}</td>
                    <td class="w-200 text-sm">{{ item.dateConnected }}</td>
                    <td class="w-200 text-sm">{{ item.likedPost }}</td>
                    <td class="w-200 text-sm">{{ item.commentOnPost }}</td>
                    <td class="w-200 text-sm">{{ item.likedComment }}</td>
                    <td class="w-200 text-sm">{{ item.commentPostLiked }}</td>
                    <td class="w-200 text-sm">{{ item.mutualConnections }}</td>
                    <td class="w-200 relative hover-trigger inline">
                      <LinkedinIcon/>
                      <div class="text-sm absolute bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black w-300 hover-target z-10">
                        {{ item.linkedinProfile }}
                      </div>
                    </td>
                    <td class="w-200 text-sm relative hover-trigger">
                      <HistoryIcon/>
                      <div class="text-sm absolute bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black w-300 hover-target z-10">
                        {{ item.recentActivity }}
                      </div>
                    </td>
                    <td class="w-200 text-sm relative hover-trigger">
                      <GearIcon/>
                      <div class="text-sm absolute bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black hover-target z-10">
                        Choose Label
                      </div>
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
            :key="linkedinList.length"
            :async="true"
            for="linkedin"
            :show-step-links="true"
          ></paginate-links>
        </div>
			</div>
		</div>
	</div>
</template>

<script src="./linkedin.js"></script>

<style lang="scss" scoped src="./linkedin.scss"></style>
