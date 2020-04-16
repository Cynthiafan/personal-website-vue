const getElement = el => document.querySelector(el);

const getElementDetail = el => el.getBoundingClientRect();

const getCenterCoordinate = el => {
  const { x, y, width, height } = getElementDetail(el);
  return {
    x: x + width / 2,
    y: y + height / 2,
  }
}

const getMidpoint = (p1, p2) => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  }
}

export function createParabolaService({ el, targetEl, speed = 38, autoStart = false, callback }) {

  const $el = getElement(el);
  const $targetEl = getElement(targetEl);

  let p1, p2, vertex, a, b, c, rate, offset, x, y;

  const init = () => {

    // start & end coordinate
    p1 = getCenterCoordinate($el);
    p2 = getCenterCoordinate($targetEl);

    // parabola vertex
    vertex = getMidpoint(p1, p2);

    // parabola formula: y = ax^2 + bx + c
    a = (p2.y - vertex.y) / Math.pow((p2.x - vertex.x), 2);
    b = (p1.y - p2.y - a * (p1.x * p1.x - p2.x * p2.x)) / (p1.x - p2.x);
    c = p1.y - a * p1.x * p1.x - b * p1.x;

    // to left or right
    rate = p1.x < p2.x ? 1 : -1;

    // 因應速度的位移量
    offset = Math.abs(p2.x - p1.x) / speed;

    // 初始化位置
    x = p1.x;
  }

  const start = () => {
    window.requestAnimationFrame(step);
  }

  const step = () => {
    y = a * x * x + b * x + c;

    $el.style.top = `${y}px`;
    $el.style.left = `${x}px`;

    x += offset * rate;

    if ((rate > 0 && x > p2.x) || (rate < 0 && x < p2.x)) {
      $el.remove();
      if (callback) callback();
    } else {
      window.requestAnimationFrame(step);
    }
  }

  (function () {
    init();
    if (autoStart) {
      start();
    }
  })()

  return {
    start,
  }

}