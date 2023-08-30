import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from '../../theme'
import RequireAuth from './RequireAuth'

jest.mock('@auth0/auth0-react')
const mockedUseAuth0 = jest.mocked(useAuth0, { shallow: true })
jest.mock('axios')
const renderWithTheme = (T: React.ReactNode) => {
  mockedUseAuth0.mockReturnValue({
    isAuthenticated: true,
  } as Auth0ContextInterface<User>)
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{T}</ThemeProvider>
    </BrowserRouter>
  )
}

test('Should render', () => {
  mockedUseAuth0.mockReturnValueOnce({
    isAuthenticated: false,
  } as Auth0ContextInterface<User>)
  renderWithTheme(<RequireAuth>hello</RequireAuth>)
  expect(screen.queryByText('hello')).not.toBeInTheDocument()
})

test('Should render', () => {
  renderWithTheme(<RequireAuth>hello</RequireAuth>)
  expect(screen.getByText('hello')).toBeInTheDocument()
})
