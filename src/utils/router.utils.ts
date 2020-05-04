export const lazyLoading = (pageName: string, index: boolean = false) => () => import(/* webpackChunkName: "page-" */ `@/views/${pageName}${index ? '/index' : ''}.vue`);
