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
}
