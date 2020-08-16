# Responsive Capsize

<p>
  <img alt="Version" src="https://img.shields.io/npm/v/responsive-capsize" />
  <img src="https://img.shields.io/node/v/responsive-capsize" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/responsive-capsize" />
  </a>
</p>

> Responsive Capsize generates [Capsize](https://seek-oss.github.io/capsize/) text styles for multiple breakpoints using responsive arrays.

## Install

```sh
npm install responsive-capsize
```

## Usage

Use the [Capsize website](https://seek-oss.github.io/capsize/) to find the `fontMetrics` values for the specified font.

Responsive Capsize accepts [responsive arrays](https://styled-system.com/css/#responsive-arrays) for the following input values:

- `capHeight` or `fontSize` for defining the size of text
- `lineGap` or `leading` for specifying line height. If you pass neither, the text will follow the default spacing of the specified font eg. `line-height: normal`

See the [Capsize documentation](https://github.com/seek-oss/capsize/blob/master/packages/capsize/README.md) for further information.

```js
import responsiveCapsize from 'responsive-capsize'

const fontMetrics = {
  capHeight: 1456,
  ascent: 1900,
  descent: -500,
  lineGap: 0,
  unitsPerEm: 2048
}

const capsizedTextStyles = responsiveCapsize({
  fontMetrics,
  capHeight: [24, 48],
  lineGap: [12, 24]
})
```

## Examples

The output styles can be used in the following ways.

Included in a [Theme UI styles object](https://theme-ui.com/theme-spec#styles):

```js
export default {
  styles: {
    h1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      ...capsizedTextStyles
    }
  }
}
```

Added to an element using [Theme UI's `sx` prop](https://theme-ui.com/sx-prop):

```js
export default props => (
  <h1
    sx={{
      ...capsizedTextStyles
    }}
  >
    Responsive Heading
  </h1>
)
```

Added to an element using [Styled System's `css` prop](https://styled-system.com/css):

```js
export default props =>
  <h1
    css={css({
      ...capsizedTextStyles
    }}
  >
    Responsive Heading
  </h1>
)
```
