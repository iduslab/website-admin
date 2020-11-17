import React, { FC } from 'react'
import { Placeholder, Loader } from 'rsuite'

type props = {
  paragraph?: number
}

export const Loading: FC<props> = ({ paragraph = 0 }) => {
  return (
    <div>
      <Placeholder.Paragraph rows={paragraph}></Placeholder.Paragraph>
      <Loader backdrop content='loading...' vertical />
    </div>
  )
}
