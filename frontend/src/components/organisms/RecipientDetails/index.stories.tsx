import { Meta, Story } from '@storybook/react'
import RecipientDetails, { RecipientDetailsProps } from '.'
import theme from '../../../theme'

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

RecipientDetailsStory.args = {
  style: {
    width: theme.spacing(129),
  },
  data: {
    email: 'jinan@gmail.com',
    firstName: 'jinan',
    lastName: 'khan',
    account: '123456789012',
    ifsc: '12345678901',
  },
}
