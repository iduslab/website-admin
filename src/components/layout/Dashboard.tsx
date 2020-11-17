import React, { Children, FC, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Container,
  Content,
  Dropdown,
  Header,
  Icon,
  Nav,
  Navbar,
  Sidebar,
  Sidenav
} from 'rsuite'
import { useAuth } from '../../hooks/auth'
// import { Home } from '../pages/dashboard'
import './styles.css'

const NavToggle = ({ expand, onChange }: any) => {
  const auth = useAuth()

  const handleSignout = () => {
    auth.SignOut()
  }

  return (
    <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <Navbar appearance='subtle' className='nav-toggle'>
        <Navbar.Body>
          <Nav onSelect={handleSignout}>
            <Nav.Item>
              <Icon icon='sign-out' />
            </Nav.Item>
          </Nav>

          <Nav pullRight>
            <Nav.Item
              onClick={onChange}
              style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </div>
  )
}

export const DashboardLayout: FC = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  const [expand, setExpand] = useState<boolean>(true)

  const handleToggle = () => setExpand(!expand)

  const handleOnSelect = (page: string, b: any) => {
    console.log(b)
    history.push(`/dashboard/${page}`)
  }

  return (
    <Container style={{ height: '100vh' }}>
      <Sidebar
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          boxShadow: '0 0.1em 0.5em 0 rgba(0, 0, 0, 0.28)'
        }}
        width={expand ? 260 : 56}
        collapsible>
        <Sidenav.Header style={{ marginBottom: 8 }}>
          <div
            style={{
              padding: 16,
              paddingLeft: 20,
              backgroundColor: '#34c3ff',
              color: '#fff',
              fontSize: 18
            }}>
            {expand ? (
              <span style={{}}> Idus Lab</span>
            ) : (
              <Icon icon='lightbulb-o' size='lg' style={{ verticalAlign: 0 }} />
            )}
          </div>
        </Sidenav.Header>
        <Sidenav
          expanded={expand}
          defaultOpenKeys={['3']}
          appearance='subtle'
          activeKey={location.pathname.replaceAll('/dashboard/', '')}
          onSelect={handleOnSelect}>
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey='home' active icon={<Icon icon='dashboard' />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey='send-notice' icon={<Icon icon='bell-o' />}>
                Send Notive
              </Nav.Item>
              <Nav.Item eventKey='settings' icon={<Icon icon='gear' />}>
                Settings
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={handleToggle} />
      </Sidebar>

      <Container style={{ padding: 30 }}>
        <Header>
          <h3 style={{ textTransform: 'capitalize' }}>
            {location.pathname
              .replaceAll('/dashboard/', '')
              .replaceAll('-', ' ')}
          </h3>
        </Header>
        <Content style={{ marginTop: 20 }}>{children}</Content>
      </Container>
    </Container>
  )
}
