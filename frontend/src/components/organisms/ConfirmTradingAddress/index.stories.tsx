import { Meta, Story } from '@storybook/react'
import ConfirmTradingAddress, { TradingAddressProps } from '.'
import theme from '../../../theme'

export default {
  title: 'organisms/ConfirmTradingAddress',
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
  component: ConfirmTradingAddress,
} as Meta

const template: Story<TradingAddressProps> = (args) => (
  <ConfirmTradingAddress {...args} />
)

export const ConfirmTradingAddressStory = template.bind({})

ConfirmTradingAddressStory.args = { sx: { width: theme.spacing(129) } }
