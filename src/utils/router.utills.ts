export const ladyLoading = (pageName: string) => {
  return import(/* webpackChunkName: "about" */ `@/views/${pageName}.vue`);
};
