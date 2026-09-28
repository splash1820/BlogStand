import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dbService from '../services/DB';

function UpdateBlog() {

    const {slug} = useParams();
    const [blog,setBlog] = useState(null);

    useEffect(()=>{
        if(slug){
            dbService.getBlog(slug)
                .then((blog)=>setBlog(blog))
                .catch((error)=>`Unable to find your blog: ${error}`)
        } 
    },[])
  return (
    <div className='py-8'>
    {blog ?<BasicContainer>
        <BlogForm />
      </BasicContainer>
      :
      <p className='text-2xl'>Failed to load</p>}
    </div>
  )
}

export default UpdateBlog
