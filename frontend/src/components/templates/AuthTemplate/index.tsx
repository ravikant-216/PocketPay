import { Box, Stack } from '@mui/material'
import Image from '../../atoms/Image'
import logo from '../../../../public/assets/icons/logo.svg'
import React from 'react'

export interface AuthTemplateProps {
  Content: React.ReactNode
}

export const AuthTemplate = ({ Content }: AuthTemplateProps) => {
  return (
    <Box>
      <Stack>
        <Image src={logo} alt="PocketPay"></Image>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '6.5%',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
        }}
      >
        {Content}
      </Box>
    </Box>
  )
}
