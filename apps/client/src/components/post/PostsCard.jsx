import axios from './../../api/axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'
function PostsCard(props) {
    const [comment, setComment] = useState(false)
    const [post, setPost] = useState(props.post)
    const [showPost, setShowPost] = useState(true)

    const getPost = async () => {
        const id = props.post.id
        const updatedPost = await axios.get(`/post/${id}`)
        setPost(updatedPost.data)
    }

    const addComment = async (e) => {
        e.preventDefault()
        const id = e.target.id
        const newCmnt = {
            content: e.target.comment.value,
            UserId: props.loggedUser.id
        }
        await axios.post(`/post/${id}/comment`, newCmnt)
        e.target.comment.value = ''
        setComment(!comment)
        getPost()
    }

    const deleteComment = async (e) => {
        e.preventDefault()
        const id = e.target.id
        await axios.delete(`/comment/${id}`)
        getPost()
    }


    const deletePost = async (e) => {
        e.preventDefault()
        const id = e.target.id
        await axios.delete(`/post/${id}`)
        setShowPost(false)
    }
    useEffect(() => {
        getPost()
    }, [])
    return (
        <>
            {showPost &&
                <div key={post?.id} className=' border shadow-xl flex flex-col border-slate-700 rounded-md h-fit '>
                    <div className='flex justify-between'>
                        <h2 className='text-center text-2xl mx-3 my-5'>{post?.title}</h2>
                        <aside className='flex place-items-center'>
                            <h3 className='text-center bg-black text-white rounded-lg p-2 text-md mx-3 my-5'>{props.author?.username}</h3>
                            {(post.UserId === props.loggedUser.id) &&
                                <form onSubmit={deletePost} id={post?.id} className='mt-3'>
                                    <button className='text-xl'><AiFillDelete className='h-6 w-fit border-2 m-2 rounded-full   hover:text-slate-500' /></button>
                                </form>}

                        </aside>
                    </div>
                    <p className='px-3 py-8 bg-black bg-opacity-10'>{post?.content}</p>
                    <div className=' flex flex-col gap-3 my-2'>
                        {post?.comments &&
                            post.comments.map((comment) => {
                                return <div className='flex justify-between'>
                                    <p className='px-5 border-y border-black'>{comment.content}</p>
                                    <div className='flex '>
                                        {(comment.User.id === props.loggedUser.id) &&
                                            <button className='mx-2 text-sm border-y rounded-xl hover:bg-black hover:text-white border-black h-fit' id={comment.id} onClick={deleteComment} ><AiFillDelete className='h-fit w-fit border-2 rounded-full hover:text-slate-500' /></button>
                                        }
                                        <p className='px-2 border-y bg-black text-white border-x rounded-md border-black h-fit'>{comment.User.username}</p>
                                    </div>
                                </div>
                            }
                            )}
                    </div>
                    <form className='flex flex-col my-3 place-items-center text-center' id={post?.id} onSubmit={addComment}>
                        <input type="text" name='comment' placeholder='comment' className='w-full border-y border-black  my-4' />
                        <button className='border-b-2  border-black shadow-xl hover:bg-action hover:text-purple-200 rounded-xl w-32'>comment</button>
                    </form>
                </div>
            }
        </>
    );
}

export default PostsCard;