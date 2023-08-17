import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import theme from '../../../theme'
import RecipientDetails from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Recipient Details', () => {
  const mockOnClick = jest.fn()
  it('should render the component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails onClick={mockOnClick} />
      </ThemeProvider>
    )

    const component = getByTestId('recipientDetails')
    expect(component).toBeInTheDocument()
  })

  it('should enable the button if all fields are filled', () => {
    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails onClick={mockOnClick} />
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
        <RecipientDetails onClick={mockOnClick} />
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
        <RecipientDetails onClick={mockOnClick} />
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
  it('calls onClick with correct values when button is clicked', () => {
    const mockOnClick = jest.fn()
    const { getByText, getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails onClick={mockOnClick} />
      </ThemeProvider>
    )

    const emailInput = getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    const accountInput = getByLabelText('Account number')
    fireEvent.change(accountInput, { target: { value: '123456789012' } })

    const firstNameInput = getByLabelText('First name')
    fireEvent.change(firstNameInput, { target: { value: 'John' } })

    const lastNameInput = getByLabelText('Last name')
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })

    const ifscInput = getByLabelText('IFSC code')
    fireEvent.change(ifscInput, { target: { value: 'ABCD0123456' } })

    const continueButton = getByText('Continue')
    fireEvent.click(continueButton)

    expect(mockOnClick).toHaveBeenCalledWith({
      email: 'test@example.com',
      account: '123456789012',
      firstName: 'John',
      lastName: 'Doe',
      ifsc: 'ABCD0123456',
    })
  })
  it('should empty other fields when email field is empty', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails onClick={mockOnClick} />
      </ThemeProvider>
    )

    const emailInput = getByLabelText('Email')
    const accountInput = getByLabelText('Account number')
    const firstNameInput = getByLabelText('First name')
    const lastNameInput = getByLabelText('Last name')
    const ifscInput = getByLabelText('IFSC code')

    fireEvent.change(emailInput, {
      target: { value: 'mario.gabriel@gmail.com' },
    })

    fireEvent.change(emailInput, {
      target: { value: '' },
    })

    expect(emailInput.getAttribute('value')).toBe('')
    expect(accountInput.getAttribute('value')).toBe('')
    expect(firstNameInput.getAttribute('value')).toBe('')
    expect(lastNameInput.getAttribute('value')).toBe('')
    expect(ifscInput.getAttribute('value')).toBe('')
  })
  it('should render messages when given validation fails', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <RecipientDetails onClick={mockOnClick} />
      </ThemeProvider>
    )

    const emailInput = getByLabelText('Email')
    const ifscInput = getByLabelText('IFSC code')
    const accountInput = getByLabelText('Account number')

    fireEvent.change(emailInput, {
      target: { value: 'mario.gabriel@gmail.com' },
    })

    fireEvent.change(emailInput, {
      target: { value: '' },
    })

    fireEvent.change(emailInput, {
      target: { value: 'user@gmail' },
    })
    fireEvent.change(ifscInput, {
      target: { value: '123' },
    })

    fireEvent.change(accountInput, {
      target: { value: '133' },
    })

    const emailError = screen.getByText('Invalid email address')
    const ifscError = screen.getByText('Invalid ifsc code')

    const accountError = screen.getByText('Invalid account number')
    expect(emailError).toBeInTheDocument()
    expect(ifscError).toBeInTheDocument()
    expect(accountError).toBeInTheDocument()
  })
})
