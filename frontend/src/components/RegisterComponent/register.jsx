import React, { useState } from 'react'
import { useAdduserMutation } from '../../ssiapi/apiSlice';
import Toast from '../../toast';
import { useNavigate } from "react-router-dom";

const register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail]=useState(); 
    const [companyname ,setCompanyname] =useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [cpassword,setCpassword] =useState();
    const [adduser]=useAdduserMutation();
    const [showToast, setShowToast] = useState(false);
    const [error, seterror] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const handleSubmit =async (event) => {
          event.preventDefault();
           try{
                if (!companyname || !email || !username || !password || !cpassword) {
                    seterror("Please enter username and password")
                    setShowToast(true);
                    setTimeout(() => {
                    setShowToast(false);
                    }, 2000); 
                    return;
                }
                
                else if(cpassword!=password){
                    seterror("Password and Confirm password should be same")
                    setShowToast(true);
                    setTimeout(() => {
                    setShowToast(false);
                    }, 2000); 
                    return;
                }
                else {
                    const data={"companyname":companyname,"email":email,"username":username, "password":password}
                    await adduser(data).unwrap()
                    seterror("SSI Registration is Successfull")
                    setShowToast(true);
                    setTimeout(() => {
                    setShowToast(false);
                    }, 2000); 
                    navigate("/");
                }
           }catch(err){
            if(err.data.sql === `Duplicate entry '${username}' for key 'username'`){
                seterror("Use different Username");
                setShowToast(true);
                setTimeout(() => {
                  setShowToast(false);
                }, 2000);
            }
            else{
                seterror(err.data.error);
                setShowToast(true);
                setTimeout(() => {
                  setShowToast(false);
                }, 2000);
            }
             
           }
    }
  return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100"> 
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-lg">
                <div className='bg-black text-white p-2 mb-4'>
                        <h2 className="text-2xl font-bold text-center">SSI Registration</h2>
                </div>
                <div className="mb-4 ">
                <label className="block text-black font-semibold mb-2" htmlFor="email">Email name</label>
                    <input 
                    className="w-full p-2 border border-black rounded "
                    type="email" 
                    name="email"
                    required
                    value={email || ""}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-black font-semibold mb-2" htmlFor="email">Company name</label>
                    <input 
                    className="w-full p-2 border border-black rounded "
                    type="text" 
                    name="companyname"
                    required
                    value={companyname || ""}
                    onChange={(e)=>{setCompanyname(e.target.value)}}
                    
                    />
                </div>
            
                <div className="mb-4">
                    <label className="block text-black font-semibold mb-2" htmlFor="email">Username</label>
                    <input 
                    className="w-full p-2 border border-black rounded "
                    type="username" 
                    name="username"
                    required
                    value={username || ""}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    
                    />
                </div>
            
                <div className="mb-4">
                    <label className="block text-black font-semibold mb-2" htmlFor="email">Password</label>
                    <input 
                    className="w-full p-2 border border-black rounded  "
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={password || ""}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                     <button 
                        type="button"
                        className=" m-2 p-2 border rounded "
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-black font-semibold mb-2" htmlFor="email">Confirm Password</label>
                    <input 
                    className="w-full p-2 border border-black rounded  "
                    type="text" 
                    name="password"
                    required
                    value={cpassword || ""}
                    onChange={(e)=>{setCpassword(e.target.value)}}
                    />
                </div>
            
                <div className="flex justify-center">
                    <button type='submit' 
                    className="bg-black text-white px-4 py-2 rounded">
                     Register
                    </button>
                </div>
                <p className="text-sm text-center font-light   ">
                      Already a user? <button  onClick={()=>{navigate("/")}}   className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</button>
                   </p>
            </form>
            {showToast && <Toast message={error} onClose={() => setShowToast(false)} />}
    </div>
  )
}

export default register
