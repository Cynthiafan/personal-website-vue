<template lang="pug">
  div#parabola
    img.ball(src="../../assets/images/basketball.svg")
    img.hole(src="../../assets/images/hole.svg")
    button.btn-throw(@click="throwBall" :disabled="!isBtnClickable") Throw ball
</template>
<script>
import { createParabola } from '@/utils/parabola.utils';
import { cloneAndSetStyle } from '@/utils/html.utils';

export default {
  data() {
    return {
      isBtnClickable: true,
    };
  },
  methods: {
    throwBall() {
      const ball = document.querySelector('.ball');
      const hole = document.querySelector('.hole');

      const { x: startX, y: startY, width: ballW, height: ballH } = ball.getBoundingClientRect();
      const { x: holeX, y: holeY, width: holeWidth, height: holeHeight } = hole.getBoundingClientRect();

      const endX = holeX + holeWidth / 2 - ballW / 2;
      const endY = holeY + holeHeight / 2 - ballH / 2;

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
#parabola {
  padding: 10px;
}
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
.btn-throw {
  color: #fff;
  background-color: $color-classicBlue;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
}
</style>