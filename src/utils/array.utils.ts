export const shuffle = (arr: any[]): any[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const groupByCount = (rule: number[]) => (arr: any[]): any[] => {
  const group: any[] = [];
  rule.forEach((count: number) => {
    group.push(arr.splice(0, count));
  });
  return group;
};
