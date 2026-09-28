import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import dbService from '../services/DB';
import { BasicContainer, Button } from '../components';
import storageService from '../services/storage';
import { useNavigate } from 'react-router-dom';

function UserBlogs() {

    const [blogs,setBlogs] = useState([]);
    const {userData} = useSelector(state=> state.userData);
    const navigate = useNavigate();

    const isAuthorized = userData!==undefined;

    useEffect(()=>{
        if(isAuthorized){
            dbService.getBlogsByUserId(userData.id)
                .then(blogs => setBlogs(blogs))
                .catch(error => `Unable to fetch blogs: ${error}`)
        }
        
    },[blogs])

    const handleEdit = (id)=>{
        navigate(`blogs/${id}`)
    }

    const handleDelete = (id)=>{
        dbService.removeBlog(id).then(()=>{
            setBlogs(blogs=>{
                return blogs.filter(blog => blog.id!==id)
            })
        })
    }
    return (
        <div className='py-8'>
            <BasicContainer>
                <ul>
                    {blogs.length>0 ? 
                    blogs.map(blog=>{
                        <li key={blog.$id} className='flex text-wrap'>
                            <img
                                src={storageService.getImagePreview(blog.featuredImage)}
                                className='inline-block size-2 mr-2'
                            />
                            <p className='min-w-0 flex-1 truncate'></p>
                            <Button 
                                onClick ={handleEdit}
                                bgColor = "bg-green"
                                className = "mr-2"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick = {handleDelete}
                                bgColor = "bg-red"
                            >
                                Delete
                            </Button>
                        </li>
                    })
                    :
                <p className='text-2xl'>You Have no blogs</p>
                }
                </ul>
            </BasicContainer>
        </div>
  )
}

export default UserBlogs
