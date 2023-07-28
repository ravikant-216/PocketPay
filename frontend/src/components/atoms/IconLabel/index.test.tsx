import { render, screen } from '@testing-library/react'
import IconLabel from '.'
import '@testing-library/jest-dom'

describe('IconLabel', () => {
  test('renders the icon', () => {
    render(
      <IconLabel
        iconTitle="Test Label"
        src="test-icon.png"
        alt="Test Icon"
        color="primary"
      />
    )

    const icon = screen.getByAltText('Test Icon')
    expect(icon).toBeInTheDocument()
  })

  test('renders the label', () => {
    render(
      <IconLabel
        iconTitle="Test Label"
        src="test-icon.png"
        alt="Test Icon"
        color="primary"
      />
    )

    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  test('icon has correct src attribute', () => {
    render(
      <IconLabel
        iconTitle="Test Label"
        src="test-icon.png"
        alt="Test Icon"
        color="primary"
      />
    )

    const icon = screen.getByAltText('Test Icon')
    expect(icon).toHaveAttribute('src', 'test-icon.png')
  })
})
