import { Meta, Story } from '@storybook/react'
import CountryDropdown, { Props } from '.'
import theme from '../../../theme'

export default {
  title: 'Organisms/CountryDropdown',
  component: CountryDropdown,
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
  size: 'medium',
  menuMaxHeight: theme.spacing(56),
  countryList: [
    {
      key: 'United States',
      iconTitle: 'United States',
      src: 'static/media/public/assets/icons/andorra.svg',
      alt: 'US Flag',
    },
    {
      key: 'United Kingdom',
      iconTitle: 'United Kingdom',
      src: 'static/media/public/assets/icons/GBP.svg',
      alt: 'UK Flag',
    },
  ],
}
