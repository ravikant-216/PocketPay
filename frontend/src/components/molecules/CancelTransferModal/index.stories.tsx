import { StoryObj, Meta } from '@storybook/react'
import CancelTransferModal from '.'

const meta: Meta<typeof CancelTransferModal> = {
  title: 'molecules/CancelTransferModal',
  component: CancelTransferModal,
  argTypes: {
    open: {
      type: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof CancelTransferModal>

export const CancelTransferModalStory: Story = {
  name: 'CancelTransferModal',
  args: {
    open: true,
  },
}
