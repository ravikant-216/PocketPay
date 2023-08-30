import { render, fireEvent, screen } from '@testing-library/react'
import DetailsForm from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { DOB } from '../../../strings/constants'
import '@testing-library/jest-dom'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('DetailsForm', () => {
  const names = [
    {
      key: 'India',
      iconTitle: 'India',
      src: '/path/to/india/flag/image',
      alt: 'India Flag',
    },
  ]

  it('renders correctly', () => {
    const mockOnClick = jest.fn()
    const { getByText } = renderWithTheme(
      <DetailsForm buttonOnClick={mockOnClick} countryList={names} />
    )
    expect(getByText('Fill in your details')).toBeInTheDocument()
    expect(
      getByText(
        'Since you’re opening the account, we need to know a bit more about you.'
      )
    ).toBeInTheDocument()
  })

  it('calls buttonOnClick with form data on button click', () => {
    const mockOnClick = jest.fn()
    const { getByText, getAllByRole, getByLabelText } = renderWithTheme(
      <DetailsForm buttonOnClick={mockOnClick} countryList={names} />
    )
    fireEvent.change(getByLabelText('First Name'), {
      target: { value: 'Ravi' },
    })
    fireEvent.change(getByLabelText('Last Name'), {
      target: { value: 'Kant' },
    })
    fireEvent.change(getByLabelText(DOB), {
      target: { value: '1998-01-30' },
    })
    expect(getByText('Continue')).toBeDisabled()
    const countryDropdown = getAllByRole('button')[0]
    fireEvent.mouseDown(countryDropdown)
    fireEvent.click(screen.getByText('India'))

    fireEvent.change(getByLabelText('Home Address'), {
      target: { value: 'Nutan Nagar' },
    })
    fireEvent.click(getByText('Continue'))
    expect(mockOnClick).toHaveBeenCalledWith({
      firstName: 'Ravi',
      lastName: 'Kant',
      dob: '1998-01-30',
      country: 'India',
      address: 'Nutan Nagar',
    })
    expect(getByText('Continue')).not.toBeDisabled()
  })
})
