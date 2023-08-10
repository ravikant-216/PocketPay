import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box, { BoxProps } from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import theme from '../../../theme'
import Typography from '../../atoms/Typography'
import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BUSINESS_NOT_MESSAGE, ENTER_DETAIL } from '../../../strings/constants'

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.highEmphasis,
    borderRadius: theme.spacing(2),
  },
}))

export interface SearchDropdownProps extends BoxProps {
  options: string[]
  label?: string
  minHeight?: string
  variant?: 'footer' | 'nonFooter'
  placeholder?: string
  onValueChange: (value: string) => void
}

export default function SearchDropdown(props: SearchDropdownProps) {
  const {
    options,
    label,
    placeholder,
    onValueChange,
    variant,
    minHeight = 'auto',
    ...boxProps
  } = props

  return (
    <Box {...boxProps}>
      <Autocomplete
        disableClearable
        options={options}
        onChange={(_, value) => onValueChange(value)}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            theme={theme}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} style={{ padding: theme.spacing(4) }}>
            {option}
          </li>
        )}
        PaperComponent={({ children }) => (
          <Box
            sx={{
              border: `1px solid ${theme.palette.grey[300]}`,
              borderTop: 'none',
              borderRadius: theme.spacing(2),
              backgroundColor: theme.palette.structuralColors.white,
            }}
          >
            {children}
            {variant === 'footer' && (
              <>
                <Divider />
                <Stack
                  padding={theme.spacing(3)}
                  gap={theme.spacing(3)}
                  direction="row"
                >
                  <Typography variant="body2" color="text.mediumEmphasis">
                    {BUSINESS_NOT_MESSAGE}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={theme.palette.primary[500]}
                  >
                    {ENTER_DETAIL}
                  </Typography>
                </Stack>
              </>
            )}
          </Box>
        )}
        ListboxProps={{ style: { minHeight: minHeight, overflow: 'auto' } }}
      />
    </Box>
  )
}
