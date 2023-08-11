import { render, screen } from '@testing-library/react'
import SearchBusiness from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('SearchBusiness', () => {
  test('renders heading and subheading', () => {
    const mockOnChange = jest.fn()
    renderWithTheme(<SearchBusiness onValueChange={mockOnChange} />)

    const heading = screen.getByRole('heading', {
      name: /search for your business/i,
    })
    expect(heading).toBeInTheDocument()

    const subheading = screen.getByText(
      /sole trader, freelancer or not registered with companies house\?/i
    )
    expect(subheading).toBeInTheDocument()
  })

  test('renders heading and subheading', () => {
    const onValueChange = jest.fn()
    renderWithTheme(<SearchBusiness onValueChange={onValueChange} />)

    const heading = screen.getByRole('heading', {
      name: /search for your business/i,
    })
    expect(heading).toBeInTheDocument()

    const subheading = screen.getByText(
      /sole trader, freelancer or not registered with companies house\?/i
    )
    expect(subheading).toBeInTheDocument()
  })
})
