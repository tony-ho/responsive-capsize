import { createStyleObject, FontMetrics } from '@capsizecss/core'
import zipWith from 'lodash.zipwith'

type CapsizeStyles = ReturnType<typeof createStyleObject>

type CapHeightWithLeading = {
  capHeight: number[]
  leading: number[]
  fontMetrics: FontMetrics
}

type CapHeightWithLineGap = {
  capHeight: number[]
  lineGap: number[]
  fontMetrics: FontMetrics
}

type FontSizeWithLeading = {
  fontSize: number[]
  leading: number[]
  fontMetrics: FontMetrics
}

type FontSizeWithLineGap = {
  fontSize: number[]
  lineGap: number[]
  fontMetrics: FontMetrics
}

export type ResponsiveCapsizeOptions =
  | CapHeightWithLineGap
  | CapHeightWithLeading
  | FontSizeWithLineGap
  | FontSizeWithLeading

export type ResponsiveCapsizeStyles = {
  fontSize: string[]
  lineHeight: string[]
  '::before': {
    content: string
    marginBottom: string[]
    display: string
  }
  '::after': {
    content: string
    marginTop: string[]
    display: string
  }
}

export default function responsiveCapsize(
  options: ResponsiveCapsizeOptions
): ResponsiveCapsizeStyles {
  const { fontMetrics } = options

  if ('capHeight' in options) {
    const { capHeight } = options
    if (capHeight.length < 1) {
      throw new Error('Must provide at least one `capHeight`')
    }
    if ('leading' in options) {
      const { leading } = options
      return mergeCapsizeStyles(
        zipWith(capHeight, leading, (c, l) =>
          createStyleObject({
            capHeight: c ?? capHeight[capHeight.length - 1],
            leading:
              l ??
              (leading.length > 0 ? leading[leading.length - 1] : undefined),
            fontMetrics
          })
        )
      )
    }

    const { lineGap } = options
    if (lineGap.length < 1) {
      throw new Error('Must provide at least one `lineGap`')
    }
    return mergeCapsizeStyles(
      zipWith(capHeight, lineGap, (c, l) =>
        createStyleObject({
          capHeight: c ?? capHeight[capHeight.length - 1],
          lineGap: l ?? lineGap[lineGap.length - 1],
          fontMetrics
        })
      )
    )
  }

  const { fontSize } = options
  if (fontSize.length < 1) {
    throw new Error('Must provide at least one `fontSize`')
  }
  if ('leading' in options) {
    const { leading } = options
    return mergeCapsizeStyles(
      zipWith(fontSize, leading, (f, l) =>
        createStyleObject({
          fontSize: f ?? fontSize[fontSize.length - 1],
          leading:
            l ?? (leading.length > 0 ? leading[leading.length - 1] : undefined),
          fontMetrics
        })
      )
    )
  }

  const { lineGap } = options
  if (lineGap.length < 1) {
    throw new Error('Must provide at least one `lineGap`')
  }
  return mergeCapsizeStyles(
    zipWith(fontSize, lineGap, (f, l) =>
      createStyleObject({
        fontSize: f ?? fontSize[fontSize.length - 1],
        lineGap: l ?? lineGap[lineGap.length - 1],
        fontMetrics
      })
    )
  )
}

function mergeCapsizeStyles(styles: CapsizeStyles[]): ResponsiveCapsizeStyles {
  return {
    ...styles[0],
    fontSize: styles.map(s => s.fontSize),
    lineHeight: styles.map(s => s.lineHeight),
    '::before': {
      ...styles[0]['::before'],
      marginBottom: styles.map(s => s['::before'].marginBottom)
    },
    '::after': {
      ...styles[0]['::after'],
      marginTop: styles.map(s => s['::after'].marginTop)
    }
  }
}
