import { render } from '@testing-library/react'
import RecipientType from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'

test('renders "Who are you sending money to?" when type is "sendMoney"', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecipientType type="sendMoney" />
    </ThemeProvider>
  )
  const mainText = getByText('Who are you sending money to?')
  expect(mainText).toBeInTheDocument()
})

test('renders "What would you like to do today?" when type is "default"', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecipientType type="default" />
    </ThemeProvider>
  )
  const mainText = getByText('What would you like to do today?')
  expect(mainText).toBeInTheDocument()
})
