import { Story, Meta } from '@storybook/react'
import Stepper, { Props } from '.'
import theme from '../../../theme'

export default {
  title: 'molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} as Meta

const Template: Story<Props> = (args) => <Stepper {...args} />

const Labels1 = ['Amount', 'You', 'Recipient', 'Verification', 'Review', 'Pay']
export const SendMoney = Template.bind({})
SendMoney.args = {
  labels: Labels1,
  sx: {
    width: '80%',
    marginLeft: theme.spacing(25),
  },
  value: 2,
}

const Labels2 = ['Your business', 'Business activity', 'Your details']
export const BusinessSetup = Template.bind({})
BusinessSetup.args = {
  labels: Labels2,
  sx: {
    width: '80%',
    marginLeft: theme.spacing(25),
  },
  value: 1,
}
const Labels3 = [
  'Email',
  'Account type',
  'Country',
  '2-factor-authentication',
  'Password',
]
export const AccountSetup = Template.bind({})
AccountSetup.args = {
  labels: Labels3,
  sx: {
    width: '80%',
    marginLeft: theme.spacing(25),
  },
  value: 1,
}
