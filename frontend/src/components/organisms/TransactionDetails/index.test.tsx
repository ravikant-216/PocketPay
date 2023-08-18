import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
import TransactionDetails from '.'
import {
  DEBIT_CARD_2_LABEL,
  EXISITING_ACCOUNT_LABEL,
} from '../../../strings/constants'

describe('TransactionDetails', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <TransactionDetails
          transactionStatus={'Sending'}
          sendingAmount={'100'}
          recievingAmount={'114.89'}
          sendingCurrency={'GBP'}
          recievingCurrency={'EUR'}
          senderName={'Ross Gener'}
          receiverName={'Mario Gabriel'}
          transferNumber={'3227627272'}
        />
      </ThemeProvider>
    )

    const component = getByTestId('transactionDetails')
    expect(component).toBeInTheDocument()
  })

  it('should render the cancel transfer modal when cancel button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <TransactionDetails
          transactionStatus={'Sending'}
          sendingAmount={'100'}
          recievingAmount={'114.89'}
          sendingCurrency={'GBP'}
          recievingCurrency={'EUR'}
          senderName={'Ross Gener'}
          receiverName={'Mario Gabriel'}
          transferNumber={'3227627272'}
        />
      </ThemeProvider>
    )

    const cancelButton = screen.getByTestId('cancelButton')
    fireEvent.click(cancelButton)

    const transferCancelationModal = getByTestId('transferCancelationModal')
    expect(transferCancelationModal).toBeInTheDocument()
  })

  it('should close the transfer cancellation model when the cancel button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <TransactionDetails
          transactionStatus={'Sending'}
          sendingAmount={'100'}
          recievingAmount={'114.89'}
          sendingCurrency={'GBP'}
          recievingCurrency={'EUR'}
          senderName={'Ross Gener'}
          receiverName={'Mario Gabriel'}
          transferNumber={'3227627272'}
        />
      </ThemeProvider>
    )

    const cancelButton = screen.getByTestId('cancelButton')
    fireEvent.click(cancelButton)
    const transferCancelationModal = screen.getByTestId(
      'transferCancelationModal'
    )
    const [, accountSelectDropdown, optionSelectDropDown] =
      screen.getAllByRole('button')

    fireEvent.mouseDown(accountSelectDropdown)
    fireEvent.click(screen.getByText(EXISITING_ACCOUNT_LABEL))
    fireEvent.mouseDown(optionSelectDropDown)
    fireEvent.click(screen.getByText(DEBIT_CARD_2_LABEL))
    const cancelTransferButton = screen.getAllByRole('button')[3]
    expect(cancelTransferButton).toBeInTheDocument()
    fireEvent.click(cancelTransferButton)
    expect(transferCancelationModal).not.toBeInTheDocument()
  })

  it('should close the model when background is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <TransactionDetails
          transactionStatus={'Sending'}
          sendingAmount={'100'}
          recievingAmount={'114.89'}
          sendingCurrency={'GBP'}
          recievingCurrency={'EUR'}
          senderName={'Ross Gener'}
          receiverName={'Mario Gabriel'}
          transferNumber={'3227627272'}
        />
      </ThemeProvider>
    )
    const cancelButton = screen.getByTestId('cancelButton')
    fireEvent.click(cancelButton)
    const transferCancelationModal = getByTestId('transferCancelationModal')
    expect(transferCancelationModal).toBeInTheDocument()
    const overlay = screen.getByTestId('modalOverlay')
    fireEvent.click(overlay)
    expect(transferCancelationModal).not.toBeInTheDocument()
  })

  it('should close tracking share card modal when background is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <TransactionDetails
          transactionStatus={'Sending'}
          sendingAmount={'100'}
          recievingAmount={'114.89'}
          sendingCurrency={'GBP'}
          recievingCurrency={'EUR'}
          senderName={'Ross Gener'}
          receiverName={'Mario Gabriel'}
          transferNumber={'3227627272'}
        />
      </ThemeProvider>
    )

    const shareIconElement = screen.getByAltText('shareIcon')
    fireEvent.click(shareIconElement)

    const trackingShareModal = getByTestId('trackingShareModal')
    expect(trackingShareModal).toBeInTheDocument()
    const overlay = screen.getByTestId('modalOverlay')
    fireEvent.click(overlay)
    expect(trackingShareModal).not.toBeInTheDocument()
  })
})
