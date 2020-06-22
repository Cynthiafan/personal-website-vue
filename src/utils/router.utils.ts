export const lazyLoading = (pageName: string, index: boolean = false) => () => import(/* webpackChunkName: "page-" */ `@/views/${pageName}${index ? '/index' : ''}.vue`);

export const fetchComponent = (componentName: string, folderName: string = '') => () => {
  return import(/* webpackChunkName: "component-" */ `@/components/${folderName ? `${folderName}/` : ''}${componentName}.vue`);
};
