import capsize, { CapsizeStyles } from 'capsize'
import responsiveCapsize, { ResponsiveCapsizeStyles } from '../src'

const fontMetrics = {
  capHeight: 1456,
  ascent: 1900,
  descent: -500,
  lineGap: 0,
  unitsPerEm: 2048
}

describe('options validation', () => {
  test('throws on empty capHeight', () => {
    expect(() =>
      responsiveCapsize({
        fontMetrics,
        capHeight: [],
        lineGap: [24]
      })
    ).toThrow()
  })

  test('throws on empty fontSize', () => {
    expect(() =>
      responsiveCapsize({
        fontMetrics,
        fontSize: [],
        lineGap: [24]
      })
    ).toThrow()
  })

  test('throws on capHeight with empty lineGap', () => {
    expect(() =>
      responsiveCapsize({
        fontMetrics,
        capHeight: [48],
        lineGap: []
      })
    ).toThrow()
  })

  test('throws on fontSize with empty lineGap', () => {
    expect(() =>
      responsiveCapsize({
        fontMetrics,
        fontSize: [48],
        lineGap: []
      })
    ).toThrow()
  })

  test('allows capHeight with empty leading', () => {
    expect(() =>
      responsiveCapsize({
        fontMetrics,
        capHeight: [48],
        leading: []
      })
    ).not.toThrow()
  })

  test('allows fontSize with empty leading', () => {
    expect(() =>
      responsiveCapsize({
        fontMetrics,
        fontSize: [48],
        leading: []
      })
    ).not.toThrow()
  })
})

describe('matches Capsize output', () => {
  test('capHeight with leading', () => {
    const options = { capHeight: 48, leading: 72 }
    const capsizeStyles = capsize({ fontMetrics, ...options })
    const styles = responsiveCapsize({
      fontMetrics,
      capHeight: [options.capHeight],
      leading: [options.leading]
    })

    assertStyles(capsizeStyles, styles)
  })

  test('capHeight with lineGap', () => {
    const options = { capHeight: 48, lineGap: 24 }

    const capsizeStyles = capsize({ fontMetrics, ...options })
    const styles = responsiveCapsize({
      fontMetrics,
      capHeight: [options.capHeight],
      lineGap: [options.lineGap]
    })

    assertStyles(capsizeStyles, styles)
  })

  test('fontSize with leading', () => {
    const options = { fontSize: 48, leading: 72 }

    const capsizeStyles = capsize({ fontMetrics, ...options })
    const styles = responsiveCapsize({
      fontMetrics,
      fontSize: [options.fontSize],
      leading: [options.leading]
    })

    assertStyles(capsizeStyles, styles)
  })

  test('fontSize with lineGap', () => {
    const options = { fontSize: 48, lineGap: 24 }

    const capsizeStyles = capsize({ fontMetrics, ...options })
    const styles = responsiveCapsize({
      fontMetrics,
      fontSize: [options.fontSize],
      lineGap: [options.lineGap]
    })

    assertStyles(capsizeStyles, styles)
  })

  function assertStyles(
    expected: CapsizeStyles,
    actual: ResponsiveCapsizeStyles
  ) {
    assertResponsiveStyles([expected], actual)
    expect(actual['::before'].content).toEqual(expected['::before'].content)
    expect(actual['::before'].display).toEqual(expected['::before'].display)
    expect(actual['::after'].content).toEqual(expected['::after'].content)
    expect(actual['::after'].display).toEqual(expected['::after'].display)
  }

  test('arrays of same length', () => {
    const capHeight = [48, 96]
    const lineGap = [24, 48]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[0],
      lineGap: lineGap[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[1],
      lineGap: lineGap[1]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      capHeight,
      lineGap
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('capHeight with repeated lineGap', () => {
    const capHeight = [48, 96]
    const lineGap = [24]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[0],
      lineGap: lineGap[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[1],
      lineGap: lineGap[0]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      capHeight,
      lineGap
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('repeated capHeight with lineGap', () => {
    const capHeight = [48]
    const lineGap = [24, 48]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[0],
      lineGap: lineGap[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[0],
      lineGap: lineGap[1]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      capHeight,
      lineGap
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('fontSize with repeated lineGap', () => {
    const fontSize = [48, 96]
    const lineGap = [24]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[0],
      lineGap: lineGap[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[1],
      lineGap: lineGap[0]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      fontSize,
      lineGap
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('repeated fontSize with lineGap', () => {
    const fontSize = [48]
    const lineGap = [24, 48]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[0],
      lineGap: lineGap[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[0],
      lineGap: lineGap[1]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      fontSize,
      lineGap
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('capHeight with repeated leading', () => {
    const capHeight = [48, 96]
    const leading = [72]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[0],
      leading: leading[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[1],
      leading: leading[0]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      capHeight,
      leading
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('repeated capHeight with leading', () => {
    const capHeight = [48]
    const leading = [72, 144]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[0],
      leading: leading[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      capHeight: capHeight[0],
      leading: leading[1]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      capHeight,
      leading
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('fontSize with repeated leading', () => {
    const fontSize = [48, 96]
    const leading = [72]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[0],
      leading: leading[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[1],
      leading: leading[0]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      fontSize,
      leading
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  test('repeated fontSize with leading', () => {
    const fontSize = [48]
    const leading = [72, 144]

    const firstCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[0],
      leading: leading[0]
    })
    const secondCapsizeStyles = capsize({
      fontMetrics,
      fontSize: fontSize[0],
      leading: leading[1]
    })
    const styles = responsiveCapsize({
      fontMetrics,
      fontSize,
      leading
    })

    assertResponsiveStyles([firstCapsizeStyles, secondCapsizeStyles], styles)
  })

  function assertResponsiveStyles(
    expected: CapsizeStyles[],
    actual: ResponsiveCapsizeStyles
  ) {
    expect(actual.fontSize.length).toEqual(expected.length)
    actual.fontSize.map((s, i) => expect(s).toEqual(expected[i].fontSize))

    expect(actual.lineHeight.length).toEqual(expected.length)
    actual.lineHeight.map((s, i) => expect(s).toEqual(expected[i].lineHeight))

    expect(actual['::before'].marginBottom.length).toEqual(expected.length)
    actual['::before'].marginBottom.map((s, i) =>
      expect(s).toEqual(expected[i]['::before'].marginBottom)
    )

    expect(actual['::after'].marginTop.length).toEqual(expected.length)
    actual['::after'].marginTop.map((s, i) =>
      expect(s).toEqual(expected[i]['::after'].marginTop)
    )
  }
})
