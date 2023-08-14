import { Meta, Story } from '@storybook/react'
import AccountVerification, { AccountVerificationProps } from '.'

export default {
  title: 'organisms/AccountVerification',
  component: AccountVerification,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<AccountVerificationProps> = (args) => (
  <AccountVerification {...args} />
)

export const AccountVerificationStory = template.bind({})

AccountVerificationStory.args = {
  style: {
    width: '516px',
  },
}
