import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import BusinessDetailsForm, { BusinessDetailsProps } from '.'
import theme from '../../../theme'

export default {
  title: 'Organisms/BusinessDetailsForm',
  component: BusinessDetailsForm,
} as Meta

const Template: Story<BusinessDetailsProps> = (args) => (
  <BusinessDetailsForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  style: {
    width: theme.spacing(129),
  },
  name: 'Ravi',
  email: 'ravi.kant@gmail.com',
  accountNumber: '123456789',
  accountType: 'Savings',
  saveOnClick: action('saveOnClick'),
}
