import Slider from './Slider';
import { storiesOf } from '@storybook/vue';
import readme from './README.md';

storiesOf('Components', module)
  .add('Slider', () => ({
    components: { Slider },
    data() {
      return {
        maxValue: 100,
        count: 0
      };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <Slider :maxValue="maxValue" v-model="count"></Slider>
        <div>{{ count }}</div>
      </div>
    `
  }), { notes: readme });
