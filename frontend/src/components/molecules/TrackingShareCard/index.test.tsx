import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import TrackingShareCard, { TrackingShareCardProps } from '.'

const testData: TrackingShareCardProps = {
  heading: 'Test Heading',
  subHeading: 'Test Subheading',
  onClickEmail: jest.fn(),
  onClickShare: jest.fn(),
  open: true,
}

describe('TrackingShareCard', () => {
  test('renders the component with the provided props', () => {
    render(<TrackingShareCard {...testData} />)

    const emailIcon = screen.getByTestId('email-icon')
    const shareIcon = screen.getByTestId('share-icon')

    expect(emailIcon).toBeInTheDocument()
    expect(shareIcon).toBeInTheDocument()
  })

  test('calls onClickEmail and onClickShare when corresponding icons are clicked', () => {
    render(<TrackingShareCard {...testData} />)

    const emailIcon = screen.getByTestId('email-icon')
    userEvent.click(emailIcon)
    expect(testData.onClickEmail).toHaveBeenCalled()

    const shareIcon = screen.getByTestId('share-icon')
    userEvent.click(shareIcon)
    expect(testData.onClickShare).toHaveBeenCalled()
  })

  test('renders nothing when open prop is false', () => {
    render(<TrackingShareCard {...testData} open={false} />)

    const emailIcon = screen.queryByTestId('email-icon')
    const shareIcon = screen.queryByTestId('share-icon')

    expect(emailIcon).toBeNull()
    expect(shareIcon).toBeNull()
  })
})
