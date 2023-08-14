import { Meta, Story } from '@storybook/react'
import TransactionDetails, { TransactionDetailProps } from '.'
import theme from '../../../theme'

export default {
  title: 'organisms/TransactionDetails',
  component: TransactionDetails,
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
} as Meta

const template: Story<TransactionDetailProps> = (args) => (
  <TransactionDetails {...args} />
)

export const TransactionDetailsStory = template.bind({})

TransactionDetailsStory.args = {
  transactionStatus: 'Sending',
  senderName: 'Ross Gener',
  receiverName: 'Mario Gabriel',
  sendingCurrency: 'GBP',
  recievingCurrency: 'EUR',
  sendingAmount: '100',
  recievingAmount: '114.89',
  transferNumber: '3227627272',
  style: {
    width: theme.spacing(129),
  },
}
