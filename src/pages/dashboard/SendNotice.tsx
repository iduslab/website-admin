import React, { FC, useState } from 'react'
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  FormProps,
  HelpBlock,
  Icon,
  IconButton,
  Input,
  Modal,
  Notification,
  Schema,
  Table
} from 'rsuite'
import {
  SendNotice as SendNoticeAPI,
  IWebhook,
  IWebhookEmbedFields
} from '../../apis/notice'
import { useAuth } from '../../hooks/auth'

const { StringType } = Schema.Types
const { Column, Cell, HeaderCell } = Table

const model = Schema.Model({
  content: StringType(),
  embedTitle: StringType().isRequired('이 향목는 필수입니다'),
  embedDescription: StringType(),
  embedColor: StringType()
    .isRequired('이 향목은 필수입니다.')
    .isHex('#?????? 형식으로 적어주세요')
})

type ModalInfo = {
  show: boolean
  name: string
  value: string
  update: boolean
  updateID?: number
}

export const SendNotice: FC = () => {
  let id = 0

  const auth = useAuth()
  const [formData, setFormData] = useState<any>()
  const [fields, setFields] = useState<IWebhookEmbedFields[]>()
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    show: false,
    name: '',
    value: '',
    update: false
  })

  const handleSubmit = async (checkStatus: boolean) => {
    if (!checkStatus) return
    try {
      const webhookContent: IWebhook = {
        content: formData.content,
        embeds: [
          {
            title: formData.embedTitle,
            description: formData.embedDescription,
            color: parseInt(
              '0x' + String(formData.embedColor).replaceAll('#', '')
            ),
            fields
          }
        ]
      }
      await SendNoticeAPI(auth.authState.accessToken, webhookContent)
      Notification['success']({
        title: 'Successful',
        description: '성공적으로 전송되었습니다'
      })
    } catch (e) {
      Notification['error']({
        title: 'ERROR',
        description: e
      })
    }
  }

  const handleAddField = () =>
    setModalInfo({
      show: true,
      name: '',
      value: '',
      update: false
    })

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
    const handleAction = async () => {
      setModalInfo({
        show: true,
        name: rowData.name,
        value: rowData.value,
        update: true,
        updateID: rowData.id
      })
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

  const onOkModal = () => {
    const { update, updateID, name, value } = modalInfo
    if (update) {
      if (fields) {
        let newFields: IWebhookEmbedFields[] = fields
        const index = newFields.findIndex((x) => x.id === updateID)
        newFields[index].name = name
        newFields[index].value = value
        setFields(newFields)
      }
    } else {
      setFields(
        fields
          ? fields.concat({
              id: id++,
              name,
              value
            })
          : [
              {
                id: id++,
                name,
                value
              }
            ]
      )
    }
    closeModal()
  }

  const closeModal = () =>
    setModalInfo({
      show: false,
      name: '',
      value: '',
      update: false
    })

  return (
    <div>
      <div>
        <Form
          fluid
          model={model}
          onSubmit={handleSubmit}
          onChange={(value) => setFormData(value)}>
          <FormGroup>
            <ControlLabel>내용</ControlLabel>
            <FormControl name='content' />
            <HelpBlock tooltip>임베드 없이 보내질 내용입니다</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>임베드 제목</ControlLabel>
            <FormControl name='embedTitle' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>임베드 설명</ControlLabel>
            <FormControl
              rows={5}
              name='embedDesription'
              componentClass='textarea'
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>임베드 색상</ControlLabel>
            <FormControl name='embedColor' />
          </FormGroup>
          <FormGroup>
            <ControlLabel>임베드 필드</ControlLabel>
            <Table height={420} data={fields}>
              <Column flexGrow={1} resizable>
                <HeaderCell>제목</HeaderCell>
                <Cell dataKey='name' />
              </Column>

              <Column flexGrow={2} resizable>
                <HeaderCell>내용</HeaderCell>
                <Cell dataKey='value' />
              </Column>

              <Column width={200}>
                <HeaderCell>
                  <IconButton
                    appearance='subtle'
                    onClick={handleAddField}
                    icon={<Icon icon='plus-circle' />}
                  />
                </HeaderCell>
                <ActionCell datakey={'id'} />
              </Column>
            </Table>
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button appearance='primary' type='submit'>
                Submit
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </div>
      <Modal show={modalInfo.show} onHide={closeModal} onExited={closeModal}>
        <Modal.Header>
          <Modal.Title>
            {modalInfo.update ? '필드 수정' : '필드 추가'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <ControlLabel>제목</ControlLabel>
              <Input
                value={modalInfo.name}
                onChange={(name: string) =>
                  setModalInfo({ ...modalInfo, name })
                }
                placeholder='제목을 입력해주세요'
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>제목</ControlLabel>
              <Input
                value={modalInfo.value}
                onChange={(value: string) =>
                  setModalInfo({ ...modalInfo, value })
                }
                placeholder='내용을 입력해주세요'
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onOkModal} appearance='primary'>
            Ok
          </Button>
          <Button onClick={closeModal} appearance='subtle'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
