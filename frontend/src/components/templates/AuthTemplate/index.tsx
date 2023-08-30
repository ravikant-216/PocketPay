import { Box, Stack } from '@mui/material'
import Image from '../../atoms/Image'
import logo from '../../../../public/assets/icons/logo.svg'
import React from 'react'
import theme from '../../../theme'

export interface AuthTemplateProps {
  Content: React.ReactNode
}

export const AuthTemplate = ({ Content }: AuthTemplateProps) => {
  return (
    <Box>
      <Stack sx={{ margin: `${theme.spacing(6)} 0 0 ${theme.spacing(10)}` }}>
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
