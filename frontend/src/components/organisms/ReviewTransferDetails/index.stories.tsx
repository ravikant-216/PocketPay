import { StoryObj, Meta } from '@storybook/react'
import ReviewTransferDetails from '.'

const meta: Meta<typeof ReviewTransferDetails> = {
  title: 'organisms/ReviewTransferDetails',
  component: ReviewTransferDetails,
}

export default meta

type Story = StoryObj<typeof meta>

export const ReviewTransferDetailsStory: Story = {
  name: 'ReviewTransferDetails',
  args: {
    data: {
      transfer: {
        senderAmount: 0,
        recipientAmount: 0,
        senderCurrencyCode: '223',
        recipientCurrencyCode: '222',
        fee: 0,
        conversionAmount: 0,
        rate: 0,
      },
      recipient: {
        name: '223',
        email: '2223',
        accountNumber: '1223444',
        accountType: 'Checked',
      },
    },
  },
}
