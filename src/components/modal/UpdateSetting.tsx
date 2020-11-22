import React, { FC, useEffect, useState } from 'react'
import { Button, Input, Modal } from 'rsuite'
import { ISetting, UpdateSetting } from '../../apis/setting'
import { useAuth } from '../../hooks/auth'
import { DisplayError, DisplaySuccess } from '../../utils/Notification'

type props = {
  cancelModal: () => void
  showModal: boolean
  targetData: ISetting
}

export const UpdateSettingModal: FC<props> = ({
  cancelModal,
  targetData,
  showModal
}) => {
  const auth = useAuth()

  const [value, setValue] = useState<string>('')

  useEffect(() => setValue(targetData.value), [targetData.value])

  const onSend = async () => {
    try {
      await UpdateSetting(auth.authState.accessToken, targetData.name, value)
      DisplaySuccess('성공적으로 변경되었습니다.')
    } catch (e) {
      console.log(e)
      DisplayError('처리중 에러가 발생하였습니다')
    }
    cancelModal()
  }

  return (
    <Modal show={showModal} onHide={cancelModal} onExited={cancelModal}>
      <Modal.Header>
        <Modal.Title>{targetData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{targetData.description}</div>
        <Input
          style={{ marginTop: 15 }}
          componentClass='textarea'
          rows={3}
          value={value}
          onChange={(value: any) => setValue(value)}
          placeholder='Enter Value...'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSend} appearance='primary'>
          Ok
        </Button>
        <Button onClick={cancelModal} appearance='subtle'>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
