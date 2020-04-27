import { storiesOf } from '@storybook/vue';
import Heatmap from './Heatmap';
import readme from './README.md';

storiesOf('Charts', module)
  .add('Heat Map', () => ({
    components: { Heatmap },
    template: '<heatmap></heatmap>'
  }), { notes: readme });
