import React from 'react'
import { getCurrentUser } from '../lib/authStorage'
import LogoutButton from './auth/LogoutButton';
import profilIkonica from '../assets/dzoni.png'

export const Profil = () => {
  const user = getCurrentUser();
  
  return (
    <div className='absolute left-14 top-14 rounded-xl border border-light-gray bg-secondary px-6 py-4 flex gap-4  '>
        <div className='relative overflow-hidden rounded-full border-4 border-white aspect-square w-20'>
        <img src={profilIkonica} alt="Ikonica" className='object-cover w-full h-full'/>
        </div>
        <div className='flex flex-col'>
            <h3 className='text-xl font-bold'>{user?.firstName} {user?.lastName}</h3>
            <LogoutButton />
        </div>
    </div>
  )
}
