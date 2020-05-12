import VueScrollTo from 'vue-scrollto';

export const smoothScrollTo = (
  { el, offset = 0, direction = 'y', container, duration = 300, onDone }: ScrollToParameters): void => {

  VueScrollTo.scrollTo(el, duration, {
    container,
    offset,
    x: direction === 'x',
    y: direction === 'y',
    onDone,
  });
};

export const localStorageFn = (name: string) => {
  if (!name) {
    throw new Error('Parameter is required!');
  }

  return {
    setItem: (obj: any): void => {
      obj = JSON.stringify(obj);
      localStorage.setItem(name, obj);
    },
    getItem: (): any => {
      const ret = localStorage.getItem(name);
      return ret ? JSON.parse(ret) : null;
    },
    removeItem: (): void => {
      localStorage.removeItem(name);
    },
  };
};

interface ScrollToParameters {
  el: HTMLElement,
  container: HTMLElement,
  offset?: number,
  direction?: 'x' | 'y',
  duration?: number,
  onDone?: () => any,
}

