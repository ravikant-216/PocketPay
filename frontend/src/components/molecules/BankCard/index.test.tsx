import { render, screen } from '@testing-library/react'
import BankCard from '.'
import '@testing-library/jest-dom/extend-expect'

describe('BankCard', () => {
  it('renders the icon title and arrow icon', () => {
    render(
      <BankCard
        iconTitle="Test Title"
        src="test-src"
        alt="test-alt"
        color="primary"
      />
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByTestId('KeyboardArrowRightIcon')).toBeInTheDocument()
  })
})
