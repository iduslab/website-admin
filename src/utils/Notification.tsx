import React from 'react'
import { Notification } from 'rsuite'

export const DisplaySuccess = (text: string) => {
  Notification['success']({
    title: 'Successful',
    description: text
  })
}

export const DisplayError = (text: string) => {
  Notification['error']({
    title: 'Error',
    description: text
  })
}
