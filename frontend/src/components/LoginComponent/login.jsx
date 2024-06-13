import React,{useState} from 'react'
import Register from '../RegisterComponent/register'; 
import { useGetloginMutation } from '../../ssiapi/apiSlice';
import Toast from '../../toast'; 
import { useNavigate } from "react-router-dom";


const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();
  const [sendcredential]=useGetloginMutation()
  const [showToast, setShowToast] = useState(false);
  const [error, seterror] = useState('');
  const [authenticated, setauthenticated] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    try{
      if (!username|| !password) {
       // alert('Please enter username and password');
        seterror("Please enter username and password")
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000); 
        return;
      }
      const data={"username":username,"password":password}
      const response=await sendcredential(data).unwrap()
      setauthenticated(true)
      localStorage.setItem("authenticated", true);
      localStorage.setItem("loggedusername",username);
      localStorage.setItem("token",response.token);
      navigate("/home");
      
    }
    catch(err){
    
      seterror(err.data.error);
      setShowToast(true);
      setTimeout(() => {
           setShowToast(false);
         }, 2000);
    }

    
}
  return (
    <div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
             <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-full max-w-lg " >
               
                    <div className='bg-black text-white p-3 mb-6 rounded-tl-lg rounded-tr-lg '>
                                <h2 className="text-2xl font-bold text-center">SSI Login</h2>
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
                        className="w-full p-2 border border-black rounded "
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
                    <div className="flex justify-center">
                      <button  type='submit'
                      className="bg-black text-white px-4 py-2 rounded">
                         Login
                      </button>
                    </div>
                    <p className="text-sm text-center font-light   ">
                      Don’t have an account yet? <button  onClick={()=>{navigate("/signup")}}   className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</button>
                   </p>

                
             </form>
             {showToast && <Toast message={error}  onClose={() => setShowToast(false)} />}
        </div>
    </div>
  )
}

export default login
