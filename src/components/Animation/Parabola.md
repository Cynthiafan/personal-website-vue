# Parabola 

`TypeScript` 

### Usage

```javascript

import { createParabola } from '@/utils/parabola';

function throwBall() {
  const parabola = createParabola(el, config);
  parabola.startAnimate();
}
```

### Parameters

Params       | Type        | Default     | Description |
-------------|-------------|-------------|-------------|
el           | HTMLElement |             | The element you want to throw. |
config       | Object      |             |             |

```javascript
config: {
  // Start position of the throwing element
  start: { x, y },

  // End position of the throwing element
  end: { x, y },

  // The status of the element after throwing finish: remove the element || back to start || stay at end
  afterStop: 'remove' || 'p1' || 'p2',

  // (optional) callback on animation finish
  onFinish,

  // (optional) callback on animation start
  onStart,
}
```