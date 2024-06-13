import React,{useState,useEffect} from 'react'
import Navbar from '../NavComponent/navbar'
import Dashboard from '../DashboardComponent/dashboard'
import { useNavigate } from "react-router-dom";
import Inventry from '../InventaryComponent/inventry';
import Invoice from '../InvoiceComponent/invoice';
import Invoicelist from '../InvoiceListComponent/invoicelist';

const Home = () => {
  const [authenticated, setauthenticated] = useState(false);
  const [tab,setTab]=useState(1);
  const [theme,setTheme]=useState('light')
  
  const loggedeusername =localStorage.getItem('loggedusername');
  const token =localStorage.getItem('token');
  const navigate = useNavigate();
 
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) { 
         setauthenticated(loggedInUser);
    }
    }, []);

    const tabToggle =(id)=>{
      setTab(id);
    }

    const logout = () => {
      localStorage.removeItem("loggedusername");
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
      setauthenticated(false)
      navigate("/");             
      };

      if(!authenticated){
        return(
          <div className="text-4xl flex justify-center mt-10 items-center font-bold   text-red-600">    
            <span className="text-7xl">&#128545;</span>  401 Unauthorized
          </div>
        )
        }
        else{
            return(
              <div className={`${ theme == "light" ? 'ransition  delay-150 transition-duration: 150ms  bg-white  text-black': 'bg-black text-white  ' }  `}>
                  <Navbar  logout={logout} theme={theme} setTheme={setTheme}/>
                  <div className={`container font-semibold  bg-gray-800`}>
                    <ul  className="flex ">
                      <li className={`p-3 ${tab==1 ?'bg-white text-black mt-2 ml-2 mr-2 rounded-t-lg':'text-white m-2 rounded-lg bg-blue-600 '}`}><button  onClick={()=>{tabToggle(1)}}>Inventries</button></li>
                      <li className={`p-3 ${tab==2 ?'bg-white text-black mt-2 ml-2 mr-2 rounded-t-lg':'text-white m-2 rounded-lg bg-blue-600 '}`}><button onClick={()=>{tabToggle(2)}}>Dashboard</button></li>
                      <li className={`p-3 ${tab==3 ?'bg-white text-black mt-2 ml-2 mr-2 rounded-t-lg':'text-white m-2 rounded-lg bg-blue-600 '}`}><button onClick={()=>{tabToggle(3)}}>Invoice</button></li>
                      <li className={`p-3 ${tab==4 ?'bg-white text-black mt-2 ml-2 mr-2 rounded-t-lg':'text-white m-2 rounded-lg bg-blue-600 '}`}><button onClick={()=>{tabToggle(4)}}>Invoice List</button></li>
                    </ul>
                  </div>
                   <div className={tab == 1 ? 'block':'hidden'}>
                     <Inventry theme={theme}/>
                   </div>
                   <div className={tab == 2 ? 'block':'hidden'}>
                      <Dashboard className={`${theme=="light"? 'bg-white  text-black':'bg-white  text-black'}`}/>
                   </div>
                   <div className={tab == 3 ? 'block':'hidden'}>
                      <Invoice theme={theme}/>
                   </div>
                   <div className={tab == 4 ? 'block':'hidden'}>
                      <Invoicelist theme={theme}/>
                   </div>
                    
              </div>
            )
        }

}

export default Home
