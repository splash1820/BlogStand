//Real-Time-Editor

import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'

function RTE({name,control,label,defaultText=""}) {


    
  return (
    <div className='w-full'>
        {label && 
        <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
            name={name||"content"}
            control={control}
            render={({field:{onChange}})=>(
                <Editor
                    initialValue={defaultText}
                    init={{
                        initialValue: defaultText,
                        height: 500,
                        menubar: false,
                        plugins: [ //Change as needed
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ], //Change as needed   
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        
                    }}
                    onEditorChange={onChange}
                />
            )}

        />
    </div>
  )
}

export default RTE
