<template lang="pug">
  div
    div.legends(:id="id")
</template>
<script>
import * as d3 from 'd3';
import { createColorsFunc } from '@/utils/d3.utils';

export default {
  data() {
    return {
      colors: createColorsFunc(),
      selectedIndex: null,
    };
  },
  props: {
    dataset: {
      type: Array,
      default: () => {
        return [
          { label: '15~19歲', color: '#9CCDEC' },
          { label: '20~24歲', color: '#6BABD0' },
          { label: '25~29歲', color: '#3476A5' },
          { label: '30~34歲', color: '#295588' },
          { label: '35~39歲', color: '#0F2F54' },
          { label: '40~44歲', color: '#091E34' },
        ];
      },
    },
    type: {
      type: String,
      default: 'rect',
    },
    selectedFormParent: {
      default: null,
    },
    id: {
      type: String,
      default: 'legend',
    },
  },
  watch: {
    selectedIndex(val) {
      this.$emit('input', val);
      this.focusLegend();
    },
    selectedFormParent(val) {
      this.selectedIndex = this.selectedFormParent;
    },
    dataset() {
      this.renderLegend();
    },
  },
  mounted() {
    this.renderLegend();
  },
  methods: {
    renderLegend() {
      d3.selectAll(`#${this.id} > *`).remove();

      const legends = d3
        .select(`#${this.id}`)
        .selectAll('div')
        .data(this.dataset)
        .enter()
        .append('div')
        .attr('class', 'legends__group');

      if (this.type === 'line') {
        legends
          .append('svg')
          .attr('width', 20)
          .attr('height', 2)
          .append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', 20)
          .attr('y2', 0)
          .attr('class', 'line')
          .classed('dashed', d => d.dashed)
          .attr('stroke', (d, i) => d.color || this.colors(i));
      } else {
        legends
          .append('svg')
          .attr('width', 10)
          .attr('height', 10)
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 10)
          .attr('height', 10)
          .attr('class', 'rect')
          .attr('fill', (d, i) => d.color || this.colors(i));
      }

      const text = legends
        .append('div')
        .text(d => d.label)
        .attr('class', 'text')
        .style('color', (d, i) => d.color || this.colors(i));

      legends.on('click', (legend, i) => {
        let clickIndex = this.dataset.findIndex(obj => obj === legend);
        this.selectedIndex = clickIndex === this.selectedIndex ? null : clickIndex;
      });

      this.focusLegend();
    },
    focusLegend() {
      d3.select(`#${this.id}`)
        .selectAll('.legends__group')
        .style('border-color', (d, i) => {
          if (i === this.selectedIndex) return d.color || this.colors(i);
        })
        .classed('selected', (d, i) => i === this.selectedIndex)
        .style('transition', '0.2s');
    },
  },
};
</script>
<style lang="scss" scoped>
.legends {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0px 5px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  /deep/ &__group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 4px 8px;
    border: 1px solid #fff;
    border-radius: 5px;
    cursor: pointer;
    .line {
      stroke-width: 4px;
      &.dashed {
        stroke-dasharray: 2;
      }
    }
    .rect {
      width: 10px;
      height: 10px;
    }
    .text {
      margin-left: 3px;
    }
  }
}
</style>
