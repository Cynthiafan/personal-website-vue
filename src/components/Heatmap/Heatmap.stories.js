import Heatmap from './Heatmap';
import { storiesOf } from '@storybook/vue';

storiesOf('Charts', module)
  .add('Heatmap', () => ({
    components: { Heatmap },
    template: '<heatmap></heatmap>'
  }))
