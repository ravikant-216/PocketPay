import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import SignIn from '.'
import { ThemeProvider } from '@emotion/react'
import { WELCOME_BACK } from '../../../strings/constants'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import { Auth0ContextInterface, User, useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { store } from '../../../utils/store'
import { Provider } from 'react-redux'

jest.mock('@auth0/auth0-react')
const mockedUseAuth0 = jest.mocked(useAuth0, { shallow: true })
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const renderWithTheme = (T: React.ReactNode) => {
  mockedAxios.get.mockResolvedValue({ data: [{ id: 0 }] })
  mockedAxios.post.mockResolvedValue({ data: { id: 0 } })
  mockedUseAuth0.mockReturnValue({
    loginWithRedirect: () => ({}),
    user: undefined,
    isAuthenticated: true,
    logout: () => ({}),
  } as Auth0ContextInterface<User>)
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>{T}</ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

describe('SignIn', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithTheme(<SignIn />)
    expect(getByText(WELCOME_BACK)).toBeInTheDocument()
    expect(getByText('Sign In')).toBeInTheDocument()
    expect(getByText('Remember me')).toBeInTheDocument()
    expect(getByText('Trouble logging in?')).toBeInTheDocument()
    expect(getByText('Or, Log in with')).toBeInTheDocument()
  })

  it('validates email input', () => {
    const { getByLabelText, getByText } = renderWithTheme(<SignIn />)
    const emailInput = getByLabelText('Email Address')

    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    expect(getByText('Invalid email address')).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect((emailInput as HTMLInputElement).value).toBe('test@example.com')
  })

  it('validates password input', () => {
    const { getByLabelText, getByText } = renderWithTheme(<SignIn />)
    const passwordInput = getByLabelText('Password')
    fireEvent.change(passwordInput, { target: { value: '12345' } })
    expect(
      getByText('Password must be at least 6 characters')
    ).toBeInTheDocument()

    fireEvent.change(passwordInput, { target: { value: '123456' } })
    expect((passwordInput as HTMLInputElement).value).toBe('123456')
  })

  it('disables sign in button when inputs are invalid', () => {
    const { getByLabelText, getByText } = renderWithTheme(<SignIn />)
    const emailInput = getByLabelText('Email Address')
    const passwordInput = getByLabelText('Password')
    const signInButton = getByText('Sign In')

    expect(signInButton).toBeDisabled()

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    expect(signInButton).not.toBeDisabled()
  })

  it('calls onSubmit prop with entered values when sign in button is clicked', () => {
    const onSubmit = jest.fn()
    const { getByLabelText, getByText } = renderWithTheme(
      <SignIn onSubmit={onSubmit} />
    )

    const emailInput = getByLabelText('Email Address')
    const passwordInput = getByLabelText('Password')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    fireEvent.click(getByText('Sign In'))

    expect(onSubmit).toHaveBeenCalledWith('test@example.com', '123456')
  })
  test('Checkbox with label "Remember me" is checked', () => {
    renderWithTheme(<SignIn />)
    const checkbox = screen.getByRole('checkbox', { name: /remember me/i })
    expect(checkbox).toBeChecked()
  })
  test('cliking googule icon', () => {
    mockedUseAuth0.mockReturnValueOnce({
      loginWithRedirect: () => ({}),
      user: {
        account_type: 'Personal Account',
        address: '122-Baker street',
        country: 'India',
        dob: '2002-08-03',
        email: 'sricharan.yella@zemosolabs.com',
        first_name: 'Sri Charan',
        id: 3,
        last_name: 'Yella',
        password: 'sricharan.yella@zemosolabs',
      } as User,
      isAuthenticated: true,
      logout: () => ({}),
    } as Auth0ContextInterface<User>)
    renderWithTheme(<SignIn />)
    const google = screen.getByAltText('Google Icon')
    expect(google).toBeInTheDocument()
    act(() => {
      fireEvent.click(google)
    })
  })
  test('clicking google icon with non existing user', () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] })
    mockedUseAuth0.mockReturnValueOnce({
      loginWithRedirect: () => ({}),
      user: {
        account_type: 'Personal Account',
        address: '122-Baker street',
        country: 'India',
        dob: '2002-08-03',
        email: 'sricharan.yella@zemosolabs.com',
        first_name: 'Sri Charan',
        id: 3,
        last_name: 'Yella',
        password: 'sricharan.yella@zemosolabs',
      } as User,
      isAuthenticated: true,
      logout: () => ({}),
    } as Auth0ContextInterface<User>)
    renderWithTheme(<SignIn />)
    const google = screen.getByAltText('Google Icon')
    expect(google).toBeInTheDocument()
    act(() => {
      fireEvent.click(google)
    })
  })
  test('clicking google icon with non existing user', () => {
    mockedAxios.post.mockRejectedValueOnce('Error Occurred')
    mockedUseAuth0.mockReturnValueOnce({
      loginWithRedirect: () => ({}),
      user: {
        account_type: 'Personal Account',
        address: '122-Baker street',
        country: 'India',
        dob: '2002-08-03',
        email: 'sricharan.yella@zemosolabs.com',
        first_name: 'Sri Charan',
        id: 3,
        last_name: 'Yella',
        password: 'sricharan.yella@zemosolabs',
      } as User,
      isAuthenticated: true,
      logout: () => ({}),
    } as Auth0ContextInterface<User>)
    renderWithTheme(<SignIn />)
    const google = screen.getByAltText('Google Icon')
    expect(google).toBeInTheDocument()
    act(() => {
      fireEvent.click(google)
    })
  })
  it('toggles password visibility when show password button is clicked', () => {
    const { getByLabelText, getByRole } = renderWithTheme(<SignIn />)
    const passwordInput = getByLabelText('Password')
    const showPasswordButton = getByRole('button', {
      name: 'toggle password visibility',
    })

    expect((passwordInput as HTMLInputElement).type).toBe('password')
    fireEvent.click(showPasswordButton)
    expect((passwordInput as HTMLInputElement).type).toBe('text')
  })
})
