import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import TrackingShareCard, { TrackingShareCardProps } from '.'

const testData: TrackingShareCardProps = {
  heading: 'Test Heading',
  subHeading: 'Test Subheading',
  open: true,
}

describe('TrackingShareCard', () => {
  test('renders the component with the provided props', () => {
    render(<TrackingShareCard {...testData} />)

    const heading = screen.getByText('Test Heading')
    expect(heading).toBeInTheDocument()
  })

  test('renders nothing when open prop is false', () => {
    render(<TrackingShareCard {...testData} open={false} />)

    const emailIcon = screen.queryByTestId('email-icon')
    const shareIcon = screen.queryByTestId('share-icon')

    expect(emailIcon).toBeNull()
    expect(shareIcon).toBeNull()
  })
})
