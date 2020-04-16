import PieChart from './PieChart';
import { storiesOf } from '@storybook/vue';

storiesOf('Charts', module)
  .add('Pie Chart', () => ({
    components: { PieChart },
    template: '<PieChart></PieChart>'
  }))
