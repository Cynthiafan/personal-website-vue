<template lang="pug">
  div.bar-chart
    Legends(:id="`legend-${id}`"
      v-if="meta !== null && meta.legend && meta.legend.length > 1"
      v-model="selectedIndex"
      :dataset="formatLegend"
      type="rect"
      :selectedFormParent="selectedIndex")
    div.bar-chart__chart(:id="id" style="width: 100%")
      svg(:id="`chart-${id}`" width="100%" :height="svgHeight")
      Slider(v-if="enabledScroll && xBoundaryPosition"
        v-model="tempNum"
        :maxValue="xBoundaryPosition")
</template>
<script>
import * as d3 from 'd3';
import Legends from '../ChartLegend/ChartLegend';
import Slider from '../Slider/Slider';
import { createColorsFunc } from '@/utils/d3.utils';

export default {
  components: {
    Legends,
    Slider,
  },
  data() {
    return {
      bars: null,
      selectedIndex: null,
      margin: {},
      svgWidth: 0,
      chartWidth: 0,
      chartHeight: 0,
      xAxisLabels: [],
      scrollableWidth: null,
      svg: '',
      scrollableViewBox: null,
      scrollable: null,
      enabledScroll: false,
      scrollPercent: 0,
      xScale0: null,
      xScale1: null,
      tempNum: 0,
      sliderThumbIconPosition: 0,
    };
  },
  props: {
    id: {
      type: String,
      default: 'barChart',
    },
    meta: {
      type: Object,
      default: () => {
        return {
          mode: 'normal', // 'stack' 堆疊 || 'normal' 排列
          direction: 'horizontal', // 'horizontal' 水平 || 'vertical' 垂直
          xAxisLabel: '人數',
          yAxisLabel: '縣市地區',
          legend: [],
        };
      },
    },
    dataset: {
      type: Array,
      default: () => [
        { label: '台北市', value: 123 },
        { label: '新北市', value: 155 },
        { label: '基隆市', value: 48 },
        { label: '桃園縣', value: 43 },
        { label: '桃園市', value: 20 },
        { label: '宜蘭縣', value: 19 },
        { label: '宜蘭市', value: 22 },
        { label: '台中市', value: 66 },
        { label: '新竹市', value: 4 },
        { label: '台南市', value: 2 },
      ],
    },
    colors: {
      type: Array,
      default: () => {
        return createColorsFunc();
      },
    },
    svgHeight: {
      type: Number,
      default: 300,
    },
    barWidth: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    formatLegend() {
      return this.meta.legend.length ? this.meta.legend.map((label) => ({ label })) : [];
    },
    xBoundaryPosition() {
      return this.scrollableWidth - this.chartWidth - this.margin.right;
    },
  },
  watch: {
    tempNum(val) {
      d3.select(`#scrollable-${this.id}`).attr('transform', `translate(${-val}, 0)`);
    },
    selectedIndex(val) {
      this.focusBar();
    },
    dataset(val, oldVal) {
      if (JSON.stringify(val) === JSON.stringify(oldVal)) {
        return;
      }

      this.initSvgArea();
    },
  },
  mounted() {
    this.$nextTick(() => this.initSvgArea());
  },
  methods: {
    registClick() {
      this.bars.on('click', (bar) => {
        const clickedIndex = this.meta.legend.findIndex((legend) => legend === bar.key);
        this.selectedIndex = clickedIndex === this.selectedIndex ? null : clickedIndex;
      });
    },
    initSvgArea() {
      d3.selectAll(`#chart-${this.id} > *`).remove();

      this.margin = { top: 25, right: 18, bottom: 30, left: 35 };
      this.xAxisLabels = this.dataset.map((item) => item.label);

      const chart = d3.select(`#chart-${this.id}`);

      this.svgWidth = chart.node().getBoundingClientRect().width;

      this.chartWidth = this.svgWidth - this.margin.left - this.margin.right;
      this.chartHeight = this.svgHeight - this.margin.top - this.margin.bottom;

      this.scrollableWidth = this.meta.legend.length
        ? this.meta.legend.length * this.dataset.length * this.barWidth
        : this.dataset.length * 80;

      this.enabledScroll = this.scrollableWidth - this.chartWidth > 10;

      const zoom = d3
        .zoom()
        .scaleExtent([1, 1])
        .translateExtent([
          [0, 0],
          [this.scrollableWidth + this.margin.right, this.chartHeight],
        ])
        .on('zoom', () => {
          const tx = d3.event.transform.x;
          d3.select(`#scrollable-${this.id}`).attr('transform', `translate(${tx}, 0)`);
          this.tempNum = -tx;
        });

      // 塞圖表的 <g>
      this.svg = d3
        .select(`#chart-${this.id}`)
        .append('g')
        .attr('transform', `translate(0, 0)`)
        .call(this.enabledScroll ? zoom : () => null);

      this.svg
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('x', this.margin.left)
        .attr('y', this.margin.top)
        .attr('width', this.chartWidth)
        .attr('height', this.chartHeight);

      this.scrollableViewBox = this.svg.append('g').attr('clip-path', 'url(#clip)');

      this.scrollable = this.scrollableViewBox
        .append('g')
        .attr('width', this.enabledScroll ? this.scrollableWidth : this.chartWidth)
        .attr('id', `scrollable-${this.id}`);

      this.scrollable
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, 0)');

      const vm = this;

      const axisLabels = this.svg.append('g').attr('class', 'axisLabel');
      const xAxisLabel = axisLabels
        .append('text')
        .text(this.meta.xAxisLabel)
        .attr('text-anchor', 'middle')
        .attr('x', this.chartWidth / 2 + this.margin.left)
        .attr('y', this.chartHeight + this.margin.top + this.margin.bottom / 2);

      const yAxisLabel = axisLabels
        .append('text')
        .text(this.meta.yAxisLabel)
        .attr('x', () => {
          // const textWidth = this.getComputedTextLength() / 2;

          // return vm.margin.left - textWidth;
          return 0;
        })
        .attr('y', this.margin.top / 2);

      this.meta.legend.length ? this.renderGroupChart() : this.renderNormalChart();
    },
    renderNormalChart() {
      const maxValue = d3.max(this.dataset, (d) => d.value);

      const xScale = d3
        .scaleBand()
        .domain(this.dataset.map((item) => item.label))
        .rangeRound([this.margin.left, this.enabledScroll ? this.scrollableWidth : this.chartWidth])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .rangeRound([this.chartHeight, this.margin.top]);

      this.svg
        .select('.x')
        .attr('transform', `translate(0, ${this.chartHeight})`)
        .call(d3.axisBottom(xScale));

      this.svg
        .append('g')
        .attr('transform', `translate(${this.margin.left}, 0)`)
        .call(
          d3
            .axisLeft(yScale)
            .ticks(Math.min(Math.max(this.chartHeight / 40, 2), maxValue))
            .tickFormat((d) => (parseInt(d, 10) === d ? d3.format('d')(d) : null)),
        );

      this.bars = this.svg
        .select(`#scrollable-${this.id}`)
        .append('g')
        .attr('transform', `translate(0, 0)`)
        .selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth)
        .attr('x', (d) => xScale(d.label))
        .attr('y', (d) => yScale(d.value))
        .attr('height', (d) => yScale(0) - yScale(d.value))
        .attr('fill', (d, i) => this.colors(i));
    },
    renderGroupChart() {
      let maxValue;
      this.dataset.forEach((item) => {
        this.meta.legend.forEach((legend) => {
          maxValue = maxValue > item[legend] ? maxValue : item[legend];
        });
      });

      this.xScale0 = d3
        .scaleBand()
        .domain(this.dataset.map((item) => item.label))
        .range([this.margin.left, this.enabledScroll ? this.scrollableWidth : this.chartWidth])
        .padding(0.2)
        .paddingInner(0.25);

      this.xScale1 = d3
        .scaleBand()
        .domain(this.meta.legend)
        .range([0, this.xScale0.bandwidth()]);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .rangeRound([this.chartHeight, this.margin.top]);

      this.svg
        .select('.x')
        .attr('transform', `translate(0, ${this.chartHeight})`)
        .call(d3.axisBottom(this.xScale0));

      this.svg
        .append('g')
        .attr('transform', `translate(${this.margin.left}, 0)`)
        .call(
          d3
            .axisLeft(yScale)
            .ticks(Math.min(Math.max(this.chartHeight / 40, 2), maxValue))
            .tickFormat((d) => (parseInt(d, 10) === d ? d3.format('d')(d) : null)),
        );

      this.bars = this.svg
        .select(`#scrollable-${this.id}`)
        .append('g')
        .selectAll('g')
        .data(this.dataset)
        .join('g')
        .attr('class', 'barGroup')
        .attr('transform', (d) => `translate(${this.xScale0(d.label)}, 0)`)
        .selectAll('rect')
        .data((d) => this.meta.legend.map((key) => ({ key, value: d[key] })))
        .join('rect')
        .attr('data-key', (d, i) => d.key)
        .attr('x', (d) => this.xScale1(d.key))
        .attr('y', (d) => yScale(d.value))
        .attr('width', this.xScale1.bandwidth())
        .attr('height', (d) => yScale(0) - yScale(d.value))
        .attr('fill', (d, i) => this.colors(d.key));

      this.registClick();
    },
    renderStackedChart() {
      const layers = d3
        .stack()
        .keys(this.meta.legend)
        .offset(d3.stackOffsetDiverging)(this.dataset);

      const stackMax = d3.max(layers, (legend) => {
        return d3.max(legend, (label) => label[1]);
      });

      const xScale = d3
        .scaleBand()
        .domain(this.xAxisLabels)
        .rangeRound([this.margin.left, this.chartWidth])
        .padding(0.3);

      const yScale = d3
        .scaleLinear()
        .domain([0, stackMax])
        .range([this.chartHeight, this.margin.top]);

      this.svg
        .append('g')
        .attr('transform', `translate(0, ${this.chartHeight})`)
        .call(d3.axisBottom(xScale));

      this.svg
        .append('g')
        .attr('transform', `translate(${this.margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5));

      const group = this.svg
        .append('g')
        .selectAll('g')
        .data(layers)
        .enter()
        .append('g')
        .attr('fill', (d, i) => {
          return typeof this.colors === 'function' ? this.colors(d.key) : this.colors[i];
        });

      const rect = group
        .selectAll('rect')
        .data((d) => {
          d.forEach((d1) => {
            d1.key = d.key;
            return d1;
          });
          return d;
        })
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth)
        .attr('x', (d) => xScale(d.data.label))
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => yScale(d[0]) - yScale(d[1]));
    },
    focusBar() {
      const barGroup = d3.select(`#${this.id}`).selectAll('.barGroup');

      barGroup.nodes().forEach((d, i) => {
        const rects = d3.select(d).selectAll('rect');

        rects.nodes().forEach((dd, j) => {
          const key = d3.select(dd).attr('data-key');

          if (this.selectedIndex === null) {
            d3.select(dd).attr('fill', this.colors(key));
            return;
          }

          if (j !== this.selectedIndex) {
            d3.select(dd)
              .attr('fill', 'lightgray')
              .style('transition', '0.2s');
          } else {
            d3.select(dd)
              .attr('fill', this.colors(key))
              .style('transition', '0.2s');
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.barChart {
  &__chart {
    width: 100%;
    position: relative;
  }
}
/deep/ .axisLabel {
  font-size: 12px;
}
</style>
