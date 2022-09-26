import { axiosPrivate } from './../../api/axios';
import React from 'react';
import { useState } from 'react';
import base64 from 'base-64'

const Auth = (props) => {
    const [newUser, setNewUser] = useState()

    const userForm = () => {
        setNewUser(!newUser)
    }

    const singup = async (e) => {
        e.preventDefault()
        const newUser = {
            "email": e.target.email.value,
            "password": e.target.password.value,
            "username": e.target.username.value
        }
        await axiosPrivate.post(`/signUp`, newUser)
            .then(res => {
                props.login(res.data)
            })
            .catch(e => alert(e.response.data))
    }
    const signin = async (e) => {
        e.preventDefault();
        const userData = {
            "email": e.target.email.value,
            "password": e.target.password.value
        };
        const encodedData = base64.encode(`${userData.email}:${userData.password}`);
        await axiosPrivate.post(`/signin`, {}, { headers: { Authorization: `Basic ${encodedData}` } })
            .then(res => {
                props.login(res.data)
            })
            .catch(e => alert(e.response.data));
    }
    return (
        <div className='font-mono md:my-20 md:mx-32 text-center text-sm md:text-lg'>
            <div className='flex flex-col items-center w-full'>
                <h2 className=' py-5 mt-16 px-4 border shadow-lg rounded-lg w-[70%] md:w-full'>Welcome to our Whiteboard!</h2>
                <div className='flex flex-col md:flex-row gap-4 md:gap-16 m-8 md:m-16'>
                    <button onClick={userForm} className={`border-b rounded-lg ${(!newUser) ? 'bg-black text-white' : 'bg-white'} shadow-lg border-black py-3 px-8`}>Login</button>
                    <button onClick={userForm} className={`border-b rounded-lg ${(newUser) ? 'bg-black text-white' : 'bg-white'}  shadow-lg border-black py-3 px-8`}>Join the tribe!</button>
                </div>
                {newUser &&

                    <div className='border shadow-lg md:w-[50%]'>
                        <form className='w-full text-left flex flex-col gap-7 border p-8 bg-black text-white rounded-lg' onSubmit={singup}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="username" required placeholder='username' className='text-black border w-full' name='username' />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" required placeholder='email' className='border w-full text-black' name='email' />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" required placeholder='password' className='text-black border w-full' name='password' />
                            </div>
                            <button className='border-b-2  border-white shadow-xl hover:bg-action hover:text-purple-200 rounded-xl my-3'>Sign Up</button>
                        </form>
                    </div>
                }
                {!newUser &&
                    <div className='border shadow-lg md:w-[50%] '>
                        <form className='w-full text-left flex flex-col gap-7 border rounded-lg p-8' onSubmit={signin}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="username" required placeholder='username' className='border w-full' name='username' />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" required placeholder='email' className='border w-full' name='email' />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" required placeholder='password' className='border w-full' name='password' />
                            </div>
                            <button className='border-b-2  border-black shadow-xl hover:bg-action hover:text-purple-200 rounded-xl my-3'>Log in</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default Auth;