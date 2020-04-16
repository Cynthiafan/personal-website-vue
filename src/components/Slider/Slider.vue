<template lang="pug">
  div.slider
    input.slider-bar(type="range" min="0" :max="max" v-model.number="tempNum")
    i.slider-icon.icon-menu(:style="{ left: `${iconPositionLeft}px` }")
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      barWidth: 0,
      iconPositionLeft: 0,
    };
  },
  computed: {
    tempNum: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    value(val) {
      this.setIconPosition();
    },
  },
  mounted() {
    this.barWidth = this.getElementWidth('.slider-bar');
    this.setIconPosition();
  },
  methods: {
    getElementWidth(queryClass) {
      return document.querySelector(queryClass).getBoundingClientRect().width;
    },
    setIconPosition() {
      const thumbWidth = 80;

      this.iconPositionLeft = (this.value * (this.barWidth - thumbWidth)) / this.max;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.slider {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 20px 0;
  position: relative;
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 8px;
    border-color: transparent transparent transparent #1299e6;
    right: -2px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    z-index: 3;
  }
  &:before {
    content: '';
    width: 5px;
    height: 5px;
    background-color: #1299e6;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    z-index: 3;
    border-radius: 50%;
  }
  input[type='range'] {
    width: 100%;
    appearance: none;
    outline: none;
    z-index: 2;
    &:active::-webkit-slider-thumb {
      box-shadow: 0 2px 5px -2px rgba(0, 0, 0, 0.4);
    }
    &::-webkit-slider-runnable-track {
      height: 1px;
      background-color: #1299e6;
      border: none;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 30px;
      border-radius: 20px;
      width: 80px;
      background: #1299e6;
      margin-top: -15px;
      cursor: grab;
    }
    &::-moz-focus-outer {
      border: none;
    }
    &::-moz-range-track {
      height: 1px;
      background-color: #1299e6;
      border: none;
    }
    &::-moz-range-thumb {
      -moz-appearance: none;
      border: none;
      height: 30px;
      border-radius: 20px;
      width: 80px;
      background: #1299e6;
      margin-top: -15px;
      cursor: grab;
    }
  }
  .slider-icon {
    position: absolute;
    left: 0;
    font-size: 10px;
    color: #eaeaea;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    width: 80px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    border-radius: 20px;
    z-index: 3;
  }
}
</style>
