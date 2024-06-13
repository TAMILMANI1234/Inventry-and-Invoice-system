import React,{ useState }  from 'react';
import account from "../../assets/account.png";
import dark_icon from "../../assets/dark-icon.png";
import light_icon from "../../assets/light-icon.png";


const Navbar = ({logout,theme,setTheme}) => {
  const [isOpen, setIsOpen] = useState(false);

  const on_doggle=()=>{
    theme=="light" ? setTheme("dark") : setTheme("light")
 }

  return (
    <div>
       <nav className={`${theme =="light" ? 'bg-white text-black':'bg-black text-white'  }  shadow-md sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <p className="text-2xl font-bold  ">SSI</p>
                </div>
                  
              </div>
              <div class="hidden w-full md:block md:w-auto   " >
                   <ul className=' justify-center item-center font-medium flex flex-col p-4 md:p-0 mt-4rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ' >
                      
                      <li className='flex'><img src={account} width={40} /><span className='p-2 capitalize'>{localStorage.getItem('loggedusername')}</span></li>
                      <li className='p-2'> <button onClick={logout}>Logout</button></li>
                      <li>
                        <div>
                            <img src={theme=="light" ? dark_icon: light_icon} className='w-10'  onClick={()=>{on_doggle()}} alt='no more'/>   
                        </div>
                      </li>
                   </ul>
                </div>
              <div className="-mr-2 flex md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="#" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Services</a>
              <img src={account} width={40} />
            </div>
          </div>
        </nav>
      
    </div>
  )
}

export default Navbar
