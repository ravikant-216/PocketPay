import styled from '@emotion/styled'
import Typography from '../../atoms/Typography'
import { Box, BoxProps, Divider, Stack } from '@mui/material'
import theme from '../../../theme'
import Icon from '../../atoms/IconButton'
import LloydBankIcon from '../../../../public/assets/icons/LloydBank.svg'
import BankFlagIcon from '../../../../public/assets/icons/bankFlag.svg'
import LockIcon from '../../../../public/assets/icons/lock.svg'

import Image from '../../atoms/Image'
import {
  APPROVE_PAYMENT,
  CONTINUE,
  PAY_FROM,
  PAY_MANUALLY,
  REDIRECTED,
  SAFE_SECURE,
  TRUST_LIST,
} from '../../../strings/constants'
import CustomButton from '../../atoms/Button'
export interface LlooydsConfirmationProps extends Omit<BoxProps, 'onClick'> {
  amount?: number
  currency?: string
  onPayHandler?: () => void
  onPayManuallyHandler?: () => void
}

const CommonStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}
const OuterBox = styled(Box)({
  ...CommonStyles,
  gap: theme.spacing(10),
  width: '100%',
  paddingRight: theme.spacing(6),
  paddingLeft: theme.spacing(4),
  minWidth: `${theme.spacing(134.25)}`,
  maxWidth: `${theme.spacing(189)}`,
})

const StyledBox = styled(Box)({
  ...CommonStyles,
  border: `1px solid ${theme.palette.Greys.stroke}`,
  borderRadius: theme.spacing(4),
  padding: `${theme.spacing(10)} ${theme.spacing(8)}`,
  gap: theme.spacing(6),
  width: '100%',
})

const ListWrapper = styled(Stack)({
  ...CommonStyles,
  paddingLeft: theme.spacing(8),
})

const ContentBox = styled(Box)({
  display: 'flex',
})

const IconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2.5),
})

const CustomDivider = styled(Divider)({
  backgroundColor: theme.palette.Greys.stroke,
  height: theme.spacing(0.25),
  width: theme.spacing(4.81),
  margin: `${theme.spacing(4)} 0`,
  borderStyle: 'dotted',
})

const ButtonWrapper = styled(Box)({
  ...CommonStyles,
  gap: theme.spacing(5),
  padding: `${theme.spacing(10.25)} ${theme.spacing(29.25)} `,
})

const LloydsConfirmation = (props: LlooydsConfirmationProps) => {
  return (
    <>
      <OuterBox data-testid="LloydsConfirmation" {...props}>
        <Typography variant="h1" color="text.highEmphasis">
          {PAY_FROM}
        </Typography>
        <StyledBox>
          <ContentBox>
            <Typography variant="body3" color="text.mediumEmphasis">
              {REDIRECTED}
              <Typography variant="body3" color="text.highEmphasis">
                {` business `}
              </Typography>
              {APPROVE_PAYMENT}
              <Typography variant="body3" color="text.highEmphasis">
                <strong>{` ${props.amount} ${props.currency} `}</strong>
              </Typography>
              transfer.
            </Typography>
          </ContentBox>

          <Typography variant="h1" color="text.highEmphasis">
            {SAFE_SECURE}
          </Typography>
          <ListWrapper>
            <Typography variant="body3" color="text.mediumEmphasis">
              <Stack direction="column">
                {TRUST_LIST.map((item) => (
                  <ul key={item.list}>
                    <li>{item.list}</li>
                  </ul>
                ))}
              </Stack>
            </Typography>
          </ListWrapper>

          <IconBox>
            <Icon
              icon={BankFlagIcon}
              borderColor={theme.palette.primary[500]}
              borderRadius={theme.spacing(12.5)}
              backgroundColor={theme.palette.primary[100]}
            />
            <CustomDivider />
            <Image src={LockIcon} alt="lock icon" />
            <CustomDivider />
            <Icon icon={LloydBankIcon} borderRadius={theme.spacing(12.5)} />
          </IconBox>

          <ButtonWrapper>
            <CustomButton variant="contained" onClick={props.onPayHandler}>
              {CONTINUE}
            </CustomButton>
            <CustomButton
              variant="outlined"
              onClick={props.onPayManuallyHandler}
            >
              {PAY_MANUALLY}
            </CustomButton>
          </ButtonWrapper>
        </StyledBox>
      </OuterBox>
    </>
  )
}

export default LloydsConfirmation
