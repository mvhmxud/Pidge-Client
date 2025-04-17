import { Spinner } from '@/components/ui/spinner'
import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center h-screen'>
        <Spinner size='large' />
    </div>
  )
}

export default loading