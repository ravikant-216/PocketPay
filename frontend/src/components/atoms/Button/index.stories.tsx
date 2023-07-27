import { Meta, Story } from '@storybook/react'
import CustomButton, { CustomButtonProps } from '.'
import theme from '../../../theme'

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

const template: Story<CustomButtonProps> = (args) => <CustomButton {...args} />

export const Primary = template.bind({})
Primary.args = {
  label: 'confirm',
  variant: 'contained',
  style: {
    borderRadius: theme.spacing(14),
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    padding: `${theme.spacing(4)} ${theme.spacing(7)}`,
    textTransform: 'none',
  },
}

export const DisabledButton = template.bind({})

DisabledButton.args = {
  label: 'continue',
  variant: 'contained',
  style: {
    color: theme.palette.structuralColors.white,
    backgroundColor: theme.palette.primary[500],
    borderRadius: theme.spacing(14),
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    padding: `${theme.spacing(4)} ${theme.spacing(7)}`,
  },
  disabled: true,
}
