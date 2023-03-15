import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../components/UseSideNav'

export default function UserLayout() {
  return (
    <div className='bg-neutral-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='border-b border-gray-300 shadow-sm md:col-span-9 lg:col-span-10'>
            {/* Out sẽ có thể là profile password history ứng với từng path được matched */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
