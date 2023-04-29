import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addPost , editPost , deletePost} from '../redux/postSlice'

export default function Posts(){
    // Handle the Add post title and description
    const [title , setTitle] = useState('')
    const [desc , setDesc] = useState('')
    // Handle the Edit post title and description
    const [editTitle , setEditTitle] = useState('')
    const [editDesc , setEditDesc] = useState('')
    // Handle the open Edit post form
    const [edit , setEdit] = useState(false)
    const [id , setId] = useState()

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.items.posts)
    // Add post function
    function addItem(){
        if (title.length !== 0  && desc.length !== 0){
            dispatch(addPost({ id: posts.length + 1, title , desc}));
            setTitle("");
            setDesc("")
        } else{
            alert("Please fill the inputs below")
        }
    };
    // Edit post function
    function editItem(){
        if (editTitle.length !== 0  && editDesc.length !== 0){
            dispatch(editPost({ id, title: editTitle , desc: editDesc}));
            
            setEditTitle("");
            setEditDesc("");
        } else{
            alert("Sorry, nothing is updated");
        }
        setEdit(false);
    };

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
                <button onClick={addItem}>Add Post</button>
            </div>

            <div className="posts">
                {posts.length > 0 && 
                    posts.map((post) => (
                        <div className="post-card" key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.desc}</p>
                            <div className="post-edits">
                                <button onClick={() => {setEdit(true); setId(post.id)}}> Edit </button>
                                <button onClick={() => dispatch(deletePost({id : post.id}))}> Delete </button>
                            </div>
                            {edit && id === post.id && (
                                <>
                                    <input type="text" 
                                        placeholder="Change title" 
                                        value={editTitle} 
                                        onChange={(e) => setEditTitle(e.target.value)}/>
                                    <input type="text" 
                                        placeholder="Change description" 
                                        value={editDesc} 
                                        onChange= {(e) => setEditDesc(e.target.value)}/>
                                    <button onClick={editItem}>Edit Post</button>
                                </>
                            )}
                        </div>
                    ))
                }
            </div>
        </>
    )
}