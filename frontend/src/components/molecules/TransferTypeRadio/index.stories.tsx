import { StoryObj, Meta } from '@storybook/react'
import CardIcon from '../../../../public/assets/icons/atm-card.svg'
import TransferTypeRadio from '.'
import { RadioGroup } from '@mui/material'

const meta: Meta<typeof TransferTypeRadio> = {
  title: 'molecules/TransferTypeRadio',
  component: TransferTypeRadio,
}

export default meta

type Story = StoryObj<typeof meta>

export const TransferTypeRadioStory: Story = {
  name: 'TransferTypeRadio',
  render: (props) => (
    <RadioGroup sx={{ display: 'inline-flex' }}>
      <TransferTypeRadio {...props} />
      <TransferTypeRadio
        value="xxx"
        src={CardIcon}
        alt="Card Icon"
        description="Send from your Visa or Mastercard. Should arrive by January 28th."
        title="Credit card"
      />
    </RadioGroup>
  ),
  args: {
    value: 'Debit card',
    src: CardIcon,
    alt: 'Card Icon',
    title: 'Debit card',
    description:
      'Send from your Visa or Mastercard. Should arrive by January 28th.',
  },
}
