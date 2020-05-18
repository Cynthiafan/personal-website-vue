<template lang="pug">
div(v-if="isDrawable" :style="`width: 100%; margin: 0 auto; max-width: 350px;`")
  div.heatmap-legend
    svg(:id="`legend-${id}`")
  div.heatmap
    svg(:id="id" width="100%" :height="svgHeight")
  div.no-data(v-if="!isDrawable")
    i.icon-information
    span 無符合資料
</template>
<script>
import * as d3 from 'd3';
import { initWeekdays, parseHour } from '@/utils/dateFns.utils';
import { addDays } from 'date-fns';

export default {
  data() {
    return {
      weekDays: initWeekdays(),
      margin: { top: 10, right: 20, bottom: 50, left: 70 },
      svg: null,
      svgWidth: null,
      chartWidth: null,
      rectWidth: null,
      colorScale: null,
    };
  },
  props: {
    id: {
      type: String,
      default: 'heatmap',
    },
    hourStart: {
      type: Number,
      default: 0,
    },
    hourEnd: {
      type: Number,
      default: 24,
    },
    dataset: {
      type: Array,
      default: () => {
        const ret = [];
        for (let i = 1; i <= 7; i++) {
          for (let j = 1; j <= 24; j++) {
            ret.push({
              weekday: i,
              hour: j,
              value: Math.floor(Math.random() * (40 - 1)),
            });
          }
        }
        return ret;
      },
    },
    rectHeight: {
      type: Number,
      default: 18,
    },
    colors: {
      type: Array,
      default: () => ['#f6faaa', '#FEE08B', '#FDAE61'],
    },
  },
  computed: {
    intervalCounts() {
      return this.hourEnd - this.hourStart;
    },
    svgHeight() {
      return this.rectHeight * this.intervalCounts + this.margin.top + this.margin.bottom;
    },
    chartHeight() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    dayHours() {
      // total hours label
      const timeLabelCounts = this.intervalCounts + 1;
      const hours = [];

      new Array(timeLabelCounts).fill().forEach((acc, index) => {
        hours.push(`${index + this.hourStart}:00`);
      });

      return hours;
    },
    isDrawable() {
      if (!this.dataset.length) {
        return false;
      }

      const hasValue = !!this.dataset.find((item) => item.value > 0);

      return hasValue;
    },
  },
  watch: {
    dataset(val, oldVal) {
      if (JSON.stringify(val) === JSON.stringify(oldVal)) {
        return;
      }

      setTimeout(() => {
        this.initChart();
      }, 50);
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      if (!this.isDrawable) {
        return;
      }

      d3.selectAll(`#${this.id} > *`).remove();
      d3.selectAll(`#legend-${this.id} > *`).remove();

      this.svg = d3.select(`#${this.id}`);
      this.svgWidth = this.svg.node().getBoundingClientRect().width;
      this.chartWidth = this.svgWidth - this.margin.left - this.margin.right;
      this.rectWidth = Math.floor(this.chartWidth / this.weekDays.length);

      const bucket = 0;

      const heatMap = this.svg
        .append('g')
        .attr('class', 'mainChart')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      const dayLabels = heatMap
        .append('g')
        .attr('class', 'dayLabel')
        .selectAll('text')
        .data(this.weekDays)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('x', (d, i) => {
          return i * this.rectWidth - 5;
        })
        .attr('y', this.chartHeight + this.rectHeight)
        .style('text-anchor', 'middle')
        .style('font-size', 12)
        .attr('transform', `translate(${this.rectWidth / 2}, 0)`);

      const hourStart = parseHour(this.hourStart.toString());
      const hourEnd = this.hourEnd === 24 ? addDays(parseHour('0'), 1) : parseHour(this.hourEnd.toString());

      const timeScale = d3
        .scaleTime()
        .domain([hourStart, hourEnd])
        .range([0, this.chartHeight]);

      const yAxis = d3
        .axisLeft()
        .scale(timeScale)
        .ticks(this.intervalCounts)
        .tickFormat(d3.timeFormat('%H:%M'));

      const timeLabels = heatMap
        .append('g')
        .attr('class', 'timeLabel')
        .attr('transform', `translate(-6, 0)`)
        .call(yAxis);

      this.colorScale = d3
        .scaleQuantile()
        .domain([0, bucket - 1, d3.max(this.dataset, (d) => d.value)])
        .range(this.colors);

      const rects = heatMap
        .append('g')
        .attr('class', 'rect')
        .selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('rect')
        .attr('x', (d) => d.weekday * this.rectWidth - 40)
        .attr('y', (d) => (d.hour - 1) * this.rectHeight)
        .attr('width', this.rectWidth)
        .attr('height', this.rectHeight)
        .style('fill', this.colors[0])
        .attr('stroke', '#fff')
        .attr('stroke-width', '2px');

      rects
        .transition()
        .duration(800)
        .style('fill', (d) => this.colorScale(d.value));

      this.initLegend();
    },
    initLegend() {
      const rectWidth = 40;
      const rectHeight = 15;
      const margin = { top: 30, right: 10, bottom: 30, left: 10 };
      const svgWidth = rectWidth * this.colors.length;
      const svgHeight = rectHeight + margin.top + margin.bottom;

      const legend = d3
        .select(`#legend-${this.id}`)
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      legend
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(0, ${margin.top})`)
        .selectAll('rect')
        .data([0].concat(this.colorScale.quantiles()), (d) => d)
        .enter()
        .append('rect')
        .attr('x', (d, i) => rectWidth * i)
        .attr('y', 0)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .style('fill', (d, i) => this.colors[i]);

      legend
        .selectAll('.legend-num')
        .data(['低', '中', '高'])
        .enter()
        .append('text')
        .text((d) => d)
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .attr('x', (d, i) => rectWidth * (i + 1) - 20)
        .attr('y', rectHeight + margin.top + 15);

      legend
        .append('text')
        .attr('class', 'legendName')
        .text('消費頻率') // 消費頻率
        .attr('y', 20);
    },
  },
};
</script>
<style lang="scss" scoped>
.heatmap {
  width: 100%;
}
.heatmap-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.no-data {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #979797;
  i {
    font-size: 50px;
    margin-bottom: 10px;
  }
}
</style>