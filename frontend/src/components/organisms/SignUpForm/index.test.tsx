import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUpForm from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'

import { act } from 'react-dom/test-utils'

test('Should render', () => {
  render(
    <ThemeProvider theme={theme}>
      <SignUpForm />
    </ThemeProvider>
  )
  expect(screen.getByTestId('SignUpForm')).toBeInTheDocument()
})

test('The component should disable the "Next" button when the email input is empty or invalid', () => {
  render(
    <ThemeProvider theme={theme}>
      <SignUpForm />
    </ThemeProvider>
  )
  const component = screen.getByTestId('SignUpForm')
  const emailInput = component.querySelector('input')

  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: '' } })
  })
  expect(screen.getByText('Next')).toBeDisabled()

  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: 'invalid-email' } })
  })

  expect(screen.getByText('Next')).toBeDisabled()
})

test('The component should enable the "Next" button when the email input is filled with a valid email address', () => {
  render(
    <ThemeProvider theme={theme}>
      <SignUpForm />
    </ThemeProvider>
  )
  const component = screen.getByTestId('SignUpForm')
  const emailInput = component.querySelector('input')
  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: 'valid@email.com' } })
  })

  expect(screen.getByText('Next')).not.toBeDisabled()
})
