import React from 'react'
import ProfileViewAndEdit from '../components/ProfileViewAndEdit'

function Profile() {
  return (
    <div className='min-h-screen bg-slate-50 py-12 pt-28'>
      <div className='container w-full h-full mx-auto'> 
        <ProfileViewAndEdit/>
      </div>
    </div>
  )
}

export default Profile