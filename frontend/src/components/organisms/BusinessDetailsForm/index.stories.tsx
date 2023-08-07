import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import BusinessDetailsForm, { BusinessDetailsProps } from '.'

export default {
  title: 'Organisms/BusinessDetailsForm',
  component: BusinessDetailsForm,
} as Meta

const Template: Story<BusinessDetailsProps> = (args) => (
  <BusinessDetailsForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'Ravi',
  email: 'ravi.kant@gmail.com',
  accountNo: '123456789',
  accountType: 'Savings',
  saveOnClick: action('saveOnClick'),
}
