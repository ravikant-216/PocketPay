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
  baseURL,
} from '../../strings/constants'
import theme from '../../theme'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'

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

interface TransactionDetails {
  status: string
  sendingAmount: string
  recievingAmount: string
  sendingCurrencyCode: string
  recievingCurrencyCode: string
  senderName: string
  receiverName: string
  referenceNumber: string
  time: Date
  index: number
  userId: number
  recipientId: number
}

interface Beneficiary {
  id: 1
  firstName: string
  lastName: string
  userId: number
}

interface User {
  first_name: string
  last_name: string
  id: number
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

const HomePage = () => {
  const [transactionList, setTransactionList] = useState<TransactionDetails[]>(
    []
  )

  const location = useLocation()

  const id = location.state.id

  const [senderName, setSenderName] = useState('')
  const [recieverName, setReceiverName] = useState<Beneficiary[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseURL}/transaction`)
      const data: TransactionDetails[] = response.data

      const transactionWithMatchingUserId: TransactionDetails[] = data.filter(
        (item) => item.userId === Number(id)
      )
      setTransactionList(transactionWithMatchingUserId)

      const senderResponse = await axios.get(`${baseURL}/user`)
      const senderData: User[] = senderResponse.data
      const user = senderData.find((item) => item.id === Number(id))
      if (user) {
        setSenderName(user.first_name + ' ' + user.last_name)
      }

      const recieverResponse = await axios.get(`${baseURL}/beneficiary`)
      const recieverData: Beneficiary[] = recieverResponse.data
      const reciever: Beneficiary[] = recieverData.filter(
        (item) => item.userId === Number(id)
      )
      if (reciever) {
        setReceiverName(reciever)
      }
    }

    fetchData()
  }, [])

  const navigate = useNavigate()

  const reciever = (id: number) => {
    const name = recieverName.find((reciever) => reciever.id === id)

    return name?.firstName + ' ' + name?.lastName
  }

  const DashboardContent = () => {
    return (
      <>
        <HomeGrid container>
          <Grid item sm={6}>
            <Typography variant="h1" color="text.highEmphasis">
              {DASHBOARD_HOME}
            </Typography>
          </Grid>
          <Grid item sm={6} justifyContent={'flex-end'} display={'flex'}>
            <CustomButton
              variant="contained"
              onClick={() => navigate(`/sendMoney`, { state: { id: id } })}
              data-testid="sendMoneyButton"
            >
              {SEND_MONEY}
            </CustomButton>
          </Grid>
        </HomeGrid>
        {transactionList.length === 0 && (
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

        {transactionList.map((item) => {
          return (
            <TransactionDetails
              data-testid="transactionDetails"
              sendingAmount={item.sendingAmount}
              transactionStatus={item.status as TransactionStatus}
              recievingAmount={item.recievingAmount}
              sendingCurrency={item.sendingCurrencyCode}
              recievingCurrency={item.recievingCurrencyCode}
              senderName={senderName}
              receiverName={reciever(item.recipientId)}
              transferNumber={item.referenceNumber}
              key={item.referenceNumber}
              style={{
                marginBottom: theme.spacing(5),
                marginLeft: theme.spacing(8),
                marginRight: theme.spacing(8),
              }}
              time={item.time}
            />
          )
        })}
      </>
    )
  }
  return (
    <>
      <DashboardTemplate
        newUser={transactionList.length === 0}
        Content={<DashboardContent />}
      />
    </>
  )
}
export default HomePage
