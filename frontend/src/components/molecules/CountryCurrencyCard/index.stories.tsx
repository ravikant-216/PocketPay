import { StoryObj, Meta } from '@storybook/react'
import IndiaFlagIcon from '../../../../public/assets/icons/india.svg'
import CountryCurrencyCard from '.'

const meta: Meta<typeof CountryCurrencyCard> = {
  title: 'molecules/CountryCurrencyCard',
  component: CountryCurrencyCard,
  argTypes: {
    countryImageSrc: {
      control: { type: 'file', accept: '*.svg' },
    },
    countryImageAlt: {
      type: 'string',
    },
    countryCurrencyCode: {
      type: 'string',
    },
    countryName: {
      type: 'string',
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const CountryCurrencyCardStory: Story = {
  name: 'CountryCurrencyCard',
  args: {
    countryName: 'India',
    countryCurrencyCode: 'INR',
    countryImageAlt: 'India Flag Icon',
    countryImageSrc: IndiaFlagIcon,
  },
}
