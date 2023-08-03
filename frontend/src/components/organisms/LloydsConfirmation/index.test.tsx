import { render } from '@testing-library/react'
import LloydsConfirmation from '.'

import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
test('renders LloydsConfirmation component', () => {
  const { getByTestId, getByAltText } = render(
    <ThemeProvider theme={theme}>
      <LloydsConfirmation />
    </ThemeProvider>
  )

  const component = getByTestId('LloydsConfirmation')
  expect(component).toBeInTheDocument()

  expect(getByAltText('lock icon')).toBeInTheDocument()
})
