import { Stack, styled } from '@mui/material'
import SideNavigation, {
  SideNavigationProps,
} from '../../organisms/SideNavigation'
import Header from '../../organisms/Header'

interface DashboardTemplateProps extends SideNavigationProps {
  Content: React.ReactNode
}

const StyledStack = styled(Stack)(() => ({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'stretch',
  gap: 1,

  '& .content': {
    flex: 1,
  },

  '& .navbar, & .header': {
    position: 'sticky',
    top: 0,
  },
}))

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  Content,
  newUser,
}) => {
  return (
    <StyledStack data-testid="DashboardTemplate">
      <SideNavigation className="navbar" newUser={newUser} />
      <Stack className="content">
        <Header className="header" />
        {Content}
      </Stack>
    </StyledStack>
  )
}

export default DashboardTemplate
