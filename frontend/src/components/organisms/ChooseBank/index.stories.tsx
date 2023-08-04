import { Meta, Story } from '@storybook/react'
import ChooseBank, { ChooseBankProps } from '.'

export default {
  title: 'organisms/ChooseBank',
  component: ChooseBank,
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
} as Meta

const template: Story<ChooseBankProps> = (args) => <ChooseBank {...args} />

export const ChooseBankStory = template.bind({})

ChooseBankStory.args = {
  onClickHandler: () => {
    console.log('clicked Lloyds Bank')
  },
  onCancelHandler: () => {
    console.log('clicked cancel button')
  },
}
