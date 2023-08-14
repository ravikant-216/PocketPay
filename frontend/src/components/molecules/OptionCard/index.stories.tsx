import { Meta, Story } from '@storybook/react'

import SendIcon from '../../../../public/assets/icons/send.svg'
import SetupIcon from '../../../../public/assets/icons/setup.svg'
import MybusinessIcon from '../../../../public/assets/icons/myBusiness.svg'
import PersonalAccountIcon from '../../../../public/assets/icons/personalAccount.svg'
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

export const SetUpStory = template.bind({})

SetUpStory.args = {
  style: {
    width: theme.spacing(129),
  },
  iconTitle: 'Finish Account Setup',
  src: SetupIcon,
  caption: 'Get balances in multiple currencies, and take buisness goals',
}

export const MyBusinessStory = template.bind({})

MyBusinessStory.args = {
  style: {
    width: theme.spacing(129),
  },
  iconTitle: 'Send Money',
  src: MybusinessIcon,
}

export const PersonalAccountStory = template.bind({})

PersonalAccountStory.args = {
  style: {
    width: theme.spacing(129),
  },
  iconTitle: 'Personal Account',
  src: PersonalAccountIcon,
  caption: 'Send, spend, and receive around the world for less.',
}
