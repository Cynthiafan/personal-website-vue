# Date range picker

`vue` `date-fns/fp` `grid`

### Features

- Mobile first.
- Scroll to the current month at first.
- Render more months automatically when scrolling to the top.
- replace `moment.js` with `date-fns.js`.

### Props

Name      | Type    | Default | Description
----------|---------|---------|--------
minDate   | string(yyyy/m/d)  |         | The earliest day that user can select. |
maxDate   | string(yyyy/m/d)  | (yesterday) | The lateset day that user can select.    |
defaultRenderMonths | number | 6 | The amount of months that render at the first. |
maxRangeLength | number |     | Limit of the days that user can select.  |
exceedLengthErrorMsg | string | | The error message when selected days have exceed the limit.  |

### Return

```javascript
{
  dateStart: 'yyyy/m/d',
  dateEnd: 'yyyy/m/d',
}
```