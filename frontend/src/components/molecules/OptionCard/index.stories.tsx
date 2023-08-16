import { Meta, Story } from '@storybook/react'

import SendIcon from '../../../../public/assets/icons/send.svg'
import MybusinessIcon from '../../../../public/assets/icons/myBusiness.svg'
import OptionCard, { OptionCardProps } from '.'
import theme from '../../../theme'

export default {
  title: 'molecules/OptionCard',
  component: OptionCard,
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<OptionCardProps> = (args) => <OptionCard {...args} />

export const SendMoneyStory = template.bind({})

SendMoneyStory.args = {
  style: {
    width: theme.spacing(129),
  },
  iconTitle: 'Send Money',
  src: SendIcon,
  caption: 'Pay an international employee, invoice, or expense',
}

export const MyBusinessStory = template.bind({})

MyBusinessStory.args = {
  style: {
    width: theme.spacing(129),
  },
  iconTitle: 'Send Money',
  src: MybusinessIcon,
}
