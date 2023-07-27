import { StoryObj, Meta } from '@storybook/react'
import Typography from '.'

const meta: Meta<typeof Typography> = {
  title: 'atoms/Typography',
  component: Typography,
  argTypes: {
    children: {
      type: 'string',
      control: {
        type: 'text',
        max: 20,
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['h1', 'body1', 'body2', 'body3', 'caption', 'link'],
    },
    component: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'a'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const TypographyStory: Story = {
  name: 'Typography',
  args: {
    children: 'Typography',
    component: 'p',
  },
}
