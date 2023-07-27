import type { Preview } from '@storybook/react'
import '../src/App.css'
import React from 'react'
import {ThemeProvider} from '@emotion/react'
import {BrowserRouter} from 'react-router-dom'
import theme from '../src/theme/index'

export const withMuiTheme = (Story) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  </ThemeProvider>
)
export const decorators = [withMuiTheme]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^(on|handle)[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
