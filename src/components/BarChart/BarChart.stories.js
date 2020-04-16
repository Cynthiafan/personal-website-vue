import BarChart from './BarChart';
import { storiesOf } from '@storybook/vue';

storiesOf('Charts', module)
  .add('Bar Chart', () => ({
    components: { BarChart },
    template: '<BarChart></BarChart>'
  }))
