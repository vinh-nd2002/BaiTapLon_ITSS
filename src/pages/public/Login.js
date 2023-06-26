import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {AiFillFacebook} from 'react-icons/ai'

import background from './../../assets/background.jpeg'
import logo from './../../assets/logo.png'
export default function Login() {
  return (
    <div className='relative w-full h-screen bg-zinc-900/90'>
        <img className='absolute w-full h-full object-cover mix-blend-overlay' src={background} alt="/" />
    

    <div className='flex justify-center items-center h-full rounded-md'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8 ' >
          <div className='flex justify-center items-center '>
            <img src={logo} alt="logo" className='h-[200px]'/>
          </div>
            <div className='flex justify-between py-8'>
                <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><AiFillFacebook className='mr-2' /> Facebook</p>
                <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><FcGoogle className='mr-2' /> Google</p>
            </div>
            <div className='flex flex-col mb-4'>
                <label>Email</label>
                <input className='border relative bg-gray-100 p-2' placeholder='Enter your email' type="text" />
            </div>
            <div className='flex flex-col '>
                <label>Password</label>
                <input className='border relative bg-gray-100 p-2' placeholder='Enter your password' type="password" />
            </div>
            <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'>Sign In</button>
            <p className='flex items-center mt-2'><input className='mr-2' type="checkbox"  />Remember Me</p>
            <p className='text-center mt-8'>Not a member? Sign up now</p>
        </form>
    </div>
    </div>
  )
}