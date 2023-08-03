import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import CountrySelect from '.'
import IconLabel from '../../atoms/IconLabel'

describe('CountrySelect', () => {
  const names = [
    <IconLabel
      key="India"
      iconTitle="India"
      src="/path/to/india/flag/image"
      alt="India Flag"
    />,
    <IconLabel
      key="Australia"
      iconTitle="Australia"
      src="/path/to/australia/flag/image"
      alt="Australia Flag"
    />,
    <IconLabel
      key="United States"
      iconTitle="United States"
      src="/path/to/united-states/flag/image"
      alt="United States Flag"
    />,
  ]

  it('renders without crashing', () => {
    const { getByText } = render(<CountrySelect names={names} />)
    expect(getByText('Select Your Country')).toBeInTheDocument()
  })

  it('changes the value when an option is selected', () => {
    const onChange = jest.fn()
    const { getByText, getByRole } = render(
      <CountrySelect names={names} onChange={onChange} />
    )
    fireEvent.mouseDown(getByRole('button'))
    fireEvent.click(getByText('India'))
    expect(onChange).toHaveBeenCalledWith('India')
  })

  it('displays the selected value', () => {
    const { getByText, getByRole } = render(<CountrySelect names={names} />)
    fireEvent.mouseDown(getByRole('button'))
    fireEvent.click(getByText('India'))
    expect(getByRole('button')).toHaveTextContent('India')
  })
})
