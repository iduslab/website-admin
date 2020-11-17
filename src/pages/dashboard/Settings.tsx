import React, { FC, useEffect, useState } from 'react'
import { useSetting } from '../../hooks/setting'

export const Settings: FC = () => {
  const { fetchSettings, state: settingState } = useSetting()

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    console.log(settingState)
  }, [settingState])

  return (
    <div>
      <div></div>
    </div>
  )
}
