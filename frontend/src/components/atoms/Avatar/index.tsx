import { Avatar as AvatarComponent, AvatarProps } from '@mui/material'
import React from 'react'
import theme from '../../../theme'

interface MyAvatarProps extends AvatarProps {
  width?: string
  height?: string
}

const Avatar = ({
  height = theme.spacing(8.5),
  width = theme.spacing(8.5),
  ...props
}: MyAvatarProps) => {
  return <AvatarComponent sx={{ height, width }} {...props} />
}

export default Avatar
