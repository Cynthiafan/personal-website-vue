import Slider from './Slider';
import { storiesOf } from '@storybook/vue';
import { number } from '@storybook/addon-knobs';

storiesOf('Components', module)
  .add('Slider', () => ({
    components: { Slider },
    data() {
      return {
        max: 100,
        count: 0
      };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center;">
        <Slider :max="max" v-model="count"></Slider>
      </div>
    `
  }));
