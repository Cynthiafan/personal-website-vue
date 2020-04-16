interface ParabolaConfig {
  start: Coordinate,
  end: Coordinate,
  afterStop?: string,
  speed?: number,
  onStart?: () => void,
  onFinish?: () => void,
}

interface Coordinate {
  x: number,
  y: number,
}

export function createParabola(el: HTMLElement, config: ParabolaConfig): any {

  const { start, end, speed = 26, afterStop = 'remove', onFinish, onStart } = config;

  let isThrowing = false;

  // initial coordinate
  let x: number = start.x;
  let y: number = start.y;

  const vertex: Coordinate = getMidpoint(start, end);

  // parabola formula: y = ax^2 + bx + c
  const a: number = (end.y - vertex.y) / Math.pow((end.x - vertex.x), 2);
  const b: number = (start.y - end.y - a * (start.x * start.x - end.x * end.x)) / (start.x - end.x);
  const c: number = start.y - a * start.x * start.x - b * start.x;

  // throwing direction
  const rate: number = start.x < end.x ? 1 : -1;

  // moving distance
  const offset: number = Math.abs(end.x - start.x) / speed;

  function startAnimate(): void {
    if (!isThrowing) {
      isThrowing = true;
      if (onStart) {
        onStart();
      }
    }
    window.requestAnimationFrame(frames);
  }

  function frames(): void {
    y = a * x * x + b * x + c;

    el.style.top = `${y}px`;
    el.style.left = `${x}px`;

    x += offset * rate;

    const isFinish: boolean = (rate > 0 && x > end.x && y > end.y) || (rate < 0 && x < end.x);

    if (!isFinish) {
      window.requestAnimationFrame(frames);
    } else {

      switch (afterStop) {
        case 'remove':
          el.remove();
          break;
        case 'p2':
          break;
        case 'p1':
          el.style.top = `${start.y}px`;
          el.style.left = `${start.x}px`;
          break;
      }
      if (onFinish) {
        isThrowing = false;
        onFinish();
      }
    }
  }

  return {
    startAnimate,
  };
}

function getMidpoint(p1: Coordinate, p2: Coordinate): Coordinate {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}
