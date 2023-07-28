import { Meta, Story } from '@storybook/react'
import Image, { ImageProps } from '.'

import noTransaction from '../../../../public/assets/icons/noTransaction.svg'

export default {
  title: 'atoms/Image',
  component: Image,
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<ImageProps> = (args) => <Image {...args} />

export const Primary = template.bind({})

Primary.args = {
  src: noTransaction,
  alt: 'noTransactionIllustration',
  className: 'image',
}
