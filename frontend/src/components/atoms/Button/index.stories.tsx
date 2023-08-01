import { Meta, Story } from '@storybook/react'
import CustomButton from '.'
import { ButtonProps } from '@mui/material'

export default {
  title: 'atoms/Button',
  component: CustomButton,
  onclick: { action: 'clicked' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['text', 'contained', 'outlined'],
      control: { type: 'select' },
    },
  },

  disabled: {
    control: {
      type: 'boolean',
    },
  },

  decorators: [(Story) => <Story />],
} as Meta

const template: Story<ButtonProps> = (args) => <CustomButton {...args} />

export const Primary = template.bind({})
Primary.args = {
  children: 'confirm',
  variant: 'contained',
}

export const DisabledButton = template.bind({})

DisabledButton.args = {
  children: 'continue',
  variant: 'contained',
  disabled: true,
}
