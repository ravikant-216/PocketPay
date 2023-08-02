import { Tab, Tabs, TabsProps, styled } from '@mui/material'
import React from 'react'
import theme from '../../../theme'

export interface CustomTabsProps extends TabsProps {
  tabs?: { label: string; content: React.ReactNode }[]
  value?: number
}

const CustomTab = styled(Tab)({
  color: theme.palette.text.mediumEmphasis,
  '&.Mui-selected': {
    color: theme.palette.primary[500],
  },
  '& .MuiTabIndicator-root': {
    backgroundColor: theme.palette.primary[500],
  },
  typography: {
    ...theme.typography.caption,
  },
})

const TabsComponent = (props: CustomTabsProps) => {
  const [value, setValue] = React.useState(props.value ?? 0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs value={value} onChange={handleChange} data-testid="tabs">
        {props.tabs?.map((item) => (
          <CustomTab label={item.label} key={item.label} />
        ))}
      </Tabs>
      {props.tabs?.[value]?.content}
    </>
  )
}

export default TabsComponent
