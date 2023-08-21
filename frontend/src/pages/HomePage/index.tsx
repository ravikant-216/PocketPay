import { Box, Grid, Paper } from '@mui/material'
import DashboardTemplate from '../../components/templates/DashboardTemplate'
import Image from '../../components/atoms/Image'
import noTransaction from '../../../public/assets/icons/noTransaction.svg'
import Typography from '../../components/atoms/Typography'
import CustomButton from '../../components/atoms/Button'
import styled from '@emotion/styled'
import TransactionDetails from '../../components/organisms/TransactionDetails'
import {
  DASHBOARD_HOME,
  TransactionStatus,
  SEND_MONEY,
  DASHBOARD_HEADING_FIRST,
  DASHBOARD_HEADING_SECOND,
} from '../../strings/constants'
import theme from '../../theme'
import { useState } from 'react'

const NoTransactionContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(8),
  gap: theme.spacing(10.74),
})

interface TransactionProps {
  transactionStatus: string
  sendingAmount: string
  recievingAmount: string
  sendingCurrency: string
  recievingCurrency: string
  senderName: string
  receiverName: string
  transferNumber: string
  key: number
}
export interface TransactionList {
  transactionList: TransactionProps[]
}

const HomeGrid = styled(Grid)({
  paddingTop: theme.spacing(9.25),
  paddingBottom: theme.spacing(6.25),
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  margin: 0,
})

const StyledPaper = styled(Paper)({
  marginLeft: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  height: '100%',
  marginBottom: theme.spacing(12.5),
  marginRight: theme.spacing(8),
  '&.MuiPaper-root': {
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
  },
})
const HomePage = (props: TransactionList) => {
  const [showBalances, setShowBalances] = useState(false)
  const DashboardContent = () => {
    setShowBalances(props.transactionList.length > 0)
    return (
      <>
        <HomeGrid container>
          <Grid item sm={6}>
            <Typography variant="h1" color="text.highEmphasis">
              {DASHBOARD_HOME}
            </Typography>
          </Grid>
          <Grid item sm={6} justifyContent={'flex-end'} display={'flex'}>
            <CustomButton variant="contained">{SEND_MONEY}</CustomButton>
          </Grid>
        </HomeGrid>
        {props.transactionList.length === 0 && (
          <StyledPaper>
            <NoTransactionContainer>
              <Image
                src={noTransaction}
                alt="illustration"
                data-testid="illustration"
              />

              <Typography
                variant="body1"
                color="text.mediumEmphasis"
                sx={{ textAlign: 'center' }}
              >
                {DASHBOARD_HEADING_FIRST}
                <br />
                {DASHBOARD_HEADING_SECOND}
              </Typography>
            </NoTransactionContainer>
          </StyledPaper>
        )}
        {props.transactionList.length > 0 &&
          props.transactionList.map((item: TransactionProps) => (
            <TransactionDetails
              sendingAmount={item.sendingAmount}
              transactionStatus={item.transactionStatus as TransactionStatus}
              recievingAmount={item.recievingAmount}
              sendingCurrency={item.sendingCurrency}
              recievingCurrency={item.recievingCurrency}
              senderName={item.senderName}
              receiverName={item.receiverName}
              transferNumber={item.transferNumber}
              key={item.key}
              style={{
                marginBottom: theme.spacing(5),
                marginLeft: theme.spacing(8),
                marginRight: theme.spacing(8),
              }}
            />
          ))}
      </>
    )
  }
  return (
    <>
      <DashboardTemplate
        newUser={!showBalances}
        Content={<DashboardContent />}
      />
    </>
  )
}
export default HomePage
