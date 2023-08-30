import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import SendMoneyTemplate from '.'
import AccountVerification from '../../organisms/AccountVerification'
import backButton from '../../../../public/assets/icons/backButton.svg'
import { render, screen } from '@testing-library/react'
import Image from '../../atoms/Image'
import '@testing-library/jest-dom'
import Stepper from '../../molecules/Stepper'
describe('SendMoneyTemplate', () => {
  const labels = ['Amount', 'You', 'Recipient', 'Verification', 'Review', 'Pay']
  it('should render the component specified', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SendMoneyTemplate
          content={<AccountVerification />}
          backButton={<Image src={backButton} alt="backIcon" />}
        />
      </ThemeProvider>
    )
    const accountVerification = getByTestId('accountVerification')
    expect(accountVerification).toBeInTheDocument()
  })

  it('should render the stepper', () => {
    render(
      <ThemeProvider theme={theme}>
        <SendMoneyTemplate
          content={<AccountVerification />}
          backButton={<Image src={backButton} alt="backIcon" />}
          stepperComponent={<Stepper value={0} labels={labels} />}
        />
      </ThemeProvider>
    )

    expect(screen.getByText(labels[0])).toBeInTheDocument()
    expect(screen.getByText(labels[1])).toBeInTheDocument()
    expect(screen.getByText(labels[2])).toBeInTheDocument()
  })

  it('should render the avatar', () => {
    render(
      <ThemeProvider theme={theme}>
        <SendMoneyTemplate
          content={<AccountVerification />}
          backButton={<Image src={backButton} alt="backIcon" />}
          stepperComponent={<Stepper value={0} labels={labels} />}
          avatar
        />
      </ThemeProvider>
    )
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
  })
})
