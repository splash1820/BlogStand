import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../services/storage'

function BlogCard({$id,title,featuredImage}) { //The $id syntax is inspired from appwrite
  return (
    <Link to={`/blogs/${$id}`}>
    <div className='w-full'>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={storageService.getImagePreview(featuredImage)} alt='Image not found' className='rounded-xl'/>
            </div>
            <h2 
            className='text-xl font-bold'>
                {title}
            </h2>
        </div>
    </div>
    </Link>

  )
}

export default BlogCard
