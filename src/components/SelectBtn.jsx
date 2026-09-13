import React, { useId } from 'react'
import { nanoid } from '@reduxjs/toolkit'

function SelectBtn({
    labelText,
    options=[],
    className,
    ...props
},ref) {

    const id =useId();
  return (
    <div>
        <label
            htmlFor={id}
        ></label>
      <select 
        className={`px-4 py-2 rounded-lg bg-white text-black ${className}`}
        ref={ref}
        id={id}>
        {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>            
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(SelectBtn) //Another syntax to use forwardRef()
