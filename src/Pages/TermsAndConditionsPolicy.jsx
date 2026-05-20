import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function termsAndConditionPolicy() {
  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()

  let [settingData, setSettingData] = useState({
    termsAndCondition: import.meta.env.VITE_APP_SITE_NAME,
  })

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        setSettingData({ termsAndCondition: SettingStateData[0].termsAndCondition || settingData.termsAndCondition })
      }
    })()
  }, [SettingStateData.length])

  return (
    <>
      <Breadcrum title="Terms And Condition Policy" description={"At Heritage Ally, we value your privacy and are committed to protecting your personal information. Learn how we collect, use, and safeguard your data while ensuring a secure shopping experience."} />
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: settingData.termsAndCondition }} />
      </div>
    </>
  )
}
