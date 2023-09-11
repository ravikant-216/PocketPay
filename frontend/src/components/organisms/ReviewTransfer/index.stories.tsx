import { StoryObj, Meta } from '@storybook/react'
import ReviewTransferType from '.'

const meta: Meta<typeof ReviewTransferType> = {
  title: 'organisms/ReviewTransferType',
  component: ReviewTransferType,
}

export default meta

type Story = StoryObj<typeof meta>

export const ReviewTransferTypeStory: Story = {
  name: 'ReviewTransferType',
  args: {
    ReviewTransferDetailsProps: {
      data: {
        transfer: {
          senderAmount: 0,
          recipientAmount: 0,
          senderCurrencyCode: '',
          recipientCurrencyCode: '',
          fee: 0,
          conversionAmount: 0,
          rate: 0,
        },
        recipient: {
          name: '',
          email: '',
          accountNumber: '',
          accountType: '',
        },
      },
    },
  },
}
