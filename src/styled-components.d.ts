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
      caption1: 16
    }
    lineHeights: {
      caption1: 19
    }
  }
}
