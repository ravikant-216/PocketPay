import { Meta, StoryObj } from '@storybook/react'
import Avatar from '.'
import avatar from '../../../../public/assets/icons/avatar.svg'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}
type Story = StoryObj<typeof Avatar>

export const AvatarWithPic: Story = {
  args: {
    src: avatar,
    alt: 'Avatar Photo',
  },
}

export const AvatarWithOutPic: Story = {
  args: {
    alt: 'Avatar Photo',
  },
}

export default meta
