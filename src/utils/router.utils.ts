export const lazyLoading = (pageName: string, index: boolean = false) => () => import(/* webpackChunkName: "p-[request]" */ `@/views/${pageName}${index ? '/index' : ''}.vue`);

export const fetchComponent = (componentName: string, folderName: string = '') => () => {
  return import(/* webpackChunkName: "c-[request]" */ `@/components/${folderName ? `${folderName}/` : ''}${componentName}.vue`);
};
