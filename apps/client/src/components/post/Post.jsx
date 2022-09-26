import axios from './../../api/axios';
import React, { useEffect, useState } from 'react';
import AddPostForm from './Add-post-form';
import PostsCard from './PostsCard';

function Post(props) {
    const [posts, setPosts] = useState()

    const getPosts = async () => {
        const postsData = await axios.get(`/postAll`)
        setPosts(postsData.data)
    }
    const updatePosts = (post) => {
        setPosts([...posts, post])
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div>

            <AddPostForm getPosts={getPosts} user={props.user} updatePosts={updatePosts} />
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-4 font-mono gap-x-5 gap-y-8'>

                {posts && posts.map((post) => {
                    let user = {};
                    if (post.UserId === props.user.id) {
                        user = props.user
                    }
                    return <PostsCard post={post} loggedUser={props.user} author={user} getPosts={getPosts} />
                })}
            </div>
        </div>
    );
}

export default Post;