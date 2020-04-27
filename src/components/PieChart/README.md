# Pie chart

`d3.js`

---

### Props

Props          | Type          | Default       | Description   |
---------------|---------------|---------------|---------------|
id             | string        | 'pieChart'    |               |
dataset        | { label: string, value: number }[] | | Chart data. |
legendPosition | string        | 'bottom'      | 'bottom', 'top', 'right' or 'left'. |
showLegend     | boolean       | true          | Whether to show legend or not. |
maxSvgWidth    | number        | 400           | Max width of the chart. |
svgHeight      | number        | 300           | Max height of the chart. |
margin         | { top, right, bottom, left } | { top: 30, right: 20, bottom: 30, left: 20 } | The margin of the chart. |
arcPadding     | number        | 3             | The width of the space between each pie. (px) |