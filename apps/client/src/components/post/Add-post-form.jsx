import axios from 'axios';
import React from 'react';

function AddPostForm(props) {
    const addPost = async (e) => {
        e.preventDefault()
        const data = {
            content: e.target.content.value,
            title: e.target.title.value
        }
        const newPost = await axios.post(`${process.env.REACT_APP_PORT}/post`, data)
        e.target.content.value = ''
        e.target.title.value = ''
        props.updatePosts(newPost.data)
    }

    return (
        <div className='md:flex place-content-center '>
            <div className='mx-5 my-8  shadow-md p-6 md:w-[75%] '>
                <form className='flex flex-col gap-2 text-center font-mono ' onSubmit={addPost}>
                    <div className='flex justify-between md:gap-3 '>
                        <label className='w-[10%]'>title</label>
                        <input type="text" placeholder='goes here' name='title' className='border md:w-[93%] border-action rounded-lg ' />
                    </div>
                    <label>give it your best</label>
                    <textarea type="text" placeholder='whats on your mind' name='content' className='border border-action rounded-lg ' />
                    <div className='flex justify-center gap-16 '>
                        <button className='border-b-2 hover:bg-purple-900 hover:text-action w-[20%] shadow-lg rounded-lg'>post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPostForm;