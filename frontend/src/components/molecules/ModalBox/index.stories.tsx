import { Meta, Story } from '@storybook/react'
import ModalBox, { ModalBoxProps } from '.'
import { Box } from '@mui/material'
import theme from '../../../theme'

export default {
  title: 'molecules/ModalBox',

  decorators: [(Story) => <Story />],
} as Meta

const template: Story<ModalBoxProps> = (args) => <ModalBox {...args} />

export const ModalBoxStory = template.bind({})

ModalBoxStory.args = {
  open: true,
  children: (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.spacing(137),
        height: theme.spacing(127.5),
      }}
    >
      Content
    </Box>
  ),
}
