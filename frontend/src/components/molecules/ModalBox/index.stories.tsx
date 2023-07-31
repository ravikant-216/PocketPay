import { Meta, Story } from '@storybook/react'
import ModalBox, { ModalBoxProps } from '.'

export default {
  title: 'molecules/ModalBox',

  decorators: [(Story) => <Story />],
} as Meta

const template: Story<ModalBoxProps> = (args) => <ModalBox {...args} />

export const ModalBoxStory = template.bind({})

ModalBoxStory.args = {
  open: true,
  width: '548px',
  height: '510px',
}
