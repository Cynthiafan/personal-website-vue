import { mount } from '@vue/test-utils';
import DateRangePicker from './DateRangePicker.vue';
import { subMonths } from 'date-fns/fp';
import { startOfYesterday } from 'date-fns';
import { dfFormat } from '@/utils/dateFns.utils';
import { flow } from 'lodash/fp';

const wrapper = mount(DateRangePicker);
const vm: any = wrapper.vm;

describe('DateRangePicker', () => {
  const earlierDate = flow(subMonths(1), dfFormat)(new Date());
  const laterDate = dfFormat(startOfYesterday());

  // Mainly test handleDateRange()
  describe('select dates', () => {

    beforeEach(() => {
      vm.result = { dateStart: '', dateEnd: '' };
    });

    it('Valid dateStart & dateEnd', () => {

      const earlierDateDiv = wrapper.find(`.day[data-date='${earlierDate}']`);
      const laterDateDiv = wrapper.find(`.day[data-date='${laterDate}']`);

      earlierDateDiv.trigger('click');
      laterDateDiv.trigger('click');

      expect(vm.result).toEqual({ dateStart: earlierDate, dateEnd: laterDate });
    });

    it('dateEnd is before dateStart, only dateStart has value', () => {

      const earlierDateDiv = wrapper.find(`.day[data-date='${earlierDate}']`);
      const laterDateDiv = wrapper.find(`.day[data-date='${laterDate}']`);

      laterDateDiv.trigger('click');
      earlierDateDiv.trigger('click');

      expect(vm.result).toEqual({ dateStart: earlierDate, dateEnd: '' });
    });

    it('Click again when having a valid result already, only dateStart has value', () => {

      const earlierDateDiv = wrapper.find(`.day[data-date='${earlierDate}']`);
      const laterDateDiv = wrapper.find(`.day[data-date='${laterDate}']`);

      earlierDateDiv.trigger('click');
      laterDateDiv.trigger('click');
      earlierDateDiv.trigger('click');

      expect(vm.result).toEqual({ dateStart: earlierDate, dateEnd: '' });
    });
  });


});
