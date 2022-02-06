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
        
        <div class="flex flex-col md:flex-row justify-between items-center mt-4">
          <!-- Custom DropDown -->
          <div class="w-11/12 md:w-1/4 ml-0 md:ml-7">
            <div class="relative">
              <button type="button" class="select" @click="show = !show" v-click-outside="onBlur">
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
                      <div 
                        v-for="(column, index) in columnList" 
                        :key="index" 
                        class="select-item overflow-hidden truncate flex items-center justify-between"
                      >
                        <span class="capitalize block text-gray-400">{{ column.name }}</span>
                        <div class="flex items-center">
                          <span class="capitalize block">Enabled</span>
                          <div class="flex items-center justify-center w-full ml-2">
                            <label :for="column.name" class="flex items-center cursor-pointer">
                              <div class="relative">
                                <input 
                                  type="checkbox" 
                                  :checked="column.isEnabled" 
                                  class="toggle-input sr-only" 
                                  :id="column.name"
                                  @change="handleIsEnabledColumn(column.name, column.isEnabled)"
                                >
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

          <div class="w-11/12 md:w-1/4 mr-0 mt-4 md:mt-0 md:mr-7 relative">
            <input class="pr-9" type="text" v-model="searchInList" placeholder="Search by name or title...">
            <span class="absolute right-2 top-2">
              <SearchIcon/>
            </span>
          </div>
        </div>

				<div class="h-full pt-16 pb-8 px-4 md:px-7">
          <div class="overflow-x-scroll w-full h-full pb-8">
            <table class="table-auto hover:table-fixed">
              <thead class="mb-8 block">
                <tr class="flex">
                  <template v-for="(column, i) in columnList">
                    <th 
                      :key='i' 
                      v-if="column.isEnabled" 
                      class="w-200 px-2 block font-normal text-left text-gray-400 text-sm tracking-wider uppercase"
                    >
                      {{ column.name }}
                    </th>
                  </template>
                  <th class="w-100 block"></th>
                </tr>
              </thead>
              <paginate tag="tbody" name="linkedin" :list="dummyLinkedinList" :per="10" ref="paginate">
                <template v-for="item in paginated('linkedin')">
                  <tr class="flex border-b py-4 hover:bg-gray-100" :key="item.id">
                    <td v-if="columnList[0].isEnabled" class="w-200 text-sm px-2">{{ item.first }}</td>
                    <td v-if="columnList[1].isEnabled" class="w-200 text-sm px-2">{{ item.last }}</td>
                    <td v-if="columnList[2].isEnabled" class="w-200 text-sm px-2 text-gray-400 relative hover-trigger">
                      <p class="truncate">{{ item.title }}</p>
                      <div class="absolute bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black w-300 hover-target z-10">
                        {{ item.title }}
                      </div>
                    </td>
                    <td v-if="columnList[3].isEnabled" class="w-200 text-sm px-2">
                      <p 
                        class="rounded-md py-1 px-4 text-sm inline tracking-wide font-semibold uppercase" 
                        :style="{color: getLabelStyles(item.label, 'text'), backgroundColor: getLabelStyles(item.label, 'bg')}"
                      >
                        {{ item.label }}
                      </p>
                    </td>
                    <td v-if="columnList[4].isEnabled" class="w-200 text-sm px-2">{{ item.lastActivity }}</td>
                    <td v-if="columnList[5].isEnabled" class="w-200 text-sm px-2">{{ item.date }}</td>
                    <td v-if="columnList[6].isEnabled" class="w-200 text-sm px-2">{{ item.isConnected }}</td>
                    <td v-if="columnList[7].isEnabled" class="w-200 text-sm px-2">{{ item.firstActivity }}</td>
                    <td v-if="columnList[8].isEnabled" class="w-200 text-sm px-2">{{ item.connectedDate }}</td>
                    <td v-if="columnList[9].isEnabled" class="w-200 text-sm px-2">{{ item.likedPost }}</td>
                    <td v-if="columnList[10].isEnabled" class="w-200 text-sm px-2">{{ item.commentOnPost }}</td>
                    <td v-if="columnList[11].isEnabled" class="w-200 text-sm px-2">{{ item.likedComment }}</td>
                    <td v-if="columnList[12].isEnabled" class="w-200 text-sm px-2">{{ item.commentPostLiked }}</td>
                    <td v-if="columnList[13].isEnabled" class="w-200 text-sm px-2">{{ item.mutualConnections }}</td>
                    <td v-if="columnList[14].isEnabled" class="w-200 px-2 relative hover-trigger inline">
                      <LinkedinIcon/>
                      <div class="text-sm absolute bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black w-300 hover-target z-10">
                        {{ item.linkedinProfile }}
                      </div>
                    </td>
                    <td v-if="columnList[15].isEnabled" class="w-200 px-2 text-sm relative hover-trigger">
                      <HistoryIcon/>
                      <div class="text-sm absolute bg-white py-2 px-3 rounded-lg shadow-lg shadow-black text-black w-300 hover-target z-10">
                        {{ item.recentActivity }}
                      </div>
                    </td>
                    <td class="w-200 px-2 text-sm relative hover-trigger">
                      <div class="inline" @click="handleLabelSectionByLabel(item.label, item.id)">
                        <GearIcon/>
                      </div>
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
            :key="dummyLinkedinList.length"
            :async="true"
            for="linkedin"
            :show-step-links="true"
          ></paginate-links>
        </div>
			</div>
		</div>

    <Modal ref="labelSettingModal" class="labelSettingModal" size="sm">
			<h2 class="font-bold font-serif">CHOOSE LABEL</h2>
      <div 
        v-for="(label, i) in labelList" 
        :key="i" 
        class="mt-4 flex justify-between items-center cursor-pointer"
        @click="handleSelectedLabelFromModal(label, selectedLabel.id)"
      >
        <p 
          class="rounded-md py-1 px-4 font-semibold text-sm inline tracking-wide uppercase" 
          :style="{color: label.textColor, backgroundColor: label.bgColor}"
        >
          {{ label.label }}
        </p>
        <span v-if="label.label === selectedLabel.label">
          <CheckSolidIcon/>
        </span>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <div class="flex items-center">
          <input type="text" v-model="customLabel" placeholder="CUSTOM LABEL">
          <Swatches 
            class="ml-4"
            v-model="customBackgroundColor" 
            popover-x="right"
            swatches="text-advanced"
            shapes="circles"
          />
        </div>
        <span class="cursor-pointer" @click="handleAddLabel()"><PlusSolidIcon/></span>
      </div>
			<div class="mt-20">
				<button class="btn btn-sm btn-outline-primary w-full" type="button" @click="$refs.labelSettingModal.hide()"><span>Save</span></button>
			</div>
		</Modal>
	</div>
</template>

<script src="./linkedin.js"></script>

<style lang="scss" scoped src="./linkedin.scss"></style>
