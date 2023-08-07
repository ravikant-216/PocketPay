import { Meta, Story } from '@storybook/react'
import RecipientType, { RecipientTypeProps } from '.'

export default {
  title: 'organisms/RecipientType',
  tags: ['autodocs'],
  component: RecipientType,
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<RecipientTypeProps> = (args) => (
  <RecipientType {...args} />
)

export const RecipientTypeStory = template.bind({})

RecipientTypeStory.args = {
  type: 'default',
  onClickBusinessCharityHandler: () => {
    console.log('charity clicked')
  },
  onClickSendMoneyHandler: () => {
    console.log('send money clicked')
  },
}
