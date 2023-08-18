import Image from '../../atoms/Image'
import logo from '../../../../public/assets/icons/logo.svg'
import { Grid } from '@mui/material'
import theme from '../../../theme'
import { Box } from '@mui/system'
import styled from '@emotion/styled'

export interface SendMoneyTemplateProps {
  content: React.ReactNode
  crossIcon?: React.ReactNode
  backButton?: React.ReactNode
  stepperComponent?: React.ReactNode
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
  marginLeft: '-24%',
  width: 'fit-content',
})

const HeaderGrid = styled(Grid)({
  alignItems: 'stretch',
  justifyContent: 'space-between',
  gap: theme.spacing(26.5),
  padding: `${theme.spacing(2)} ${theme.spacing(16)} ${theme.spacing(
    7.5
  )} ${theme.spacing(16)}`,
})

const StepperGrid = styled(Grid)({
  paddingRight: theme.spacing(19.75),
})

const SendMoneyTemplate = (props: SendMoneyTemplateProps) => {
  return (
    <>
      <HeaderGrid container>
        <Grid item>
          <Image src={logo} alt="pocketPayLogo" />
        </Grid>
        <StepperGrid item sm={8}>
          {props.stepperComponent}
        </StepperGrid>
        <Grid item>{props.crossIcon}</Grid>
      </HeaderGrid>
      <Box display={'flex'} justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={theme.spacing(155.25)}
          marginRight={theme.spacing(-33.75)}
        >
          <BackButtonBox>{props.backButton}</BackButtonBox>

          <ContentBox>{props.content}</ContentBox>
        </Box>
      </Box>
    </>
  )
}

export default SendMoneyTemplate
