import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Login() {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')

    const {user , logIn} = UserAuth()

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        try {
            await logIn(email , password)
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    return (
        <div>
            <div className='w-full h-screen'>
                <img className='hidden sm:block w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/c741e848-5f1b-4230-8400-909aa0a4ac80/US-en-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
                <div className='w-full h-screen bg-black/60 fixed top-0 left-0 px-4 py-16'>
                    <div className='max-w-[450px] h-[600px] bg-black/75 mx-auto text-white'>
                        <div className='max-w-[320px] mx-auto py-16'>
                            <h1 className='text-3xl font-bold'>Sign In</h1>
                            <form onSubmit={handleSubmit} className='flex flex-col py-4'>
                                <input onChange={event => setEmail(event.target.value)} className='p-3 my-2 bg-gray-700 rounded-sm' type="email" placeholder='Email' name="" id="" />
                                <input onChange={event => setPassword(event.target.value)} className='p-3 my-2 bg-gray-700 rounded-sm' type="password" placeholder='Password' name="" id="" />

                                {
                                    error ? <p className='text-red-400 pl-2 pt-3'>{error}</p> : null
                                }

                                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
                                <div className='flex justify-between items-center text-sm text-gray-600'>
                                    <p><input className='mr-2' type="checkbox" name="" id="" />Remember me</p>
                                    <p>Need Help ?</p>
                                </div>
                                <p className='py-8'><span className='text-gray-600'>New to Netflix ?</span>
                                    <Link to={'/Signup'}> Sign Up</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login