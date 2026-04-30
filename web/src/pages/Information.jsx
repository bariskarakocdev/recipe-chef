import React from 'react'
import { useSelector } from 'react-redux'
function Information() {
  const user = useSelector((state)=> state.app.user)
  return (
    <div className='information'>
      <div>Ad : {user.displayName ? user.displayName : "null"}</div>
      <div>Mail : {user.email}</div>
      <div>Son giriş tarihiniz : {user.metadata.lastSignInTime}</div>
      <div>Kayıt olma tarihiniz tarihiniz : {user.metadata.creationTime}</div>

     

    </div>
  )
}

export default Information