import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {Button, InputField} from './index';
import authService from '../services/auth'
import {login} from '../store/authSlice'

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = useState("");
    
    const [register,handleSubmit] = useForm();

    const handleSignup = async (data)=>{
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if(userData){
                const session = await authService.loginAccount(data);
                const currentUserData = await authService.getCurrentUser()
                if(currentUserData) {
                    dispatch(login({currentUserData}));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div>
        <div className='mb-2 flex justify-center'>
                <span className="inline-block w-full max-w-[100px]">
                    <p className='text-2xl'>BlogStand</p>
                </span>
      </div>
      <h2 className='text-center text-2xl'>Create New Account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have any account?&nbsp;
        <Link
            to={`/signin`}
            className='font-medium text-primary transition-all duration-200 hover:underline'
        >
           Register 
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(handleSignup)} className='mb-8'>
        <InputField
            labelText="Username: "
            placeholder="Enter your username"
            {...register("username",{
                required:true,
                validate:(value)=>/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
                            .test(value) ||
                            "1–30 characters. Use letters, numbers, underscores, and single non-consecutive periods."
            })}
        />
        <InputField
            labelText="Email:"
            placeholder="Enter your email" //handled by ...props syntax
            //syntax -> ...register(key,optionsObj)
            {...register("email",{
                required:true,
                validate:{
                    //get regex from https://regexr.com/
                    matchPattern:(value)=> /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/
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
                required:true,
                validate:{
                    //get regex from https://regexr.com/
                    matchPattern:(value)=> /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                                    .test(value) || 
                                    `- at least 8 characters
                                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                                    - Can contain special characters`
                }
            })}
        />
        <Button
            type="submit"
            className="w-full"
        >
            Sign up
        </Button>
      </form>
    </div>
  )
}

export default Signup
