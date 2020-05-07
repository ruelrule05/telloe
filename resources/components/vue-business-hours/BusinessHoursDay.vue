<template>
  <div class="business-hours-day position-relative">
    <div class="d-flex align-items-center bhours-heading mb-2">
      <div class="flex-row day" role="cell">
        <div>{{ localization.days[day] }}</div>
      </div>
      <div class="flex-row toggle ml-2" role="cell">
        <ToggleButton
          @change="
            toggleOpen();
            resetHours();
            runValidations();
          "
          :value="anyOpen"
          :sync="true"
          :color="color"
          :width="40"
          :height="25"
          :font-size="12"
        />
      </div>
    </div>

    <div v-for="({ open, close, id }, index) in hours" :key="id" class="mb-2">
      <div class="flex-table" role="rowgroup">
        <div class="d-flex text-nowrap align-items-center justify-content-xaround">
          <div class="flex-row hours open flex-grow-1" role="cell">
            <BusinessHoursSelect
              v-if="type === 'select'"
              :name="name"
              :input-num="inputNum('open', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="open"
              :localization="localization"
              :hour-format24="hourFormat24"
              @input-change="onChangeEventHandler('open', index, $event)"
            ></BusinessHoursSelect>
            <BusinessHoursDatalist
              v-if="type === 'datalist'"
              :name="name"
              :input-num="inputNum('open', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="open"
              :any-error="anyError(validations[index].open)"
              :localization="localization"
              :hour-format24="hourFormat24"
              @input-change="onChangeEventHandler('open', index, $event)"
            ></BusinessHoursDatalist>
          </div>
          <div class="flex-row dash text-center" role="cell">-</div>
          <div class="flex-row hours flex-grow-1" role="cell">
            <BusinessHoursSelect
              v-if="type === 'select'"
              :name="name"
              :input-num="inputNum('close', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="close"
              :localization="localization"
              :hour-format24="hourFormat24"
              @input-change="onChangeEventHandler('close', index, $event)"
            ></BusinessHoursSelect>
            <BusinessHoursDatalist
              v-if="type === 'datalist'"
              :name="name"
              :input-num="inputNum('close', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :any-error="anyError(validations[index].close)"
              :updated-validations="validations[index].close"
              :selected-time="close"
              :hour-format24="hourFormat24"
              :localization="localization"
              @input-change="onChangeEventHandler('close', index, $event)"
            ></BusinessHoursDatalist>
          </div>

          <div class="actions text-right">
            <div class="flex-row remove" role="cell">
            <button
              type="button"
              class="btn btn-sm badge-pill p-0 line-height-1"
              v-if="showRemoveButton()"
              @click="removeRow(index)"
            >
             <close-icon height="25" width="25" transform="scale(1.2)" fill="red"></close-icon></button>
            </button>
            </div>

            <button
              type="button"
              class="btn btn-sm btn-primary badge-pill p-1 line-height-1 btn-add position-absolute"
              :disabled="!showAddButton(index)"
              @click="addRow(index)"
            >
              <plus-icon height="15" width="15" fill="white"></plus-icon>
            </button>
          </div>
        </div>
      </div>

      <ul class="time-errors" v-if="validations[index].anyErrors">
        <li
          v-for="{ whichTime, error } in activeErrors(index)"
          :key="whichTime + '.' + error"
        >{{ errorMessage(whichTime, error) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BusinessHoursSelect from './BusinessHoursSelect.vue';
import BusinessHoursDatalist from './BusinessHoursDatalist.vue';
import { ToggleButton } from 'vue-js-toggle-button';
import { helperMixin } from './mixins/helperMixin';
import { validationMixin } from './mixins/validationMixin';
import uniqid from 'uniqid';
import CloseIcon from '../../icons/close';
import PlusIcon from '../../icons/plus';
export default {
  name: 'BusinessHoursDay',
  components: {
    BusinessHoursSelect,
    BusinessHoursDatalist,
    ToggleButton,
    CloseIcon,
    PlusIcon
  },
  mixins: [helperMixin, validationMixin],
  props: {
    day: {
      type: String,
      required: true
    },
    hours: {
      type: Array,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    timeIncrement: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    localization: {
      type: Object
    },
    switchWidth: {
      type: Number
    },
    hourFormat24: {
      type: Boolean
    }
  },
  data: () => ({
    anyOpen: false,
  }),
  computed: {
    totalInputs: function() {
      return this.hours.length * 2;
    },
    isOpenToday: function() {
      return this.hours[0].isOpen;
    },
  },
  directives: {
    visible: function(el, binding) {
      el.style.visibility = binding.value ? 'visible' : 'hidden';
    }
  },
  created(){
    this.anyOpen = this.isOpen;
  },
  methods: {
    onChangeEventHandler: function(whichTime, index, value) {
      value = this.backendInputFormat(value);

      if (value == '24hrs') {
        this.hours.splice(1);
        this.hours[0].open = this.hours[0].close = value;
        this.runValidations();
        this.updateHours();
        return;
      }

      if (
        (this.hours[index].open == '24hrs' ||
          this.hours[index].close == '24hrs') &&
        value == ''
      ) {
        this.hours[index].open = this.hours[index].close = value;
        this.runValidations();
        this.updateHours();
        return;
      }

      if (
        !this.onlyOneRow(this.hours) &&
        value === '' &&
        ((whichTime === 'open' && this.hours[index].close === '') ||
          (whichTime === 'close' && this.hours[index].open === ''))
      ) {
        this.removeRow(index);
        this.runValidations();
        this.updateHours();
        return;
      }

      this.hours[index][whichTime] = value;
      this.runValidations();
      this.updateHours();
    },
    inputNum: function(whichTime, index) {
      if (whichTime === 'open') {
        return index * 2 + 1;
      } else if (whichTime === 'close') {
        return index * 2 + 2;
      }
    },
    toggleOpen: function() {
      this.anyOpen = this.anyOpen ? false : true;
    },
    resetHours: function() {
      /*this.hours.splice(1);
      this.hours[0].open = this.hours[0].close = '';*/
      this.updateHours();
    },
    addRow: function(index) {
      if(this.showAddButton(index)) {
        this.hours.push({
          id: uniqid(),
          open: '',
          close: '',
        });
        this.runValidations();
        this.updateHours();
      }
    },
    removeRow: function(index) {
      this.hours.splice(index, 1);
      this.runValidations();
      this.updateHours();
    },
    showDay: function(index) {
      return index > 0 ? false : true;
    },
    showRemoveButton: function() {
      return this.hours.length > 1 ? true : false;
    },
    showAddButton: function(index) {
      return this.hours.length === index + 1 &&
        this.hours[index].open !== '' &&
        this.hours[index].close !== '' &&
        this.hours[index].open !== '24hrs' &&
        this.hours[index].close !== '24hrs' &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 15 &&
          this.hours[index].close === '2345'
        ) &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 30 &&
          this.hours[index].close === '2330'
        ) &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 60 &&
          this.hours[index].close === '2300'
        ) &&
        this.hours[index].close !== '2400' &&
        this.validations[index].anyErrors === false
        ? true
        : false;
    },
    updateHours: function() {
      const updatedHours = { [this.day]: {isOpen: this.anyOpen, hours: this.hours} };
      this.$emit('update', updatedHours);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-add{
  top: 0; 
  right: 0;
}
.actions{
  width: 35px;
}


.flex-row.dash {
  width: 20px;
}

.row-container {
  flex-direction: column;
}


label.vue-js-switch {
  margin-bottom: 0;
}

button.font-awesome-button {
  width: 30px;
  font-size: 24px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.time-errors {
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #e3342f;
  list-style: none;
}

.time-errors li {
  margin-bottom: 6px;
}
</style>
