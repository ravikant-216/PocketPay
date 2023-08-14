import { Story, Meta } from '@storybook/react'
import SearchBusiness, { SearchBusinessProps } from './index'
import theme from '../../../theme'

export default {
  title: 'organisms/SearchBusiness',
  component: SearchBusiness,
} as Meta

const Template: Story<SearchBusinessProps> = (args) => (
  <SearchBusiness {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onValueChange: (value) => console.log(value),
  style: {
    width: theme.spacing(129),
  },
}
