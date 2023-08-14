import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SearchDropdown from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom'
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('SearchDropdown', () => {
  const onValueChange = jest.fn()
  test('renders the label and placeholder', () => {
    const onValueChange = jest.fn()
    const { getByLabelText, getByPlaceholderText } = renderWithTheme(
      <SearchDropdown
        options={['Option 1', 'Option 2', 'Option 3']}
        label="My Label"
        placeholder="My Placeholder"
        onValueChange={onValueChange}
      />
    )

    expect(getByLabelText('My Label')).toBeInTheDocument()
    expect(getByPlaceholderText('My Placeholder')).toBeInTheDocument()
  })

  test('renders the options when the input is focused', () => {
    const onValueChange = jest.fn()
    const { getByPlaceholderText, getAllByRole } = renderWithTheme(
      <SearchDropdown
        options={['Option 1', 'Option 2', 'Option 3']}
        label="My Label"
        placeholder="My Placeholder"
        onValueChange={onValueChange}
      />
    )

    fireEvent.mouseDown(getByPlaceholderText('My Placeholder'))

    expect(getAllByRole('option')).toHaveLength(3)
    expect(getAllByRole('option')[0]).toHaveTextContent('Option 1')
    expect(getAllByRole('option')[1]).toHaveTextContent('Option 2')
    expect(getAllByRole('option')[2]).toHaveTextContent('Option 3')
  })
  test('renders the footer when the variant prop is set to "footer"', async () => {
    const options = ['Option 1', 'Option 2', 'Option 3']
    const label = 'Test Label'

    const { getAllByRole, getByPlaceholderText } = renderWithTheme(
      <SearchDropdown
        options={options}
        label={label}
        variant="footer"
        placeholder="My Placeholder"
        onValueChange={() => {
          onValueChange
        }}
      />
    )
    fireEvent.mouseDown(getByPlaceholderText('My Placeholder'))
    expect(getAllByRole('option')).toHaveLength(3)
    expect(getAllByRole('option')[0]).toHaveTextContent('Option 1')
    expect(getAllByRole('option')[1]).toHaveTextContent('Option 2')
    expect(getAllByRole('option')[2]).toHaveTextContent('Option 3')
  })

  test('onValueChange returns correct value', () => {
    const onValueChange = jest.fn()
    const { getAllByRole, getByPlaceholderText } = renderWithTheme(
      <SearchDropdown
        options={['Option1', 'Option2']}
        placeholder="My Placeholder"
        onValueChange={onValueChange}
      />
    )
    fireEvent.mouseDown(getByPlaceholderText('My Placeholder'))
    expect(screen.getByText('Option1')).toHaveTextContent('Option1')
    expect(getAllByRole('option')).toHaveLength(2)
    fireEvent.click(getAllByRole('option')[0])
    expect(onValueChange).toHaveBeenCalledWith('Option1')
  })

  test('renders search icon when type is "search"', () => {
    const mockValueChange = jest.fn()
    renderWithTheme(
      <SearchDropdown
        options={['Option 1', 'Option 2']}
        type="search"
        onValueChange={mockValueChange}
      />
    )

    const searchIcon = screen.getByRole('img', { name: 'Search Icon' })
    expect(searchIcon).toBeInTheDocument()
  })
})
