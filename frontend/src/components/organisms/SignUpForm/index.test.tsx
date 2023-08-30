import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUpForm from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'

import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

jest.mock('@auth0/auth0-react')
const mockedUseAuth0 = jest.mocked(useAuth0, { shallow: true })
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
beforeAll(() => {
  mockedAxios.get.mockResolvedValue({ data: [{ id: 0 }] })
  mockedAxios.post.mockResolvedValue({ data: { id: 0 } })
  mockedUseAuth0.mockReturnValue({
    loginWithRedirect: () => ({}),
    user: undefined,
    isAuthenticated: true,
    logout: () => ({}),
  } as Auth0ContextInterface<User>)
})

const mockClick = jest.fn()
test('Should render', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    </ThemeProvider>
  )
  expect(screen.getByTestId('SignUpForm')).toBeInTheDocument()
})

test('The component should disable the "Next" button when the email input is empty or invalid', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
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

test('The component should disable the "Next" button when the email input is empty or invalid', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    </ThemeProvider>
  )
  fireEvent.click(screen.getByAltText('Google Icon'))
  expect(screen.getByText('Next')).toBeDisabled()
})
test('The component should enable the "Next" button when the email input is filled with a valid email address', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['http://localhost:3001/']}>
        <SignUpForm onSubmit={mockClick} />
      </MemoryRouter>
    </ThemeProvider>
  )
  const component = screen.getByTestId('SignUpForm')
  const emailInput = component.querySelector('input')
  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: 'valid@email.com' } })
    fireEvent.click(screen.getByText('Next'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  expect(screen.getByText('Next')).not.toBeDisabled()
  fireEvent.click(screen.getByTestId('login'))
})
