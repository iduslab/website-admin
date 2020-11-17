import React, { Children, FC, useState } from 'react'
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
// import { Home } from '../pages/dashboard'
import './styles.css'

const NavToggle = ({ expand, onChange }: any) => {
  return (
    <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <Navbar appearance='subtle' className='nav-toggle'>
        <Navbar.Body>
          <Nav>
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
  const [expand, setExpand] = useState<boolean>(true)

  const handleToggle = () => setExpand(!expand)

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
        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance='subtle'>
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey='1' active icon={<Icon icon='dashboard' />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey='2' icon={<Icon icon='group' />}>
                User Group
              </Nav.Item>
              <Dropdown
                eventKey='3'
                trigger='hover'
                title='Advanced'
                icon={<Icon icon='magic' />}
                placement='rightStart'>
                <Dropdown.Item eventKey='3-1'>Geo</Dropdown.Item>
                <Dropdown.Item eventKey='3-2'>Devices</Dropdown.Item>
                <Dropdown.Item eventKey='3-3'>Brand</Dropdown.Item>
                <Dropdown.Item eventKey='3-4'>Loyalty</Dropdown.Item>
                <Dropdown.Item eventKey='3-5'>Visit Depth</Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey='4'
                trigger='hover'
                title='Settings'
                icon={<Icon icon='gear-circle' />}
                placement='rightStart'>
                <Dropdown.Item eventKey='4-1'>Applications</Dropdown.Item>
                <Dropdown.Item eventKey='4-2'>Websites</Dropdown.Item>
                <Dropdown.Item eventKey='4-3'>Channels</Dropdown.Item>
                <Dropdown.Item eventKey='4-4'>Tags</Dropdown.Item>
                <Dropdown.Item eventKey='4-5'>Versions</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={handleToggle} />
      </Sidebar>

      <Container style={{ padding: 30 }}>
        <Header>
          <h3>Page Title</h3>
        </Header>
        <Content style={{ marginTop: 20 }}>{children}</Content>
      </Container>
    </Container>
  )
}
