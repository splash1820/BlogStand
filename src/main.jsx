import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protected from './components/AuthLayout.jsx'
import {UserBlogs, AddBlog,Login,Signup,UpdateBlog,Blogs} from './pages'
import Logout from './components/Logout.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:'/blogs',
        element:(
          <Protected>
            <Blogs/>
          </Protected>)
      },
      {
        path:'/myBlogs',
        element:(
          <Protected>
            <UserBlogs/>
          </Protected>
        )
      },
      {
        path:'/create-blog/:slug',
        element:(
          <Protected>
            <AddBlog/>
          </Protected>
        )
      },
      {
        path:'/edit-blog/:slug',
        element:(
          <Protected>
            <UpdateBlog/>
          </Protected>
        )
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/Signup',
        element:<Signup/>
      },
      {
        path:'/logout',
        element:<Logout/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)
