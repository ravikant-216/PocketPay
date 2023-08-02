import { StoryObj, Meta } from '@storybook/react'
import TransferCancelationModal from '.'

const meta: Meta<typeof TransferCancelationModal> = {
  title: 'organisms/TransferCancelationModal',
  component: TransferCancelationModal,
}

export default meta

type Story = StoryObj<typeof TransferCancelationModal>

export const TransferCancelationModalStory: Story = {
  name: 'TransferCancelationModal',
  args: {
    transferNumber: '38957398479',
  },
}
