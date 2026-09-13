import React, { useId, useState } from 'react'


const InputField = React.forwardRef(function InputField({
    labelText,
    className,
    type="text",
    ...props},
    ref) {

    const [inputText,setInputText] = useState("");

    const handleChange = (e)=>{
        if(typeof callback ==='function') callback(...callbackArgs);
        setInputText(e.target.value);
    }

    const id = useId()

  return (
    <div className={`flex flex-col w-full ${className}`}>
        <label 
            htmlFor={id}
            className={`p-2 mb-1}`}
        >
            {labelText}
        </label>
        <input 
            type={type}
            value={inputText}
            onChange={handleChange}
            id={id}
            className={`p-2 mb-1`}
            ref={ref}
            {...props}
        />
    </div>
  )
})




export default InputField
