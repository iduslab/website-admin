import React, { FC, useEffect, useState } from 'react'
import {
  Button,
  Icon,
  IconButton,
  Modal,
  Table,
  Notification,
  Input
} from 'rsuite'
import { ISetting, GetSettingDetail, UpdateSetting } from '../../apis/setting'
import { useAuth } from '../../hooks/auth'
import { useSetting } from '../../hooks/setting'

const { Column, HeaderCell, Cell } = Table

export const Settings: FC = () => {
  const auth = useAuth()

  const [showModal, setShowModal] = useState<boolean>(false)

  const [data, setData] = useState<ISetting>({
    name: '',
    value: '',
    description: ''
  })

  const { fetchSettings, state: settingState } = useSetting()

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    console.log(settingState)
  }, [settingState])

  const DisplaySuccess = (text: string) => {
    Notification['success']({
      title: 'Successful',
      description: text
    })
  }
  const DisplayError = (e: string) => {
    Notification['error']({
      title: 'ERROR',
      description: e
    })
  }

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
    const handleAction = async () => {
      try {
        const res = await GetSettingDetail(rowData.name)
        const { data } = res.data
        console.log(data)
        setData({
          name: rowData.name,
          description: rowData.description,
          value: data
        })
        setShowModal(true)
      } catch (e) {
        console.error(e)
        DisplayError('처리중 에러가 발생하였습니다')
      }
    }
    return (
      <Cell {...props} className='link-group'>
        <IconButton
          appearance='subtle'
          onClick={handleAction}
          icon={<Icon icon='edit2' />}
        />
      </Cell>
    )
  }

  const onCancel = () => {
    setShowModal(false)
  }

  const onSend = async () => {
    const { value, name } = data
    try {
      await UpdateSetting(auth.authState.accessToken, name, value)
      DisplaySuccess('성공적으로 변경되었습니다.')
    } catch (e) {
      console.error(e)
      DisplayError('처리중 에러가 발생하였습니다')
    }
    onCancel()
  }

  return (
    <div>
      <Table height={400} data={settingState.data}>
        <Column width={60} align='center' fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey='id' />
        </Column>

        <Column width={200}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey='name' />
        </Column>

        <Column width={400} resizable>
          <HeaderCell>Description</HeaderCell>
          <Cell dataKey='description' />
        </Column>

        <Column width={80} fixed='right'>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey={'name'} />
        </Column>
      </Table>
      <Modal show={showModal} onHide={onCancel} onExited={onCancel}>
        <Modal.Header>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{data.description}</div>
          <Input
            style={{ marginTop: 15 }}
            componentClass='textarea'
            rows={3}
            value={data.value}
            onChange={(value) => setData({ ...data, value })}
            placeholder='Enter Value...'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSend} appearance='primary'>
            Ok
          </Button>
          <Button onClick={onCancel} appearance='subtle'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
