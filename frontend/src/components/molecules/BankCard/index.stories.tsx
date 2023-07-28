import { Story } from '@storybook/react'
import BankCard, { BankCardProps } from './'
import sbi from '../../../../public/assets/icons/sbi.svg'
import otherBank from '../../../../public/assets/icons/otherBank.svg'
import theme from '../../../theme'

export default {
  title: 'molecules/BankCard',
  component: BankCard,
  tags: ['autodocs'],
}

const Template: Story<BankCardProps> = (args) => <BankCard {...args} />
export const Default = Template.bind({})
Default.args = {
  iconTitle: 'State bank of India',
  src: sbi,
  alt: 'SBI Bank Icon',
  color: theme.palette.text.highEmphasis,
  width: theme.spacing(70),
}

export const Custom = Template.bind({})
Custom.args = {
  iconTitle: 'Other bank',
  src: otherBank,
  alt: 'Other bank',
  color: theme.palette.text.highEmphasis,
  width: theme.spacing(70),
}
