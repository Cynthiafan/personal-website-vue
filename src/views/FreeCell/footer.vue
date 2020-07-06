<template lang="pug">
  footer.footer
    div.footer__left
      div.footer__left__icon
        img(src="~@/assets/images/free-cell/info.png")
      div.footer__left__timer
        div TIME: 
          span(v-if="hours") {{ hours | timeFormat }}:
          span {{ minutes | timeFormat }}:{{ seconds | timeFormat }}
      div.footer__left__score
        div SCORE: {{ score }}
    div.footer__right
      button(@click="emitAction('init')") NEW GAME
      button(@click="emitAction('restart')" :disabled="btnDisabled.restart") RESTART
      button(@click="emitAction('hint')") HINT
      button(@click="emitAction('undo')" :disabled="btnDisabled.undo") UNDO
</template>
<script>
export default {
  data() {
    return {
      minutes: 0,
      seconds: 0,
      hours: 0,
      score: Number(localStorage.getItem('fc/score')) || 0,
      timer: null,
    };
  },
  props: {
    btnDisabled: {
      type: Object,
    },
    isStartTimer: {
      type: Boolean,
    },
  },
  filters: {
    timeFormat(val) {
      return val.toString().padStart(2, '0');
    },
  },
  watch: {
    isStartTimer: {
      immediate: true,
      handler(val) {
        val ? this.startTimer() : this.resetTime();
      },
    },
  },
  created() {
    const time = JSON.parse(localStorage.getItem('fc/time'));

    if (time) {
      this.hours = time.hours;
      this.minutes = time.minutes;
      this.seconds = time.seconds;
    }
  },
  methods: {
    emitAction(type) {
      this.$emit('action', type);
    },
    addScore(s) {
      this.score += s;
    },
    minusScore(s) {
      this.score -= s;
    },
    pauseTimer() {
      window.clearInterval(this.timer);
    },
    startTimer() {
      this.timer = setInterval(this.updateTime, 1000);
    },
    saveStatus() {
      localStorage.setItem(
        'fc/time',
        JSON.stringify({
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
        }),
      );
      localStorage.setItem('fc/score', this.score);
    },
    resetTime() {
      window.clearInterval(this.timer);
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.score = 0;
      this.saveStatus();
    },
    updateTime() {
      this.seconds += 1;

      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes += 1;
      }

      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours += 1;
      }
      this.minusScore(1);
      this.saveStatus();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  @include flex(space-between, center, row);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 0;
  margin: 0 auto;
  width: calc(100% - 200px);
  color: $fc-black;
  border-top: 1px solid $fc-darkgray;
  &__left {
    @include flex(flex-start, center, row);
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    &__icon {
      border: 2px solid $fc-black;
      border-radius: 50%;
      margin-right: 10px;
      @include flex(center, center, row);
      img {
        width: 40px;
        height: 40px;
      }
    }
    &__timer {
      margin-right: 20px;
    }
  }
  &__right {
    button {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
