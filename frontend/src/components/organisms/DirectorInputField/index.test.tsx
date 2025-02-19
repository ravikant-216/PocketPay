import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import DirectorInputField from '.'
import { DOB } from '../../../strings/constants'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('DirectorInputField', () => {
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
      <DirectorInputField
        variant="director"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    expect(getByText('Confirm your business directors')).toBeInTheDocument()
  })

  it('handles input change', () => {
    const mockOnClick = jest.fn()
    const { getByPlaceholderText } = renderWithTheme(
      <DirectorInputField
        variant="director"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    const input = getByPlaceholderText('First Name') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'John' } })
    expect(input.value).toBe('John')
  })

  it('adds another form on icon click', () => {
    const mockOnClick = jest.fn()
    const { getByText, getAllByText } = renderWithTheme(
      <DirectorInputField
        variant="director"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    const icon = getByText('Add another director')
    fireEvent.click(icon)
    expect(getAllByText('First Name').length).toBe(4)
    const icon1 = getByText('Remove director')
    fireEvent.click(icon1)
    expect(getAllByText('First Name').length).toBe(2)
  })
  it('adds another form on icon click', () => {
    const mockOnClick = jest.fn()
    const { getByText, getAllByText } = renderWithTheme(
      <DirectorInputField
        variant="owner"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    const icon = getByText('Add another owner')
    fireEvent.click(icon)
    expect(getAllByText('First Name').length).toBe(4)
    const icon1 = getByText('Remove owner')
    fireEvent.click(icon1)
    expect(getAllByText('First Name').length).toBe(2)
  })
  it('handles last name input change', () => {
    const mockOnClick = jest.fn()
    const { getByPlaceholderText } = renderWithTheme(
      <DirectorInputField
        variant="director"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    const input = getByPlaceholderText('Last Name') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Doe' } })
    expect(input.value).toBe('Doe')
  })

  it('calls buttonOnClick with correct data', () => {
    const mockOnClick = jest.fn()
    const { getByText, getAllByRole, getByPlaceholderText } = renderWithTheme(
      <DirectorInputField
        variant="director"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    const firstNameInput = getByPlaceholderText(
      'First Name'
    ) as HTMLInputElement
    fireEvent.change(firstNameInput, { target: { value: 'John' } })

    const lastNameInput = getByPlaceholderText('Last Name') as HTMLInputElement
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })

    fireEvent.change(screen.getByLabelText(DOB), {
      target: { value: '11/11/1999' },
    })

    const countryDropdown = getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown)
    fireEvent.click(screen.getByText('India'))

    const button = getByText('Continue')
    expect(button).toBeEnabled
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledWith([
      {
        country: 'India',
        dob: '11/11/1999',
        firstName: 'John',
        lastName: 'Doe',
      },
    ])
  })
  it('renders director text when variant is director', () => {
    const mockOnClick = jest.fn()
    const { getByText } = renderWithTheme(
      <DirectorInputField
        variant="director"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    expect(getByText('Confirm your business directors')).toBeInTheDocument()
    expect(getByText('Director 1')).toBeInTheDocument()
  })

  it('renders shareholder text when variant is owner', () => {
    const mockOnClick = jest.fn()
    const { getByText } = renderWithTheme(
      <DirectorInputField
        variant="owner"
        buttonOnClick={mockOnClick}
        countryList={names}
      />
    )
    expect(getByText('Confirm your business owners')).toBeInTheDocument()
    expect(getByText('Shareholder 1')).toBeInTheDocument()
  })
})
