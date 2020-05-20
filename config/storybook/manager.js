import { addons } from '@storybook/addons';
import portfolio from './portfolio';

window.STORYBOOK_GA_ID = 'UA-91843640-4';

addons.setConfig({
  theme: portfolio,
  panelPosition: 'right',
});