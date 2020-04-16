<template lang="pug">
  div#parabola
    img.ball(src="../../assets/images/basketball.svg")
    img.hole(src="../../assets/images/hole.svg")
    button(@click="throwBall" :disabled="!isBtnClickable") Throw ball
</template>
<script>
import { createParabola } from '@/utils/parabola.v2';
import { cloneAndSetStyle } from '@/utils/html.utils';

export default {
  data() {
    return {
      isBtnClickable: true,
    };
  },
  methods: {
    throwBall() {
      let ball = document.querySelector('.ball');
      let hole = document.querySelector('.hole');

      let { x: startX, y: startY, width: ballW, height: ballH } = ball.getBoundingClientRect();
      let { x: holeX, y: holeY, width: holeWidth, height: holeHeight } = hole.getBoundingClientRect();

      let endX = holeX + holeWidth / 2 - ballW / 2;
      let endY = holeY + holeHeight / 2 - ballH / 2;

      const cloneBall = cloneAndSetStyle(ball);

      const parabola = createParabola(cloneBall, {
        start: { x: startX, y: startY },
        end: { x: endX, y: endY },
        onStart: () => {
          this.isBtnClickable = false;
        },
        onFinish: () => {
          this.isBtnClickable = true;
        },
      });

      parabola.startAnimate();
    },
  },
};
</script>
<style lang="scss" scoped>
.ball {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 40px;
}
.hole {
  width: 60px;
  position: absolute;
  right: 60px;
  bottom: 60px;
}
</style>