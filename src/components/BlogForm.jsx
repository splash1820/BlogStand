import  { useCallback, useEffect } from 'react'
import { RTE, InputField, Button, SelectBtn } from './index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import storageService from '../services/storage'
import dbService from '../services/DB'

function BlogForm({ blog }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      slug: blog?.slug || "",
      status: blog?.status || true
    }
  });

  const navigate = useNavigate();
  const { userData } = useSelector(state => state.auth);

  const onSubmit = async (data) => {
    const file = data.image[0] ? storageService.uploadImage(data.image[0]) : null;
    if (blog) {
      if (file) {
        storageService.removeImage(blog.featuredImage);
      }
      const dbBlog = await dbService.updateBlog(blog.slug, {
        title: data.title,
        featuredImage: file?.$id || undefined,
        content: data.content || undefined
      });

      if (dbBlog) {
        navigate(`/blog/${dbBlog.$id}`);
      }
    } else {
      const dbBlog = await dbService.addBlog({
        ...data,
        userId: userData.$id
      })

      if (dbBlog) {
        navigate(`/blog/${dbBlog.$id}`)
      }
    }
  }

  const slugTranform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '') // Strips special chars
        .replace(/\s+/g, '-')           // Replaces spaces with hyphens
    return '';
  }, [])

  const titleVal = useWatch({ name: "title", control })

  useEffect(() => {
    setValue("slug", slugTranform(titleVal), { shouldValidate: true });
  }, [titleVal, setValue, slugTranform])

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {blog ? "Edit Blog Post" : "Create New Blog Post"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Primary Content */}
        <div className="lg:col-span-2 space-y-5">
          <InputField 
            labelText="Title" 
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
            {...register("title", { required: true })}
          />
          
          <InputField
            labelText="Slug"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-500 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            {...register("slug", { required: true })}
          />

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <RTE
              name="content"
              control={control}
              label="Content"
              defaultText={getValues("content")}
            />
          </div>
        </div>

        {/* Right Column: Settings & Meta Sidebar */}
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800/40 p-4 md:p-5 rounded-xl border border-gray-100 dark:border-gray-800 h-fit">
          
          {/* Image Upload Area */}
          <div className="space-y-2">
            <InputField
              labelText="Featured Image"
              type='file'
              accept='image/png, image/jpg, image/jpeg, image/gif'
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-200 cursor-pointer"
              {...register("image", { required: !blog })}
            />
          </div>

          {/* Current Image Preview (Fixed variable typo from 'post' to 'blog') */}
          {blog && blog.featuredImage && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Current Image Preview</span>
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <img
                  src={storageService.getImagePreview(blog.featuredImage)}
                  alt='Blog Preview'
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          )}
          
          {/* Toggle / Visibility */}
          <div className="space-y-2">
            <SelectBtn
              labelText="Visibility"
              options={["active", "inactive"]}
              checked="active"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              {...register("status")}
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              type="submit" 
              className={`w-full py-2.5 px-4 font-semibold text-white rounded-lg shadow-sm transition duration-200 ease-in-out hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                blog 
                  ? "bg-green-600 hover:bg-green-700 focus:ring-green-500" 
                  : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
              }`}
            >
              {blog ? "Update Post" : "Publish Post"}
            </Button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default BlogForm
