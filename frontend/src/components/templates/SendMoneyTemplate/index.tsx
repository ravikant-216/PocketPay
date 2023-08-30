import Image from '../../atoms/Image'
import logo from '../../../../public/assets/icons/logo.svg'
import { Divider, Grid } from '@mui/material'
import theme from '../../../theme'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
import Avatar from '../../atoms/Avatar'
import avatar from '../../../../public/assets/icons/avatar.svg'

export interface SendMoneyTemplateProps {
  content: React.ReactNode
  crossIcon?: React.ReactNode
  backButton?: React.ReactNode
  stepperComponent?: React.ReactNode
  avatar?: boolean
}

const ContentBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
})

const BackButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexGrow: 1,
  marginBottom: theme.spacing(7.25),
  marginLeft: theme.spacing(6),
  width: 'fit-content',
})

const HeaderGrid = styled(Grid)({
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.spacing(2)} ${theme.spacing(16)} ${theme.spacing(
    7.5
  )} ${theme.spacing(16)}`,
})

const StepperGrid = styled(Grid)({})

const SendMoneyTemplate = (props: SendMoneyTemplateProps) => {
  return (
    <>
      <HeaderGrid container data-tesid="sendMoney">
        <Grid item sm={1}>
          <Image src={logo} alt="pocketPayLogo" />
        </Grid>
        <StepperGrid item sm={7}>
          {props.stepperComponent}
        </StepperGrid>
        <Grid
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            gap: theme.spacing(3),
            alignItems: 'center',
          }}
          item
          sm={1}
        >
          {props.avatar && (
            <>
              <Avatar src={avatar} alt="Avatar" data-testid="avatar" />
              <Divider orientation="vertical" />
            </>
          )}
          {props.crossIcon}
        </Grid>
      </HeaderGrid>
      <Box display={'flex'} justifyContent={'center'}>
        <Box display={'flex'} flexDirection={'column'} minWidth={'60%'}>
          <BackButtonBox>{props.backButton}</BackButtonBox>

          <ContentBox>{props.content}</ContentBox>
        </Box>
      </Box>
    </>
  )
}

export default SendMoneyTemplate
