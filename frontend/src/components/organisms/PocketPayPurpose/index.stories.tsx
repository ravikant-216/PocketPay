import { Meta, Story } from '@storybook/react'
import PocketPayPurpose, { PocketPayPurposeProps } from '.'
import theme from '../../../theme'

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

PocketPayPurposeStory.args = {
  style: {
    width: theme.spacing(150),
  },
}
