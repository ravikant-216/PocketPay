import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import theme from '../../../theme'
import RecipientDetails from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Recipient Details', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails />
      </ThemeProvider>
    )

    const component = getByTestId('recipientDetails')
    expect(component).toBeInTheDocument()
  })

  it('should enable the button if all fields are filled', () => {
    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails />
      </ThemeProvider>
    )
    const emailInput = getByLabelText('Email')
    const accountInput = getByLabelText('Account number')
    const firstNameInput = getByLabelText('First name')
    const lastNameInput = getByLabelText('Last name')
    const ifscInput = getByLabelText('IFSC code')
    const continueButton = getByText('Continue')

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'test@example.com' },
    })
    fireEvent.change(accountInput, {
      target: { name: 'account', value: '123456789012' },
    })
    fireEvent.change(firstNameInput, {
      target: { name: 'firstName', value: 'Johny' },
    })
    fireEvent.change(lastNameInput, {
      target: { name: 'lastName', value: 'Michael' },
    })
    fireEvent.change(ifscInput, {
      target: { name: 'ifsc', value: 'ABCD1234567' },
    })

    expect(emailInput.getAttribute('value')).toBe('test@example.com')
    expect(accountInput.getAttribute('value')).toBe('123456789012')
    expect(firstNameInput.getAttribute('value')).toBe('Johny')
    expect(lastNameInput.getAttribute('value')).toBe('Michael')
    expect(ifscInput.getAttribute('value')).toBe('ABCD1234567')
    expect(continueButton).toBeEnabled()
  })

  it('should disable the button if any field is empty', () => {
    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails />
      </ThemeProvider>
    )
    const emailInput = getByLabelText('Email')
    const continueButton = getByText('Continue')

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'test@example.com' },
    })

    expect(emailInput.getAttribute('value')).toBe('test@example.com')
    expect(continueButton).toBeDisabled()
  })
  test('setDetails updates the state with the correct data when valid email is entered', () => {
    render(
      <ThemeProvider theme={theme}>
        <RecipientDetails />
      </ThemeProvider>
    )

    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, {
      target: { value: 'mario.gabriel@gmail.com' },
    })

    expect(
      screen.getByDisplayValue('mario.gabriel@gmail.com')
    ).toBeInTheDocument()
    expect(screen.getByDisplayValue('Mario')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Gabriel')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123456885865')).toBeInTheDocument()
  })
})
