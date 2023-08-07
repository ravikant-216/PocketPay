import { Meta, Story } from '@storybook/react'
import RecipientDetails, { RecipientDetailsProps } from '.'

export default {
  title: 'organisms/RecipientDetails',
  component: RecipientDetails,
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
} as Meta

const template: Story<RecipientDetailsProps> = (args) => (
  <RecipientDetails {...args} />
)

export const RecipientDetailsStory = template.bind({})

RecipientDetailsStory.args = {}
