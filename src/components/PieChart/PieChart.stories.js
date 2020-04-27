import { storiesOf } from '@storybook/vue';
import PieChart from './PieChart';
import readme from './README.md';

storiesOf('Charts', module)
  .add('Pie Chart', () => ({
    components: { PieChart },
    template: '<PieChart></PieChart>'
  }), { notes: readme });
