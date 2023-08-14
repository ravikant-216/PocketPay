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
import Image from '../../atoms/Image'
import search from '../../../../public/assets/icons/search.svg'
import ExpandIcon from '../../../../public/assets/icons/expand.svg'

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.text.lowEmphasis,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.highEmphasis,
    '&.Mui-focused fieldset': {
      border: `${theme.spacing(0.25)} solid ${theme.palette.Greys.stroke}`,
      borderBottom: `none !important`,
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '&.Mui-focused .search': {
      display: 'none',
    },
    '& .search': {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(-3),
    },
    '& fieldset': {
      border: `1px solid ${theme.palette.Greys.stroke} !important`,
      borderRadius: `${theme.spacing(2)} !important`,
    },
  },
}))
const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderTop: 'none',
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.structuralColors.white,
  borderTopRightRadius: '0',
  borderTopLeftRadius: '0',
}))

export interface SearchDropdownProps extends BoxProps {
  options: string[]
  label?: string
  minHeight?: string
  variant?: 'footer' | 'nonFooter'
  placeholder?: string
  type?: 'search' | 'dropdown'
  onValueChange: (value: string) => void
}

export default function SearchDropdown(props: SearchDropdownProps) {
  const {
    options,
    label,
    placeholder,
    onValueChange,
    variant,
    type = 'dropdown',
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
            InputProps={{
              ...params.InputProps,
              sx: {
                borderTopRightRadius: '0',
                borderTopLeftRadius: '0',
                cursor: 'pointer',
              },
              ...(type === 'search'
                ? {
                    endAdornment: (
                      <Image
                        src={search}
                        className="search"
                        alt="Search Icon"
                      />
                    ),
                  }
                : {
                    endAdornment: (
                      <Stack alignItems="center" justifyContent="center">
                        <Image
                          src={ExpandIcon}
                          alt=""
                          className="search"
                        ></Image>
                      </Stack>
                    ),
                  }),
            }}
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
          <StyledBox>
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
          </StyledBox>
        )}
        ListboxProps={{ style: { minHeight: minHeight, overflow: 'auto' } }}
      />
    </Box>
  )
}
