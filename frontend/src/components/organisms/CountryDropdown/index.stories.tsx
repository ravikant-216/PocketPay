import { Meta, Story } from '@storybook/react'
import CountryDropdown, { Props } from '.'
import theme from '../../../theme'
import { COUNTRY_ARRAY } from '../../../strings/constants'

export default {
  title: 'Organisms/CountryDropdown',
  component: CountryDropdown,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    onChange: { action: 'onChange' },
  },
} as Meta

const Template: Story<Props> = (args) => <CountryDropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  style: {
    width: theme.spacing(129),
  },
  names: COUNTRY_ARRAY,
  size: 'medium',
  menuMaxHeight: theme.spacing(56),
}
