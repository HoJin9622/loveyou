import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black900: '#000'
      black800: '#121212'
      black500: '#7F7F7F'
      black0: '#fff'
    }
    fontSizes: {
      title: 32
      body1: 18
      caption1: 16
      caption2: 12
      caption3: 10
    }
    lineHeights: {
      title: 38
      body1: 22
      caption1: 19
      caption2: 14
      caption3: 12
    }
  }
}
