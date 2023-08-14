import { StoryObj, Meta } from '@storybook/react'
import ProfileModal from '.'
import React, { useState } from 'react'
import Avatar from '../../atoms/Avatar'

const meta: Meta<typeof ProfileModal> = {
  title: 'molecules/ProfileModal',
  component: ProfileModal,
  argTypes: {
    open: {
      type: 'boolean',
    },
  },
}

const RenderComponent = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>()
  const open = Boolean(anchorEl)
  const onAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onClose = () => {
    setAnchorEl(undefined)
  }
  return (
    <>
      <Avatar
        id="avatar"
        aria-controls={anchorEl && 'profile-menu'}
        onClick={onAvatarClick}
      />
      <ProfileModal
        id="profile-menu"
        aria-labelledby="avatar"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onLogout={() => ({})}
      />
    </>
  )
}
export default meta

type Story = StoryObj<typeof meta>

export const ProfileModalModal: Story = {
  render: RenderComponent,
  name: 'ProfileModal',
  args: {
    open: true,
  },
}
