<template lang="pug">
  div.picker
    div.picker__mask
    div.picker__calendar
      transition(name="fade")
        div.warning(v-if="isOpenWarning")
          i.icon-cancel-circled
          span {{ exceedLengthErrorMsg }}
      div.preview
        div.preview__date(:class="{placeholder: !result.dateStart}") {{ result.dateStart || '開始日期' }}
        div.icon-angle-right
        div.preview__date(:class="{placeholder: !result.dateEnd}") {{ result.dateEnd || '結束日期' }}
      ul.weekday
        li.name(v-for="weekday in weekdays" :key="weekday") {{ weekday }}
      div.picker__calendar__content
        div.picker__calendar__content__month(
          :id="`group-${date.year}-${date.month}`" 
          v-for="date in dates" 
          :key="`${date.year}-${date.month}`")
          div.picker__calendar__content__info {{ `${date.year}/${date.month}` }}
          div.picker__calendar__content__week
            div.day(
              v-for="(day, i) in daysInfo(date.year, date.month)" :key="i"
              :class="handleDateClass(`${date.year}/${date.month}/${day}`)"
              @click="handleDateRange(`${date.year}/${date.month}/${day}`)") {{ day }}
      div.btn
        button.btn__cancel(@click="cancel") 取消
        button.btn__submit(:disabled="!result.dateEnd" @click="submit") 確定
</template>
<script>
import { startOfYesterday } from 'date-fns';
import {
  addMonths,
  differenceInDays,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  isValid,
  parse,
  subMonths,
  startOfMonth,
} from 'date-fns/fp';
import { initWeekdays, parseDate, dfFormat, formatToISOWeekday } from '@/plugins/dateFns';
import { smoothScrollTo } from '@/utils/browser.utils';
import { flow } from 'lodash/fp';

export default {
  data() {
    return {
      weekdays: initWeekdays(),
      result: {
        dateStart: '',
        dateEnd: '',
      },
      isOpenWarning: false,
      dates: [],
    };
  },
  props: {
    minDate: {
      type: String,
    },
    maxDate: {
      type: String,
      default: () => {
        return dfFormat(startOfYesterday());
      },
    },
    defaultRenderMonths: {
      type: Number,
      default: 6,
    },
    maxRangeLength: {
      type: Number,
    },
    exceedLengthErrorMsg: {
      type: String,
      default: '',
    },
  },
  computed: {
    isRenderAllTheDates() {
      if (!this.minDate || !this.dates.length) {
        return false;
      }

      const [minYear, minMonth] = this.minDate.split('/');
      const { year: currentMinYear, month: currentMinMonth } = this.dates[0];

      return minYear === currentMinYear && minMonth === currentMinMonth ? true : false;
    },
  },
  mounted() {
    this.initDates();
    this.$nextTick(() => this.scrollToCurrentYearMonth());

    window.addEventListener('scroll', this.onScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  },
  methods: {
    initDates() {
      let minDate;

      if (this.minDate) {
        minDate = flow(parseDate, startOfMonth)(this.minDate);
      } else {
        const subDefaultMonths = subMonths(this.defaultRenderMonths);
        minDate = flow(subDefaultMonths, startOfMonth)(new Date());
      }

      const maxDate = flow(parseDate, startOfMonth)(this.maxDate);
      const monthYearGroup = [];
      const addOneMonth = addMonths(1);

      while (maxDate >= minDate) {
        monthYearGroup.push({
          year: `${getYear(minDate)}`,
          month: `${getMonth(minDate) + 1}`,
        });
        minDate = addOneMonth(minDate);
      }

      this.dates = monthYearGroup;
    },
    scrollToCurrentYearMonth() {
      const currentMonthYear = dfFormat(new Date(), 'yyyy-M');

      smoothScrollTo({
        el: `#group-${currentMonthYear}`,
        container: '.picker__calendar__content',
        offset: -10,
        duration: -1,
      });
    },
    onScroll(e) {
      if (this.isRenderAllTheDates) {
        return;
      }

      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || e.srcElement.scrollTop;
      const { year: currentMinYear, month: currentMinMonth } = this.dates[0];

      if (currentScrollPosition < 100) {
        const isCrossYear = !!(currentMinMonth - 1 === 0);
        this.dates.unshift({
          year: isCrossYear ? currentMinYear - 1 : currentMinYear,
          month: isCrossYear ? 12 : currentMinMonth - 1,
        });
      }
    },
    daysInfo(year, month) {
      const parseYearMonth = parse(new Date(), 'yyyy/M');

      const daysInMonth = flow(parseYearMonth, getDaysInMonth)(`${year}/${month}`);
      const firstWeekdayOfMonth = flow(parseYearMonth, getDay, formatToISOWeekday)(`${year}/${month}`);

      const totalBlockInMonth = [
        ...Array(firstWeekdayOfMonth - 1).fill(''),
        ...Array(daysInMonth)
          .fill('')
          .map((d, i) => i + 1),
      ];

      return totalBlockInMonth;
    },
    checkIsDayRangeValid(date) {
      if (!this.maxRangeLength) {
        return true;
      }

      const { dateStart, dateEnd } = this.result;
      const selectedDays = differenceInDays(parseDate(dateStart))(parseDate(date)) + 1;

      if (selectedDays > this.maxRangeLength) {
        this.isOpenWarning = true;
        setTimeout(() => {
          this.isOpenWarning = false;
        }, 1500);
        return false;
      }

      return true;
    },
    handleDateRange(date) {
      const { dateStart, dateEnd } = this.result;
      const isDateBeforeDateStart = flow(parseDate, isBefore)(dateStart);

      if (!dateStart || (dateStart && dateEnd) || flow(parseDate, isDateBeforeDateStart)(date)) {
        this.result.dateStart = date;
        this.result.dateEnd = '';
      } else {
        this.result.dateEnd = this.checkIsDayRangeValid(date) ? date : '';
      }
    },
    isDateDisabled(date) {
      date = parseDate(date);
      const isDateAfterMaxDate = isAfter(parseDate(this.maxDate))(date);
      const isDateBeforeMinDate = this.minDate ? isBefore(parseDate(this.minDate))(date) : false;

      return isDateAfterMaxDate || isDateBeforeMinDate;
    },
    isDateBetweenTwoDays(date) {
      const { dateStart, dateEnd } = this.result;
      if (!dateStart || !dateEnd) {
        return false;
      }
      date = parseDate(date);
      return isWithinInterval({ start: parseDate(dateStart), end: parseDate(dateEnd) })(date);
    },
    isDateSameWith(key, date) {
      const isDateValid = flow(parseDate, isValid)(date);
      if (!isDateValid || !this.result[key]) {
        return false;
      } else {
        return isSameDay(parseDate(this.result[key]))(parseDate(date));
      }
    },
    handleDateClass(date) {
      const isDateValid = flow(parseDate, isValid)(date);

      if (!isDateValid) {
        return 'disabled';
      }

      const isDateSameWithDateStart = this.isDateSameWith('dateStart', date);
      const isDateSameWithDateEnd = this.isDateSameWith('dateEnd', date);
      const isDateSelected = isDateSameWithDateStart || isDateSameWithDateEnd || this.isDateBetweenTwoDays(date);

      let classes = '';
      classes += this.isDateDisabled(date) ? 'disabled' : '';
      classes += isDateSameWithDateStart ? (this.result.dateEnd ? ' start' : ' start end') : '';
      classes += isDateSameWithDateEnd ? ' end' : '';
      classes += isDateSelected ? ' selected' : '';

      return classes;
    },
    submit() {
      this.$emit('setDateRange', this.result);
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.picker {
  position: relative;
  &__mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(#000, 0.7);
    left: 0;
    top: 0;
    z-index: 9;
  }
  &__calendar {
    font-size: 13px;
    width: 90%;
    height: 70vh;
    max-height: 340px;
    max-width: 290px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 5px 5px 20px -5px #000;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    overflow: hidden;

    .warning {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translateX(-50%);
      background: #f7c8cf;
      border: 1px solid $color-orange;
      padding: 5px 10px;
      white-space: nowrap;
      border-radius: 5px;
      display: flex;
      align-items: center;
      font-size: 14px;
      i {
        margin-right: 5px;
        font-size: 18px;
      }
    }
    .preview {
      height: 15%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      font-size: 15px;
      div {
        text-align: center;
        width: 25%;
      }
      &__date {
        transition: 0s;
        &.placeholder {
          color: $color-gray;
          transition: 0s;
        }
      }
    }

    .weekday {
      margin: 0;
      width: 100%;
      height: 10%;
      padding: 5px 15px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 5px 0px;
      color: $color-black;
      border-top: 1px solid #cfcfcf;
      border-bottom: 1px solid #cfcfcf;

      .name {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &__content {
      width: 100%;
      overflow-y: auto;
      height: 60%;
      padding: 15px;
      &::-webkit-scrollbar {
        display: none;
      }
      background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
        linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
        radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
        radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%;
      background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
        linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
        radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
        radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%;
      background-repeat: no-repeat;
      background-color: white;
      background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;

      /* Opera doesn't support this in the shorthand */
      background-attachment: local, local, scroll, scroll;
      &__month {
        margin: 10px 0;
      }
      &__info {
        margin: 0px 10px 5px;
        color: $color-gray;
      }
      .day.selected:first-of-type {
        color: red;
      }
      &__week {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-flow: dense;
        grid-gap: 5px 0px;
        grid-auto-rows: 1fr;
        &:before {
          content: '';
          width: 0;
          padding-bottom: 100%;
          grid-row: 1 / 1;
          grid-column: 1 / 1;
        }
        & > *:first-child {
          grid-row: 1 / 1;
          grid-column: 1 / 1;
        }
        .day {
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          &.selected {
            background: $color-classicBlue;
            color: #fff;
          }
          &.start {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
          }
          &.end {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
          }
          &.disabled {
            pointer-events: none;
            color: $color-gray;
          }
        }
      }
    }
    .btn {
      width: 100%;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 15%;
      button {
        width: 50%;
        border-radius: 5px;
        padding: 8px 10px;
        &:first-child {
          margin-right: 5px;
        }
      }
      &__cancel {
        color: $color-black;
        border: 0;
      }
      &__submit {
        background: $color-classicBlue;
        border: 1px solid $color-classicBlue;
        color: #fff;
        transition: 0.2s;
        &:disabled {
          background: $color-gray;
          border-color: $color-gray;
        }
      }
    }
  }
}
</style>
