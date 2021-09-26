import { createTheme, ThemeOptions } from '@material-ui/core'
import { deepPurple, lightBlue } from '@material-ui/core/colors'

export const paletteColorsDark = {
  primary: deepPurple[500],
  secondary: '#3282b8',
  error: '#E44C65',
  background: '#1b262c',
  text: '#bbe1fa',
}

export const paletteColorsLight = {
  primary: lightBlue[500],
  secondary: '#ffe0ac',
  error: '#E44C65',
  background: '#f9f9f9',
  text: '#050505',
}

const options = (dark: boolean): ThemeOptions => {
  const paletteColors = dark ? paletteColorsDark : paletteColorsLight
  return {
    palette: {
      type: dark ? 'dark' : 'light',
      primary: {
        main: paletteColors.primary,
      },
    }
  }
}
export const darkTheme = createTheme(options(true))
export const lightTheme = createTheme(options(false))
