import { StoryObj, Meta } from '@storybook/react'
import InputField from '.'

const meta: Meta<typeof InputField> = {
  title: 'Input Field',
  component: InputField,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['text', 'number', 'date', 'tel', 'password'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const InputFieldStory: Story = {
  name: 'Input Field',
  args: {
    label: 'label',
  },
}
