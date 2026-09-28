import React, { useState } from 'react'
import authService from '../services/auth'
import {login as storeLogin} from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {InputField,Button} from './index'; 

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = useState("");
    
    const {register,handleSubmit} = useForm({mode:"onBlur"});//the mode tells react-hook-form when to validate the input fields. onBlur means it will validate when the user leaves the input field.

     const handleLogin = async (data)=>{
        setError("");
        try {
            const session = await authService.loginAccount(data);
            if(session){
                const userData = authService.getCurrentUser();
                if(userData){ 
                    dispatch(storeLogin({userData}));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <div className='mb-2 flex justify-center'>
                <span className="inline-block w-full max-w-25">
                    <p className='text-2xl'>BlogStand</p>
                </span>
      </div>
      <h2 className='text-center text-2xl'>Sign in to your account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
            to={`/signup`}
            className='font-medium text-primary transition-all duration-200 hover:underline'
        >
            Signup
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
        <InputField
            labelText="Email:"
            placeholder="Enter your email" //handled by ...props syntax
            //syntax -> ...register(key,optionsObj)
            {...register("email",{
                required:"Email is required",//we can even give boolean value instead of string, but then the error message will be default one
                validate:{
                    //get regex from https://regexr.com/
                    matchPattern:(value)=> /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/g
                                    .test(value) || 
                                    "Email address must be a valid address"
                }
            })}
        />
        <InputField
            labelText="Password: "
            placeholder="Enter your password" //handled by ...props syntax
            //syntax -> ...register(key,optionsObj)
            {...register("password",{
                required:"Password is required",//we can even give boolean value instead of string, but then the error message will be default one
                validate:{
                    //get regex from https://regexr.com/
                    matchPattern:(value)=> /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
                                    .test(value) || 
                                    `- at least 8 characters
                                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                                    - Can contain special characters`
                }
            })}
        />

        <Button type="submit"
            className="w-full"    
        >
            Sign In
        </Button>
      </form>
    </div>
  )
}

export default Login
