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
  args: {},
}
