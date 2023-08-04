import { StoryObj, Meta } from '@storybook/react'
import BankCardDetailsRadio from '.'
import { RadioGroup } from '@mui/material'

const meta: Meta<typeof BankCardDetailsRadio> = {
  title: 'molecules/BankCardDetailsRadio',
  component: BankCardDetailsRadio,
}

export default meta

type Story = StoryObj<typeof meta>

export const BankCardDetailsRadioStory: Story = {
  name: 'BankCardDetailsRadio',
  render: (props) => (
    <RadioGroup sx={{ display: 'inline-flex' }}>
      <BankCardDetailsRadio {...props} />
      <BankCardDetailsRadio
        value="xxx"
        title="EUR Credit card"
        lastFourDigitsOfCardNumber={9313}
        expirationDate={new Date('2025/06/06')}
      />
    </RadioGroup>
  ),
  args: {
    value: 'Visa debit card',
    title: 'EUR Visa Debit',
    lastFourDigitsOfCardNumber: 4546,
    expirationDate: new Date('2025/09/06'),
  },
}
