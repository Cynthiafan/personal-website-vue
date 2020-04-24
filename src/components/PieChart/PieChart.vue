<template lang="pug">
  div
    div.pie-chart(v-if="isDrawable" :class="`legend--${legendPosition}`")
      Legends(:id="`legend-${id}`"
        v-if="showLegends"
        v-model="selectedIndex"
        :dataset="layoutDataset"
        :selectedFormParent="selectedIndex")
      div.pie-chart__chart
        svg(:id="id")
    div.no-data(v-else)
      i.icon-information
      span 無符合資料
    transition(name="fade")
      div.other-distinct-table(v-if="otherDistinctDetail.length")
        div.other-distinct-table__title
          span 名稱
          span 百分比
        div.other-distinct-table__item(v-for="distinct in otherDistinctDetail" :key="distinct.label")
          span {{ distinct.label }}
          span {{ formatValue(distinct.value) }}
</template>
<script>
import * as d3 from 'd3';
import Legends from '../ChartLegend/ChartLegend';
import { createColorsFunc } from '@/utils/d3.utils';

export default {
  components: {
    Legends,
  },
  data() {
    return {
      selectedIndex: null,
      pieSections: null,
      pieData: null,
      labelLine: null,
      labelText: null,
      colors: createColorsFunc(),
      otherDistinctDetail: [],
      layoutDataset: [],
    };
  },
  props: {
    id: {
      type: String,
      default: 'pieChart',
    },
    dataset: {
      type: Array,
      default: () => {
        return [
          { label: '台北市', value: 199 },
          { label: '新北市', value: 87 },
          { label: '桃園市', value: 20 },
          { label: '基隆市', value: 56 },
          { label: '宜蘭縣', value: 10 },
          { label: '宜蘭市', value: 6 },
          { label: '桃園縣', value: 66 },
        ];
      },
    },
    legendPosition: {
      default: 'bottom',
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    showLegends: {
      type: Boolean,
      default: true,
    },
    maxSvgWidth: {
      type: Number,
      default: 400,
    },
    svgHeight: {
      type: Number,
      default: 300,
    },
    margin: {
      type: Object,
      default: () => {
        return { top: 30, right: 20, bottom: 30, left: 20 };
      },
    },
    arcPadding: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    totalValue() {
      let val = 0;
      this.dataset.forEach((d) => {
        val += d.value;
      });

      return val;
    },
    isDrawable() {
      return !!this.dataset.find((item) => item.value > 0);
    },
    radius() {
      return (this.svgHeight * 0.7) / 2;
    },
    circleCenter() {
      const x = (this.maxSvgWidth - this.margin.left - this.margin.right) / 2 + this.margin.left;
      const y = (this.svgHeight - this.margin.top - this.margin.bottom) / 2 + this.margin.top;

      return [x, y];
    },
  },
  watch: {
    selectedIndex(val) {
      this.focusSection();

      this.otherDistinctDetail = val !== null && this.layoutDataset[val].detail ? this.layoutDataset[val].detail : [];

      if (val !== null && this.layoutDataset[val].dataset && this.layoutDataset[val].dataset.length) {
        this.$emit('newPieChartData', this.layoutDataset[val]);
      } else {
        this.$emit('newPieChartData', '');
      }
    },
    dataset(val, oldVal) {
      if (JSON.stringify(val) === JSON.stringify(oldVal)) {
        return;
      }

      this.selectedIndex = null;
      this.formatDataset();

      setTimeout(() => {
        this.initPieChart();
      }, 50);
    },
  },
  methods: {
    formatDataset() {
      const specialCaseKey = ['其他國家', '其他城市'];
      const specialCase = this.dataset.filter((item) => item.label.includes(specialCaseKey));

      const allDistinct = this.dataset
        .filter((item) => !item.label.includes(specialCaseKey))
        .sort((a, b) => b.value - a.value);

      if (allDistinct.length <= 10) {
        this.layoutDataset = [...allDistinct.sort(() => Math.random() - 0.5), ...specialCase];
        return;
      }

      const topTenDistinct = allDistinct.filter((item, i) => i < 10).sort(() => Math.random() - 0.5);
      const otherDistinct = allDistinct.filter((item, i) => i >= 10);

      if (otherDistinct.length === 1) {
        this.layoutDataset = [...topTenDistinct, ...otherDistinct, ...specialCase];
        return;
      }

      let otherDistinctTotalValue = 0;

      otherDistinct.forEach((d) => {
        otherDistinctTotalValue += d.value;
      });

      const otherDistinctData = {
        label: '其他區域',
        value: otherDistinctTotalValue,
        detail: [],
      };

      otherDistinctData.detail = otherDistinct;

      this.layoutDataset = [...topTenDistinct, otherDistinctData, ...specialCase];
    },
    formatValue(val) {
      const percentage = Math.round((val / this.totalValue) * 100);
      return percentage < 1 ? '小於 1 %' : `${percentage}%`;
    },
    getTooltipContent(d) {
      return `${d.data.label}<br/>
        數量：${d.data.value}人`;
    },
    focusSection() {
      const pieArea = d3.select(`#${this.id}`);

      // 餅 & 字 => fill
      pieArea.selectAll('path, .labelText').style('fill', (d) => {
        return this.selectedIndex === null || d.index === this.selectedIndex ? this.colors(d.index) : 'lightgray';
      });

      // 線 => stroke
      pieArea.selectAll('.line1, .line2').style('stroke', (d) => {
        return this.selectedIndex === null || d.index === this.selectedIndex ? this.colors(d.index) : 'lightgray';
      });

      pieArea.selectAll('path, .labelText, .line1, .line2').style('transition', '0.2s');
    },
    initPieChart() {
      if (!this.isDrawable) {
        return;
      }

      d3.selectAll(`#${this.id} > *`).remove();

      const arc = d3
        .arc()
        .outerRadius(this.radius * 0.8)
        .innerRadius(this.radius * 0.3);

      const outerArc = d3
        .arc()
        .outerRadius(this.radius * 2)
        .innerRadius(0);

      const pie = d3
        .pie()
        .sort(null)
        .value((d) => d.value)(this.layoutDataset);

      const tooltip = d3.select('.tooltip').style('display', 'none');

      const svg = d3
        .select(`#${this.id}`)
        .attr('width', this.maxSvgWidth)
        .attr('height', this.svgHeight)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', `0 0 ${this.maxSvgWidth} ${this.svgHeight}`);

      this.pieSections = svg
        .append('g')
        .attr('transform', `translate(${this.circleCenter[0]}, ${this.circleCenter[1]})`)
        .selectAll('.arc')
        .data(pie)
        .enter()
        .append('g')
        .attr('class', 'arc')
        .on('click', (sec) => {
          this.selectedIndex = this.selectedIndex === sec.index ? null : sec.index;
        });

      this.pieSections
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => this.colors(i))
        .style('stroke-width', this.arcPadding)
        .style('stroke', 'white')
        .transition()
        .duration(1000)
        .attrTween('d', pieTween);

      function pieTween(b) {
        b.innerRadius = 0;
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
        return (t) => arc(i(t));
      }

      const labels = svg.append('g').attr('class', 'labels');

      this.labelLine = labels
        .append('g')
        .attr('transform', `translate(${this.circleCenter[0]}, ${this.circleCenter[1]})`)
        .selectAll('line')
        .data(pie)
        .enter();

      // 第一條線：扇形中心到 outerArc 中心
      this.labelLine
        .append('line')
        .attr('class', 'line1')
        .attr('opacity', 0)
        .style('fill', 'none')
        .style('display', (d) => {
          if (!d.value) {
            return 'none';
          }
        })
        .attr('stroke-width', 1)
        .attr('stroke', (d, i) => this.colors(i))
        .attr('x1', (d) => arc.centroid(d)[0])
        .attr('y1', (d) => arc.centroid(d)[1])
        .attr('x2', (d) => outerArc.centroid(d)[0])
        .attr('y2', (d) => outerArc.centroid(d)[1]);

      // 第二條線：outerAct 中心到 x 軸延伸
      this.labelLine
        .append('line')
        .attr('class', 'line2')
        .attr('opacity', 0)
        .style('fill', 'none')
        .style('display', (d) => {
          if (!d.value) {
            return 'none';
          }
        })
        .attr('stroke-width', 1)
        .attr('stroke', (d, i) => this.colors(i))
        .attr('x1', (d) => outerArc.centroid(d)[0])
        .attr('y1', (d) => outerArc.centroid(d)[1])
        .attr('x2', (d) => {
          const position = outerArc.centroid(d)[0];
          const sign = position > 0 ? 1 : -1;

          return position + 30 * sign;
        })
        .attr('y2', (d) => outerArc.centroid(d)[1]);

      this.labelLine
        .selectAll('line')
        .transition()
        .delay(600)
        .duration(1000)
        .on('start', function() {
          d3.active(this).style('opacity', 1);
        });

      this.labelText = labels
        .append('g')
        .attr('transform', `translate(${this.circleCenter[0]}, ${this.circleCenter[1]})`)
        .selectAll('text')
        .data(pie)
        .enter()
        .append('text')
        .attr('class', 'labelText')
        .text((d) => {
          const percentage = Math.round((d.value / this.totalValue) * 100);
          return percentage < 1 ? `${d.data.label} (小於${percentage} %)` : `${d.data.label} (${percentage}%)`;
        })
        .style('visibility', (d) => {
          if (!d.data.value) {
            return 'hidden';
          }
        })
        .attr('fill', (d, i) => this.colors(i))
        .attr('x', (d) => {
          const position = outerArc.centroid(d)[0];
          const sign = position > 0 ? 1 : -1;
          return position + 5 * sign;
        })
        .attr('y', function(d) {
          const lineHeight = d3
            .select(this)
            .node()
            .getBBox().height;

          const pos = outerArc.centroid(d)[1];

          return pos - lineHeight / 2 + 2;
        })
        .call(this.wrapText)
        .call(this.relaxLabel);

      this.labelText
        .attr('opacity', 0)
        .attr('text-anchor', (d) => {
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

          return midAngle < Math.PI + 0.05 ? 'start' : 'end';
        })
        .transition()
        .delay(600)
        .duration(1000)
        .on('start', function repeat() {
          d3.active(this).style('opacity', 1);
        });

      // 調整第二條線的 x2 要與 textWidth 相同
      this.labelText.nodes().forEach((d, i) => {
        const textWidth = d3
          .select(d)
          .node()
          .getBBox().width;

        this.labelLine
          .selectAll('.line2')
          .nodes()
          .forEach((node, j) => {
            if (i !== j) {
              return;
            }
            d3.select(node).attr('x2', (line) => {
              const position = outerArc.centroid(line)[0];
              const sign = position > 0 ? 1 : -1;

              return position + (textWidth + 10) * sign;
            });
          });
      });
    },
    relaxLabel(group) {
      const vm = this;

      group.each(function(elA) {
        const textA = d3.select(this);
        const x1 = textA.attr('x');
        const y1 = textA.attr('y');
        const margin = 5;
        const textHeight1 = textA.node().getBBox().height;

        group.each(function(elB, i) {
          const textB = d3.select(this);
          const x2 = textB.attr('x');
          const y2 = textB.attr('y');
          const deltaY = y1 - y2;
          const textHeight2 = textB.node().getBBox().height;

          const hasHiddenText = textA.style('visibility') === 'hidden' || textB.style('visibility') === 'hidden';

          if (elA === elB || hasHiddenText || x1 < 0 !== x2 < 0 || Math.abs(deltaY) > textHeight1 + margin) {
            return;
          }

          const sign = deltaY > 0 ? 1 : -1;
          const newPosition = Number(y1) - (textHeight1 + margin) * sign;

          // 由 textB 跟 textA 保持距離
          textB.attr('y', newPosition);

          const line1 = vm.labelLine.selectAll('.line1').nodes()[i];
          d3.select(line1).attr('y2', () => {
            return Number(textB.attr('y')) + margin;
          });

          const line2 = vm.labelLine.selectAll('.line2').nodes()[i];
          d3.select(line2)
            .attr('y1', Number(textB.attr('y')) + margin)
            .attr('y2', Number(textB.attr('y')) + margin);
        });
      });
    },
    wrapText(group) {
      const vm = this;

      group.each(function() {
        const el = d3.select(this);
        const x = el.attr('x');
        const y = el.attr('y');
        const textWidth = el.node().getComputedTextLength();
        const textMaxWidth = vm.maxSvgWidth / 2 - Math.abs(x);

        const lineHeight = el.node().getBBox().height;

        // 文字寬度超出邊界才需要執行換行
        if (textWidth > textMaxWidth) {
          const words = el
            .text()
            .split(/\s+/)
            .reverse();
          let lines = [];
          let word = words.pop();

          let tspan = el.text(null).append('tspan');

          while (word) {
            lines.push(word);
            tspan.text(lines.join(' '));

            if (tspan.node().getComputedTextLength() > textMaxWidth) {
              lines.pop();
              tspan.text(lines.join(' '));
              lines = [word];
              tspan = el.append('tspan').text(word);
            }
            word = words.pop();
          }

          const tspans = el.selectAll('tspan');
          const linesCount = tspans.nodes().length;

          el.attr('y', y - lineHeight * (linesCount - 1));

          tspans.attr('x', x).attr('y', (d, i) => y - (linesCount - i - 1) * lineHeight);
        }
      });
    },
  },
  mounted() {
    this.formatDataset();
    this.initPieChart();
  },
};
</script>
<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  position: relative;
  display: flex;
  &.legend {
    &--top {
      flex-direction: column;
      justify-content: center;
    }
    &--right {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
    }
    &--left {
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    &--bottom {
      flex-direction: column-reverse;
    }
  }
  &__chart {
    position: relative;
    display: flex;
    justify-content: center;
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

.tooltip {
  position: absolute;
  width: 120;
  height: auto;
  background: rgba(black, 0.7);
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
}

.other-distinct-table {
  width: 80%;
  margin: 20px auto;
  border: 1px solid #4a4a4a;
  &__title,
  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      text-align: center;
      padding: 5px;
      display: block;
      width: 50%;
    }
  }
  &__title {
    background: #4a4a4a;
    color: #fff;
    span:first-child {
      border-right: 1px solid #fff;
    }
  }
  &__item {
    border-bottom: 1px solid #4a4a4a;
    span:first-child {
      border-right: 1px solid #4a4a4a;
    }
    &:last-child {
      border: 0;
    }
  }
}
</style>
