# Bar Chart

`d3.js`

### Features

- Mobile first.
- Show slider when the screen is too narrow to show all the bars.

### Parameters
Props        | Type        | Default     | Description |
-------------|-------------|-------------|-------------|
id           | string      | 'barChart'  | To identify charts when you have multiple ones. |
meta         | object      |             | Chart setting |
dateset      | { label: string, value: number }[] | | Chart data. |
colors       | array       |             | Customize bar color with hex array. |
svgHeight    | number      | 300         | Height of the chart. |
barWidth     | number      | 50          | Width of the bar.    |

```javascript
meta: {
  mode: 'normal' || 'stack',
  direction: 'horizontal' || 'vertical',
  xAxisLabel: '人數',
  yAxisLabel: '縣市地區',
  legend: [],
}
```