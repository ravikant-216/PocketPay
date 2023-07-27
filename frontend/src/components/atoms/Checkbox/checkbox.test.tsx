import { render, fireEvent } from '@testing-library/react'
import CheckboxLabels from './'
import '@testing-library/jest-dom/extend-expect'

describe('CheckboxLabels', () => {
  it('renders the label text', () => {
    const { getByText } = render(<CheckboxLabels label="Test Label" />)
    expect(getByText('Test Label')).toBeInTheDocument()
  })

  it('renders the checkbox as checked by default', () => {
    const { getByRole } = render(<CheckboxLabels label="Test Label" />)
    expect(getByRole('checkbox')).toBeChecked()
  })

  it('renders the checkbox as unchecked when checked prop is false', () => {
    const { getByRole } = render(
      <CheckboxLabels label="Test Label" checked={false} />
    )
    expect(getByRole('checkbox')).not.toBeChecked()
  })

  it('toggles the checkbox when clicked', () => {
    const { getByRole } = render(<CheckboxLabels label="Test Label" />)
    const checkbox = getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
