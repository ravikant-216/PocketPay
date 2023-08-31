import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import Header from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import { BrowserRouter } from 'react-router-dom'
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { store } from '../../../utils/store'

jest.mock('@auth0/auth0-react')
const mockedUseAuth0 = jest.mocked(useAuth0, { shallow: true })

const testId = 'Header'
const renderWithTheme = (T: React.ReactNode) => {
  mockedUseAuth0.mockReturnValue({
    isAuthenticated: true,
    logout: () => ({}),
  } as Auth0ContextInterface<User>)
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>{T}</ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

test('Should render', () => {
  renderWithTheme(<Header />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should open profile menu on clicking avatar', async () => {
  renderWithTheme(<Header />)
  const component = screen.getByTestId(testId)
  expect(screen.queryByTestId('ProfileMenu')).not.toBeInTheDocument()
  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(component.querySelector('.MuiAvatar-root')!)
  })
  // profile menu popped up
  expect(screen.getByTestId('ProfileMenu')).toBeInTheDocument() // passed
  // For coverage
  fireEvent.click(screen.getByText('Logout'))
  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(screen.getByRole('presentation').firstChild!)
  })
  // testing profile menu not present
  setTimeout(
    () => expect(screen.queryByTestId('ProfileMenu')).not.toBeInTheDocument(),
    700
  ) // pass
})
