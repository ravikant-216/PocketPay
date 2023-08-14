import { Meta, Story } from '@storybook/react'
import ChooseBank, { ChooseBankProps } from '.'
import theme from '../../../theme'

export default {
  title: 'organisms/ChooseBank',
  component: ChooseBank,
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
} as Meta

const template: Story<ChooseBankProps> = (args) => <ChooseBank {...args} />

export const ChooseBankStory = template.bind({})

ChooseBankStory.args = {
  style: {
    width: theme.spacing(129),
  },
  onClickHandler: () => {
    console.log('clicked Lloyds Bank')
  },
  onCancelHandler: () => {
    console.log('clicked cancel button')
  },
}
