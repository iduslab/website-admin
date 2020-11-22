import React, { FC, useEffect, useState } from 'react'
import { Button, Icon, IconButton, Modal, Table, Input } from 'rsuite'
import {
  ISetting,
  GetSettingDetail,
  UpdateSetting,
  AddSetting
} from '../../apis/setting'
import { DisplayError, DisplaySuccess } from '../../utils/Notification'
import { useAuth } from '../../hooks/auth'
import { useSetting } from '../../hooks/setting'
import { UpdateSettingModal } from '../../components/modal/UpdateSetting'

const { Column, HeaderCell, Cell } = Table

export const Settings: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const [modalTargetData, setModalTargetData] = useState<ISetting>({
    name: '',
    value: '',
    description: ''
  })

  const { fetchSettings, state: settingState } = useSetting()

  useEffect(() => fetchSettings(), [])

  const ActionCell = ({ rowData, ...props }: any) => {
    const handleAction = async () => {
      try {
        const res = await GetSettingDetail(rowData.name)
        const { data } = res.data
        setModalTargetData({
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

  const onCancelModal = () => {
    setShowModal(false)
  }

  const RenderTable = () => (
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
  )

  return (
    <>
      <RenderTable />
      <UpdateSettingModal
        showModal={showModal}
        cancelModal={onCancelModal}
        targetData={modalTargetData}
      />
    </>
  )
}
