import { StoryObj, Meta } from '@storybook/react'
import RadioButton from '.'
import { RadioGroup } from '@mui/material'

const meta: Meta<typeof RadioButton> = {
  title: 'atoms/RadioButton',
  component: RadioButton,
  argTypes: {
    label: {
      type: 'string',
      control: { type: 'text' },
    },
    labelPlacement: {
      control: { type: 'radio' },
      options: ['start', 'end'],
    },
    value: {
      type: 'string',
      control: { type: 'text' },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const RadioButtonStory: Story = {
  name: 'RadioButton',
  render: (props) => (
    <RadioGroup sx={{ display: 'inline-flex' }}>
      <RadioButton {...props} />
      <RadioButton value={'xxx'} label={'Second'} />
    </RadioGroup>
  ),
  args: {
    label: 'First',
    labelPlacement: 'end',
    value: 'value',
  },
}
