import VueScrollTo from 'vue-scrollto';

export const smoothScrollTo = ({ el, offset = 0, direction = 'y', container, duration = 300, onDone }) => {

  VueScrollTo.scrollTo(el, duration, {
    container,
    offset,
    x: direction === 'x',
    y: direction === 'y',
    onDone
  });
};