import * as d3 from 'd3';

const colorArray: string[] = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#D50000', '#6200EA', '#0091EA', '#00C853', '#FFD600', '#C51162', '#304FFE', '#00B8D4', '#64DD17', '#FFAB00',
  '#3E2723', '#AA00FF', '#2962FF', '#00BFA5', '#AEEA00', '#FF6D00', '#212121', '#B71C1C', '#311B92', '#01579B',
  '#1B5E20', '#F57F17', '#BF360C', '#880E4F', '#1A237E', '#006064', '#33691E', '#FF6F00', '#4A148C', '#0D47A1',
  '#004D40', '#827717', '#E65100', '#EF5350', '#7E57C2', '#29B6F6', '#66BB6A', '#FF7043', '#78909C', '#EC407A',
];

export const createColorsFunc = (isMoreThanTen: boolean = false) => {
  const func = d3.scaleOrdinal(d3.schemeCategory10);

  return isMoreThanTen ? colorArray : func;
};

