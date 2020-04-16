<template lang="pug">
  div
    Legends(:id="`line-chart-legend-${id}`"
      v-if="showLegends"
      v-model="selectedIndex"
      :dataset="legendData"
      :type="isCompare ? 'line' : 'rect'"
      :selectedFormParent="selectedIndex")
    div(v-show="lineCount" :id="`line-chart-${id}`" style="width: 100%; position: relative")
      svg(:id="svgId" width="100%" :height="svgHeight")
      Slider(v-if="enabledScroll && xBoundaryPosition"
        v-model="tempNum"
        :max="xBoundaryPosition")
      div(:id="`brush-${id}`")
      div.tooltip(:id="`line-chart-tooltip-${id}`")
      div.alignLine
    div.no-data(v-show="!lineCount")
      i.icon-Information
      span 無符合資料
</template>
<script>
import * as d3 from 'd3';
import { get as _get, isEqual as _isEqual, cloneDeep as _cloneDeep } from 'lodash';
import moment from 'moment';
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
      showLegends: true,
      selectedIndex: null,
      margin: { top: 30, right: 45, bottom: 80, left: 30 },
      svgWidth: 0,
      chartWidth: 0,
      chartHeight: 0,
      xAxisMinWidth: 30,
      xAxisLabels: [],
      xScale: null,
      yScale: null,
      xAxis: null,
      yAxis: null,
      groupX: null,
      groupY: null,
      yMin: null,
      yMax: null,
      dateStart: '',
      dateEnd: '',
      tempNum: 0,
      scrollableWidth: 0,
      scrollableViewBox: null,
      scrollable: null,
      enabledScroll: false,
      colors: createColorsFunc(),
      renderingLabel: '',
    };
  },
  props: {
    meta: {
      type: Object,
      default: () => {
        return { mode: 'history', intervalType: 'date', xAxisLabel: '月份', yAxisLabel: '人數' };
      },
    },
    dataset: {
      type: [Array, String],
      default: [],
    },
    svgHeight: {
      type: Number,
      default: 300,
    },
    autoScroll: {
      type: Boolean,
      default: false,
    },
    isConsumptionAmountMainChart: {
      // 主類別為消費金額的主表
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: 'lineChart',
    },
  },
  computed: {
    svgId() {
      return `line-chart-svg-${this.id}`;
    },
    scrollableId() {
      return `line-chart-scrollable-${this.id}`;
    },
    isCompare() {
      // 是比較圖
      return this.meta.mode === 'compare';
    },
    isCompareOneDay() {
      // 是比較圖，且只比較一天的情況
      return this.isCompare && this.dataCount === 1;
    },
    timeFormat() {
      switch (this.meta.intervalType) {
        case 'year':
          return '%Y';
        case 'month':
          return '%Y-%m';
        case 'week':
          return '%Y-%U';
        case 'date':
          return '%Y-%m-%d';
        case 'time':
          return '%H:%M';
      }
    },
    legendData() {
      if (this.isCompareOneDay && !this.isConsumptionAmountMainChart) {
        return [
          {
            label: `${this.labelTimeFormat(this.dateStart)} ~ ${this.labelTimeFormat(this.dateEnd)}`,
            dashed: false,
            color: this.dataset[0].color || this.getAutoColor(0),
          },
        ];
      }

      return this.dataset
        .sort((a, b) => a.sort - b.sort)
        .map((d, i) => {
          return {
            label: d.label,
            dashed: this.isCompare ? i >= this.lineCount / 2 : false,
            color: d.color || this.getAutoColor(i),
          };
        })
        .filter(d => (this.isConsumptionAmountMainChart ? !d.dashed : true));
      // 主類別為消費金額的主表時 前期的金額區間（為虛線）就不用顯示Legend
    },
    svgSize() {
      return {
        width: '100%',
        height: 300,
      };
    },
    xBoundaryPosition() {
      return this.scrollableWidth - this.chartWidth;
    },
    dataCount() {
      // 其中一組資料總數
      return _get(this.dataset, '[0].items.length', 0);
    },
    lineCount() {
      // 線條數量
      return this.dataset.length;
    },
    newDataset() {
      if (this.isCompareOneDay) {
        // 因為只比較一天的折線圖會畫不出線 所以把前期資料組合在一起才能畫出線
        let cloneDataset = _cloneDeep(this.dataset);
        let newDataset = cloneDataset.splice(0, Math.round(this.lineCount / 2));
        return newDataset.map((data, i) => {
          data.items = [...data.items, ...cloneDataset[i].items];
          data.items.map(item => {
            item.key = data.label;
            item.color = data.color;
            return item;
          });
          return data;
        });
      }

      return this.dataset.map(data => {
        data.items = data.items.map((item, i) => {
          /**
           * 「與前期比較圖」的兩條線 xAxis會不一樣
           * 因此需要將xAxis改為一樣的值才能夠出現在同一段時間上
           */
          item.xAxis = this.dataset[0].items[i].xAxis;
          item.key = data.label;
          item.color = data.color;
          return item;
        });
        return data;
      });
    },
    numberFormat() {
      switch (true) {
        case Number.isInteger(this.yMax):
          return d3.format('d');
        case this.yMax < 0.01:
          return d3.format('.3f');
        case this.yMax < 0.1:
        case this.yMax < 1:
          return d3.format('.2f');
      }
    },
    ticks() {
      return Number.isInteger(this.yMax) ? d3.min([d3.max([1, Math.ceil(this.yMax)]), 10]) : 5;
    },
  },
  watch: {
    dataset(val, oldVal) {
      if (!_isEqual(val, oldVal)) {
        this.selectedIndex = null;
        this.$nextTick(() => {
          this.initSvgArea();
        });
      }
    },
    tempNum(val) {
      d3.select(`#${this.scrollableId}`).attr('transform', `translate(${-val}, 0)`);
    },
    selectedIndex(val) {
      this.focusLine();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSvgArea();
    });

    d3.select(window).on('resize', () => {
      // console.log('[Resize]');
      this.initSvgArea();
    });
  },
  methods: {
    parseDate(dateString) {
      switch (this.meta.intervalType) {
        case 'quarter':
          // 是「季」的資料格式
          return new Date(moment(dateString, 'YYYY-Q'));
        case 'weekday':
          // 是週一～週日的資料格式
          return new Date(moment(+dateString, 'E'));
        default:
          const fn = d3.timeParse(this.timeFormat);
          return fn(dateString);
      }
    },
    labelTimeFormat(date) {
      switch (this.meta.intervalType) {
        case 'quarter':
          return moment(date).format('YYYY \\QQ');
        case 'weekday':
          return moment(date).format('ddd');
        case 'week':
          // 是一年中第幾週的資料格式
          return moment(date).format(this.$t('boss.weekOfYearLabel'));
        default:
          const fn = d3.timeFormat(this.timeFormat);
          return fn(date);
      }
    },
    getAutoColor(i) {
      if (this.isCompare) {
        if (this.lineCount <= 2) {
          return this.colors(0);
        } else {
          return this.colors(i % (this.lineCount / 2));
        }
      }
      return this.colors(i);
    },
    initSvgArea() {
      d3.selectAll(`#${this.svgId} > *`).remove();
      this.tempNum = 0;

      if (!this.lineCount) return;

      this.xAxisLabels = this.dataset[0].items.map(item => item.xAxis);
      this.yMin = d3.min(this.dataset, d => d3.min(d.items, dd => dd.value));
      this.yMax = d3.max(this.dataset, d => d3.max(d.items, dd => dd.value));

      this.margin.left = Number.isInteger(this.yMax) ? Math.max(`${this.yMax}`.length * 10, 30) : 30;

      const chart = d3.select(`#line-chart-${this.id}`);
      // console.log(chart);
      const currentWidth = chart.node().getBoundingClientRect().width;

      this.svgWidth = currentWidth;

      this.chartWidth = this.svgWidth - this.margin.left - this.margin.right;
      this.chartHeight = this.svgHeight - this.margin.top - this.margin.bottom;

      this.scrollableWidth = this.dataCount * this.xAxisMinWidth;
      this.enabledScroll = this.autoScroll ? this.scrollableWidth > this.chartWidth : false;

      const zoom = d3
        .zoom()
        .scaleExtent([1, 1])
        .translateExtent([
          [0, 0],
          [this.scrollableWidth + this.xAxisMinWidth + this.margin.right, this.chartHeight],
        ])
        .on('zoom', () => {
          let tx = d3.event.transform.x;
          d3.select(`#${this.scrollableId}`).attr('transform', `translate(${tx}, 0)`);
          this.tempNum = -tx;
        });

      this.svg = d3
        .select(`#${this.svgId}`)
        .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(this.enabledScroll ? zoom : () => {});

      /**
       * 用polygon畫一個凸字型範圍
       * 因為用方形的話，當xAxis文字傾斜時，邊邊的字會被切掉
       */
      const polygon1Height = this.chartHeight + 6;
      const polygon2Height = polygon1Height + this.margin.bottom;
      this.svg
        .append('clipPath')
        .attr('id', `line-chart-clip-${this.id}`)
        // .append('rect')
        // .attr('x', 0)
        // .attr('y', -this.margin.top)
        // .attr('width', this.chartWidth)
        // .attr('height', this.chartHeight + this.margin.top + this.margin.bottom);
        .append('polygon')
        .attr(
          'points',
          [
            `0,${-this.margin.top}`,
            `${this.chartWidth + 15},${-this.margin.top}`,
            `${this.chartWidth + 15},${polygon1Height}`,
            `${this.chartWidth + this.margin.right},${polygon1Height}`,
            `${this.chartWidth + this.margin.right},${polygon2Height}`,
            `${-10}, ${polygon2Height}`,
            `${-10}, ${polygon1Height}`,
            `0,${polygon1Height}`,
          ].join(', ')
        );

      this.scrollableViewBox = this.svg.append('g').attr('clip-path', `url(#line-chart-clip-${this.id})`);

      this.scrollable = this.scrollableViewBox
        .append('g')
        .attr('width', this.enabledScroll ? this.scrollableWidth : this.chartWidth)
        .attr('id', this.scrollableId);

      this.scrollable
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, 0)');

      this.renderChart();

      let axisLabels = d3.select(`#${this.svgId}`).append('g');

      axisLabels
        .append('text')
        .text(this.meta.yAxisLabel)
        .attr('transform', `translate(5, ${this.margin.top / 2})`);

      axisLabels
        .append('text')
        .text(this.meta.xAxisLabel)
        .attr(
          'transform',
          `translate(${this.margin.left + this.chartWidth / 2}, ${this.margin.top +
            this.chartHeight +
            this.margin.bottom -
            1})`
        );

      axisLabels
        .selectAll('text')
        .attr('stroke-width', '0')
        .attr('font-weight', 'light')
        .attr('font-family', 'helvetica');
    },
    renderChart() {
      this.dateStart = d3.min(this.dataset[this.isCompareOneDay ? Math.round(this.lineCount / 2) : 0].items, d =>
        this.parseDate(d.xAxis)
      );
      this.dateEnd = d3.max(this.dataset[0].items, d => this.parseDate(d.xAxis));

      this.xScale = d3
        .scaleTime()
        .domain(d3.extent([this.dateStart, this.dateEnd]))
        .range([0, this.enabledScroll ? this.scrollableWidth : this.chartWidth]);

      this.yScale = d3
        .scaleLinear()
        .domain([0, this.yMax])
        .range([this.chartHeight, 0]);

      this.xAxis = d3
        .axisBottom()
        .scale(this.xScale)
        .ticks(
          this.enabledScroll
            ? this.dataCount
            : Math.max(Math.min(this.chartWidth / this.xAxisMinWidth, this.dataCount) - 1, 1)
        )
        .tickFormat(this.labelTimeFormat);

      this.yAxis = d3
        .axisLeft()
        .scale(this.yScale)
        .ticks(this.ticks)
        .tickFormat(this.numberFormat);

      /**
       * 加入xAxis文字，位置在圖表下方
       */
      this.groupX = this.svg
        .select('.x')
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${this.chartHeight})`)
        .call(this.xAxis);

      /**
       * xAxis 文字寬度 > xAxis的 Min Width
       * 將文字弄斜
       */
      const textSvg = this.groupX.selectAll('text');
      const textSvgWidth = textSvg.node().getBoundingClientRect().width;
      if (textSvgWidth > this.xAxisMinWidth || ['time'].includes(this.meta.intervalType)) {
        textSvg
          .attr('font-weight', 'bold')
          .attr('y', 8)
          .attr('x', 5)
          .attr('dy', '.35em')
          .attr('transform', 'rotate(45)')
          .style('text-anchor', 'start');
      }

      this.groupY = this.svg
        .append('g')
        .attr('class', 'yAxis')
        .attr('transform', 'translate(0, 0)')
        .call(this.yAxis);

      let group = this.svg
        .select(`#${this.scrollableId}`)
        .append('g')
        .selectAll('g')
        .data(this.newDataset)
        .enter()
        .append('g')
        .attr('class', 'graphContainer');

      group
        .append('path')
        .attr('class', 'line')
        .attr('d', d => {
          let linePath = d3
            .line()
            .x(d => this.xScale(this.parseDate(d.xAxis)))
            .y(d => this.yScale(d.value));
          return linePath(d.items);
        })
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', (d, i) => {
          if (this.isCompare && i >= this.lineCount / 2) return '3';
        });

      group.on('click', (d, index) => {
        this.selectedIndex = this.selectedIndex === index ? null : index;
      });

      /**
       * 線上的點
       */
      // const circleGroup = this.svg
      //   .select(`#${this.scrollableId}`)
      //   .selectAll('circle-group')
      //   .data(this.newDataset)
      //   .enter()
      //   .append('g')
      //   .attr('class', 'line-circle-container')
      //   .selectAll('circle')
      //   .data(d => d.items)
      //   .enter()
      //   .append('g')
      //   .attr('class', 'circle-group');

      // circleGroup
      //   .append('circle')
      //   .attr('cx', d => this.xScale(this.parseDate(d.xAxis)))
      //   .attr('cy', d => this.yScale(d.value))
      //   .attr('r', 2);

      // circleGroup
      //   .append('text')
      //   .attr('font-size', '12px')
      //   .attr('opacity', 0.8)
      //   .text(d => (d.value ? d.value : ''))
      //   .attr('x', (d, i, text) => {
      //     const offset = i === 0 ? 5 : i === this.newDataset[0].items.length - 1 ? -5 : 0;
      //     return this.xScale(this.parseDate(d.xAxis)) + offset;
      //   })
      //   .attr('y', d => this.yScale(d.value) - 8);

      // this.tooltip();
      this.focusLine();
    },
    focusLine() {
      let lineGroups = d3.select(`#${this.svgId}`).selectAll('.line');
      let circles = d3.select(`#${this.svgId}`).selectAll('.line-circle-container');

      const handleFocus = ({ isLine }) => {
        return (d, i) => {
          const isCurrent =
            i === this.selectedIndex ||
            (this.isConsumptionAmountMainChart && i % (this.lineCount / 2) === this.selectedIndex);

          if (this.selectedIndex === null || isCurrent) {
            d3.select(d)
              .attr('opacity', isLine ? 0.8 : 1)
              .attr(isLine ? 'stroke' : 'fill', d => d.color || this.getAutoColor(i));
            return;
          }

          if (!isCurrent) {
            d3.select(d)
              .attr(isLine ? 'stroke' : 'fill', 'lightgray')
              .attr('opacity', 0.2)
              .style('transition', '0.2s');
          }
        };
      };

      lineGroups.nodes().forEach(handleFocus({ isLine: true }));
      circles.nodes().forEach(handleFocus({ isLine: false }));
    },
  },
  beforeDestroy() {
    d3.select(window).on('resize', () => {});
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  min-width: 120px;
  height: auto;
  background: rgba(black, 0.8);
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: none;
}

.alignLine {
  position: absolute;
  width: 1px;
}

.axisLabel {
  position: absolute;
  color: #9b9b9b;
  &.x {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.y {
    top: 3px;
  }
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
