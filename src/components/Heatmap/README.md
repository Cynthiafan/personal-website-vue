# Heat map

`d3.js`

Show the frequency of customers-coming by hour intervals.

---

### Props

Props         | Type         | Default      | Description  |
--------------|--------------|--------------|--------------|
id            | string       | 'heatmap'    | To identify charts when you have multiple ones. |
hourStart     | number       | 0            |              |
hourEnd       | number       | 24           |              |
dataset       | { weekday: number, hour: number, value: number}[] | | Chart data. |     
rectHeight    | number       | 18           | Height of each rectangle. |
colors        | array        | ['#f6faaa', '#FEE08B', '#FDAE61'] | Customize colors with hex array. |