import React from 'react'
import { MaxWidthWrapper } from '../components';

export default function AuthPage({isRegisterPage}) {
  return (
    <>
    <MaxWidthWrapper className={"text-center"}>
    <div className='flex flex-col py-24 justify-center items-center '>
    <form action="" className='flex flex-col space-y-4 font-dm p-6 pb-8 w-full max-w-80 border border-gray-100 rounded-md shadow-lg'>
        <h1 className='font-semibold text-blue-600 text-2xl/7'>Signup</h1>
    { isRegisterPage &&            
            <div className='flex flex-col items-start'>
                <label htmlFor="" className='text-xs mb-px tracking-tight text-gray-600'> Full Name:
                </label>
                <input type="text" className='border text-gray-600 border-gray-200 w-full rounded-md px-2 py-1 focus:outline-gray-400 focus:outline-1'  />
            </div>
    }
            <div className='flex flex-col items-start'>
                <label htmlFor="" className='text-xs mb-px tracking-tight text-gray-600' > Username:
                </label>
                    <input type="text" className=' border border-gray-200 w-full rounded-md px-2 py-1 focus:outline-gray-400 focus:outline-1' />
            </div>
            <div className='flex flex-col items-start'>
                <label htmlFor="" className='text-xs mb-px tracking-tight text-gray-600'> Email:
                </label>
                    <input type="email" className=' border border-gray-200 w-full rounded-md px-2 py-1 focus:outline-gray-400 focus:outline-1' />
            </div>
            <div className='flex flex-col items-start'>
                <label htmlFor="" className='text-xs mb-px tracking-tight text-gray-600'> Password:
                </label>
                    <input type="password" className=' border border-gray-200 w-full rounded-md px-2 py-1 focus:outline-gray-400 focus:outline-1' />
            </div>
            <button className='bg-blue-600 text-sm rounded-lg p-2 text-white'>{ isRegisterPage?"Register":"Sign in" }</button>
        </form>
        </div>
        </MaxWidthWrapper>
    </>
  )
}
