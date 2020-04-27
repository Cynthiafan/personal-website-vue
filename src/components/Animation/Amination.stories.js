import { storiesOf } from '@storybook/vue';
import Parabola from './Parabola';
import parabolaReadme from './Parabola.md';

storiesOf('Animation', module)
  .add('Parabola', () => ({
    components: { Parabola },
    template: '<Parabola></Parabola>',
  }), { notes: parabolaReadme });