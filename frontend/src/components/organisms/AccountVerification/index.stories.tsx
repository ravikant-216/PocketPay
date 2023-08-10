import { Meta, Story } from '@storybook/react'
import AccountVerification from '.'

export default {
  title: 'organisms/AccountVerification',
  component: AccountVerification,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} as Meta

const template: Story = () => <AccountVerification />

export const AccountVerificationStory = template.bind({})

AccountVerificationStory.args = {}
