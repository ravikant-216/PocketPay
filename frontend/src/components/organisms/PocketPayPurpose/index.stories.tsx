import { Meta, Story } from '@storybook/react'
import PocketPayPurpose, { PocketPayPurposeProps } from '.'

export default {
  title: 'organisms/PocketPayPurpose',
  component: PocketPayPurpose,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<PocketPayPurposeProps> = (args) => (
  <PocketPayPurpose {...args} />
)

export const PocketPayPurposeStory = template.bind({})

PocketPayPurposeStory.args = {}
