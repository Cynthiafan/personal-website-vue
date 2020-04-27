import { storiesOf } from '@storybook/vue';
import BarChart from './BarChart';
import readme from './README.md';

storiesOf('Charts', module)
  .add('Bar Chart', () => ({
    components: { BarChart },
    template: '<BarChart></BarChart>'
  }), { notes: readme });
