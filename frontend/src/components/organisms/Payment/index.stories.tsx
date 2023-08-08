import { StoryObj, Meta } from '@storybook/react'
import Payment, { ScreenType } from '.'

const meta: Meta<typeof Payment> = {
  title: 'organisms/Payment',
  component: Payment,
  argTypes: {
    userCurrentScreen: {
      control: {
        type: 'select',
      },
      options: ['CHOOSE_PAYMENT_TYPE', 'PAY_WITH_CARD', 'PAYMENT_CONFIRMATION'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const PaymentStory: Story = {
  name: 'Payment',
  args: {
    userCurrentScreen: ScreenType.CHOOSE_PAYMENT_TYPE,
  },
}
