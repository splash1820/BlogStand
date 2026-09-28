import React, { useEffect, useState } from 'react'
import dbService from '../services/DB'
import { BasicContainer, BlogCard } from '../components';

function Blogs() {

    const [blogs,setBlogs] = useState([]);
    
    useEffect(()=>{
        dbService.getAllBlogs()
         .then((blogs)=>setBlogs(blogs))
         .catch((error)=>`failed to fetch blogs: ${error }`);
         
    },[])

  return (
    <div className='py-8'>
    <BasicContainer className="flex flex-wrap">
        {blogs.lenght>0 ? blogs.map(blog=>{
        <BlogCard
            className="p-2"
            key={blog.$id}
            {...blog}
        />
        }):
      <p className='text-2xl'>No Blogs to Show</p>}
    </BasicContainer>
      
    </div>
  )
}

export default Blogs
