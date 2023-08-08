import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TransferDetailsForm, { TransferDetailsProps } from '.'

export default {
  title: 'Organisms/TransferDetailsForm',
  component: TransferDetailsForm,
} as Meta

const Template: Story<TransferDetailsProps> = (args) => (
  <TransferDetailsForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  amount: '100.00 GBP',
  fee: '00.00 GBP',
  amountRate: '77.74 GBP',
  guaranteedRate: '1 GBP = 1.14 EUR',
  saveOnClick: action('saveOnClick'),
}
