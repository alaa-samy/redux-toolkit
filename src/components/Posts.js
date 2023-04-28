import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addPost , deletePost} from '../redux/postSlice'

export default function Posts(){
    const [title , setTitle] = useState()
    const [desc , setDesc] = useState()
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.items.posts)

    function add(){
        dispatch(addPost({ id: posts.length + 1, title , desc}));
        setTitle("");
        setDesc("")
    };
    function del(postId){
        dispatch(deletePost({id: postId}))
    }

    return (
        <>
            <div className="form">
                <input type="text" 
                    placeholder="Enter post title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" 
                    placeholder="Enter post description" 
                    value={desc} 
                    onChange= {(e) => setDesc(e.target.value)}/>
                <button onClick={add}>Add Post</button>
            </div>

            <div className="posts">
                {posts.length > 0 && 
                    posts.map((post) => (
                        <div className="post-card" key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.desc}</p>
                            <div className="post-edits">
                                <button> Edit </button>
                                <button onClick={del({})}> Delete </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}