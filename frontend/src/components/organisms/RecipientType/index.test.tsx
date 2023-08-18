import { render } from '@testing-library/react'
import RecipientType from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
import { WHAT_ACCOUNT_SETUP } from '../../../strings/constants'

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

test('renders  "What kind of account would you like to open today?" when type is accountSetup', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecipientType type="accountType" />
    </ThemeProvider>
  )
  const mainText = getByText(WHAT_ACCOUNT_SETUP)
  expect(mainText).toBeInTheDocument()
})
