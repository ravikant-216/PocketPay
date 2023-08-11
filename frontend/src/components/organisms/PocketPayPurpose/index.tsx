import styled from '@emotion/styled'
import {
  POCKEY_PAY_PURPOSE,
  POCKEY_PAY_PURPOSE_HEADING,
  POCKEY_PAY_PURPOSE_PLACEHOLDER,
  POCKEY_PAY_PURPOSE_SUB_HEADING,
  RECIPIENT_DETAILS_CONTINUE,
} from '../../../strings/constants'
import Typography from '../../atoms/Typography'
import SearchDropdown from '../../molecules/SearchDropDown'
import { Box, Stack } from '@mui/material'
import CustomButton from '../../atoms/Button'
import { useState } from 'react'
import theme from '../../../theme'

const StyledContainer = styled(Box)({
  display: 'flex',
  height: theme.spacing(135),
})
const ButtonWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
})

export interface PocketPayPurposeProps {
  onClick?: () => void
  style?: React.CSSProperties
}

const PocketPayPurpose = (props: PocketPayPurposeProps) => {
  const [value, setValue] = useState('')
  const handleChange = (value: string) => {
    setValue(value)
  }
  return (
    <>
      <StyledContainer {...props} data-testid="pocketpayPurpose">
        <Stack flex={1} gap={theme.spacing(13)}>
          <Stack direction={'column'} sx={{ gap: '12px' }}>
            <Typography variant="h1" color="text.highEmphasis">
              {POCKEY_PAY_PURPOSE_HEADING}
            </Typography>
            <Typography variant="body3" color="text.mediumEmphasis">
              {POCKEY_PAY_PURPOSE_SUB_HEADING}
            </Typography>
          </Stack>

          <SearchDropdown
            options={POCKEY_PAY_PURPOSE}
            onValueChange={handleChange}
            placeholder={POCKEY_PAY_PURPOSE_PLACEHOLDER}
            label={POCKEY_PAY_PURPOSE_PLACEHOLDER}
            data-testid="purpose-input"
          />
        </Stack>

        <ButtonWrapper>
          <CustomButton
            variant="contained"
            onClick={props.onClick}
            disabled={!value}
          >
            {RECIPIENT_DETAILS_CONTINUE}
          </CustomButton>
        </ButtonWrapper>
      </StyledContainer>
    </>
  )
}

export default PocketPayPurpose
