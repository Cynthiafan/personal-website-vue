import Parabola from './Parabola';
import { storiesOf } from '@storybook/vue';

storiesOf('Animation', module)
  .add('Parabola', () => ({
    components: { Parabola },
    template: '<Parabola></Parabola>'
  }))