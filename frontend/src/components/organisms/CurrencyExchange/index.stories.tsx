import { Meta, Story } from '@storybook/react'
import CurrencyExchange, { CurrencyExchangeProps } from '.'

export default {
  title: 'organisms/CurrencyExchange',
  component: CurrencyExchange,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<CurrencyExchangeProps> = (args) => (
  <CurrencyExchange {...args} />
)

export const CurrencyExchangeStory = template.bind({})

CurrencyExchangeStory.args = {
  data: { senderCountry: 'INR', senderAmount: '0' },
}
