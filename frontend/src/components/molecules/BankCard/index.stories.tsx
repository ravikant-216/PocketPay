import { Story } from '@storybook/react'
import BankCard, { BankCardProps } from './'
import sbi from '../../../../public/assets/icons/sbi.svg'
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
