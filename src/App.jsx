import { useEffect, useState } from 'react'
import config from './config/appwriteConfig.js'
import authService from './services/auth.js'
import {login,logout} from './store/authSlice.js'
import { Outlet } from 'react-router-dom';
import {Header,Footer,InputField} from './components/index.js'

function App() {
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    authService.getCurrentUser()
      .then(userData =>{
        if(userData){
          login({userData})
        }else{
          logout();
        }
      })
      .finally(()=>setLoading(false));
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap'>
      <div className='w-full'>  
        <Header/>
        <main>
          <Outlet />
        </main>
        <Footer/>
        
      </div>
    </div>)
    :
    "Loading"

}

export default App
