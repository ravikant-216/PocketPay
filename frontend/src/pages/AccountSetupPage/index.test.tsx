import { ThemeProvider } from '@emotion/react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { AccountSetupPage } from '.'
import theme from '../../theme'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('AccountSetupPage', () => {
  const names = [
    {
      key: 'India',
      iconTitle: 'India',
      src: '/path/to/india/flag/image',
      alt: 'India Flag',
    },
  ]
  const mockFunction = jest.fn()
  it('renders the RecipientType component by default', () => {
    renderWithTheme(
      <AccountSetupPage
        onClick={mockFunction}
        onBackClick={mockFunction}
        countryList={[]}
      />
    )
    expect(screen.getByText('Personal Account')).toBeInTheDocument()
    expect(screen.getByText('Business Account')).toBeInTheDocument()
  })

  it('renders the PhoneNumber component when the value is 3', () => {
    const { getAllByRole } = renderWithTheme(
      <AccountSetupPage
        onClick={mockFunction}
        onBackClick={mockFunction}
        countryList={names}
      />
    )
    fireEvent.click(screen.getByText('Personal Account'))

    const countryDropdown = getAllByRole('button')[0]
    const countryDropdownButton = getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown)
    fireEvent.click(screen.getByText('India'))
    fireEvent.click(countryDropdownButton)
    expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
  })

  it('calls the onClick prop when the Continue button is clicked on the last step', () => {
    const onClick = jest.fn()
    const mockFunction1 = jest.fn()
    const { getAllByRole } = renderWithTheme(
      <AccountSetupPage
        onClick={onClick}
        onBackClick={mockFunction1}
        countryList={names}
      />
    )
    fireEvent.click(screen.getByText('Personal Account'))

    const countryDropdown1 = getAllByRole('button')[0]
    const countryDropdownButton = getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown1)
    fireEvent.click(screen.getByText('India'))
    fireEvent.click(countryDropdownButton)
    //
    const countryDropdown = screen.getByTestId('downButton')
    fireEvent.click(countryDropdown)
    expect(screen.getByTestId('Typography')).toBeInTheDocument
    const countryDropdown2 = screen.getAllByRole('button')[0]
    const countryDropdownButton2 = screen.getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown2)
    fireEvent.click(screen.getAllByTestId('Typography')[0])
    fireEvent.click(countryDropdownButton2)

    //
    fireEvent.change(screen.getByLabelText('Mobile Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(
      screen.getByRole('button', { name: 'I didn’t receive a code' })
    )
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.change(screen.getByLabelText('Enter code here'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByText('Submit'))
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Ravi123@' },
    })
    fireEvent.click(screen.getByText('Continue'))
    expect(onClick).toHaveBeenCalled()
  })

  it('calls the onBackClick prop when the back button is clicked on the first step', () => {
    const onBackClick = jest.fn()
    renderWithTheme(
      <AccountSetupPage
        onClick={mockFunction}
        onBackClick={onBackClick}
        countryList={names}
      />
    )
    fireEvent.click(screen.getByAltText('back'))
    expect(onBackClick).toHaveBeenCalled()
  })
  it('renders the CountrySelect component when the value is 4', () => {
    const accountType = jest.fn()
    renderWithTheme(
      <AccountSetupPage
        onClick={mockFunction}
        onBackClick={mockFunction}
        accountType={accountType}
        countryList={[]}
      />
    )
    fireEvent.click(screen.getByText('Business Account'))
    expect(accountType).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.click(screen.getByText('Personal Account'))
    expect(accountType).toHaveBeenCalledTimes(2)
  })
})
