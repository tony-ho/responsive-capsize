# Responsive Capsize

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D10-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Responsive Capsize provides an alternative to generating [Capsize](https://seek-oss.github.io/capsize/) styles for different breakpoints and combining them manually into the responsive arrays format used by [Styled System](https://styled-system.com/), [Theme UI](https://theme-ui.com/), and others.

## Install

```sh
npm install responsive-capsize
```

## Usage

```js
import responsiveCapsize from 'responsive-capsize'

const styles = responsiveCapsize({
  capHeight: [16, 32],
  lineGap: [8, 16],
  fontMetrics: {
    capHeight: 700,
    ascent: 1058,
    descent: -291,
    lineGap: 0,
    unitsPerEm: 1000
  }
})
```
