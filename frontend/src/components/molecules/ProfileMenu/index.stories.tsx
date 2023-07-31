import { StoryObj, Meta } from '@storybook/react'
import ProfileModal from '.'

const meta: Meta<typeof ProfileModal> = {
  title: 'molecules/ProfileModal',
  component: ProfileModal,
  argTypes: {
    open: {
      type: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const ProfileModalModal: Story = {
  name: 'ProfileModal',
  args: {
    open: true,
  },
}
