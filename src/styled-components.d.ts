import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black900: '#000'
      black800: '#121212'
      black500: '#7F7F7F'
      black300: '#2d2f38'
      black200: '#ebebf0'
      black0: '#fff'
      red500: '#EB5757'
    }
    fontSizes: {
      title: 32
      subHeader: 20
      body1: 18
      body2: 16
      caption1: 14
      caption2: 12
      caption3: 10
    }
    lineHeights: {
      title: 38
      subHeader: 24
      body1: 22
      body2: 19
      caption1: 17
      caption2: 14
      caption3: 12
    }
  }
}
