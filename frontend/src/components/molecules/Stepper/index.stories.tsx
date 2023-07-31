import { Story, Meta } from '@storybook/react'
import Stepper, { Props } from '.'

export default {
  title: 'molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} as Meta

const Template: Story<Props> = (args) => <Stepper {...args} />

const Labels1 = ['Amount', 'You', 'Recipient', 'Verification', 'Review', 'Pay']
export const Type1 = Template.bind({})
Type1.args = {
  labels: Labels1,
  sx: {
    margin: '50px',
  },
  value: 2,
}

const Labels2 = ['Your business', 'Business activity', 'Your details']
export const Type2 = Template.bind({})
Type2.args = {
  labels: Labels2,
  sx: {
    margin: '50px',
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
export const Type3 = Template.bind({})
Type3.args = {
  labels: Labels3,
  sx: {
    margin: '50px',
  },
  value: 1,
}
