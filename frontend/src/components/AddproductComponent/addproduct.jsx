import React, { useState } from 'react';
import { useAddproductMutation } from '../../ssiapi/apiSlice';
import Toast from '../../toast';
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [insertproduct]=useAddproductMutation();
  const [product_name,setProduct_name]=useState();
  const [product_dis,setProduct_des]=useState();
  const [quantity,setQuantity]=useState();
  const [price,setPrice]=useState();
  const [stock_location,setStock_location]=useState('Main storage');
  const [showToast, setShowToast] = useState(false);
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(event)=>{
    event.preventDefault();
    try{
      const data={
         "username":localStorage.getItem("loggedusername"),
         "product_name":product_name,
         "description":product_dis,
         "quantity":quantity,
         "price":price,
         "stock_location":stock_location
      }
      await insertproduct(data).unwrap();
      seterror("Product Added Successfull")
      setShowToast(true);
      setTimeout(() => {
      setShowToast(false);
      }, 2000); 
      navigate("/home");

    }catch(err){
        seterror(err);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
    }
  }
  return (
    <div>
          <div className="flex  justify-center items-center bg-gray-200 p-4 md:p-8 lg:p-12">
              
                    <form onSubmit={handleSubmit} className="mt-4 md:mt-8 lg:mt-12 w-full">
                           <h1 className="text-xl text-center md:text-2xl lg:text-3xl p-5 mb-12">Add Product</h1>
                           <div className='grid grid-cols-2 gap-5'>
                                <div className="mb-4">
                                        <label className="block mb-2 md:mb-0 md:w-1/4" htmlFor="name">
                                            Owener Name
                                        </label>
                                        <input
                                            className="w-full md:w-3/4 px-3 py-2 border border-black rounded-md"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={localStorage.getItem('loggedusername')}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 md:mb-0 md:w-1/4" htmlFor="email">
                                            Product Name
                                        </label>
                                        <input
                                            className="w-full md:w-3/4 px-3 py-2 border rounded-md"
                                            type="text" 
                                            name="productname"
                                            placeholder="Enter Product Name"
                                            required
                                            value={product_name || ""}
                                            onChange={(e)=>{setProduct_name(e.target.value)}}
                                        />
                                    </div>
                           </div>
                            
                            <div className="mb-4 md:flex md:items-center p-5" >
                                <label className="block mb-2 md:mb-0 md:w-1/4" htmlFor="name">
                                   Discription
                                </label>
                                 <textarea 
                                   className="w-full md:w-3/4 px-3 py-2 border rounded-md h-32" 
                                   type="text" 
                                   name="product_discription"
                                   placeholder="EnterProduct Name"
                                   required
                                   value={product_dis|| ""}
                                   onChange={(e)=>{setProduct_des(e.target.value)}}
                                 />
                            </div>
                            <div className='grid grid-cols-3 gap-5 p-5'>
                                <div className="mb-4 ">
                                    <label className="block mb-2 md:mb-0 md:w-1/4" htmlFor="name">
                                        Quantity
                                    </label>
                                    <input
                                        className="w-full md:w-3/4 px-3 py-2 border rounded-md"
                                        type="text" 
                                        name="quantity"
                                        placeholder="Enter Quantity"
                                        required
                                        value={quantity || ""}
                                        onChange={(e)=>{setQuantity(e.target.value)}}
                                    />
                                </div>
                                <div className="">
                                    <label className="block mb-2 md:mb-0 md:w-1/4" htmlFor="name">
                                        Price Per Unit
                                    </label>
                                    <input
                                        className="w-full md:w-3/4 px-3 py-2 border rounded-md"
                                        type="text" 
                                        name="Price"
                                        placeholder="Enter price"
                                        required
                                        value={price || ""}
                                        onChange={(e)=>{setPrice(e.target.value)}}
                                    />
                                </div>
                                <div className=" ">
                                    <label className="block mb-2 md:mb-0 md:w-1/4" htmlFor="name">
                                       Stock Location
                                    </label>
                                    <select className='p-3' value={stock_location} onChange={(e)=>{setStock_location(e.target.value)}}>
                                       <option className='p-3' value="Main storage">Main Storage</option>
                                        <option  className='p-3' value="Storage A">Storage A</option>
                                        <option  className='p-3' value="Storage B">Storage B</option>
                                    </select>
                                </div>

                            </div> 
                            <div className="md:flex md:items-center">
                                <button
                                    className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md "  type="submit"
                                >
                                    Add Product
                                </button>
                            </div>
                    </form>
            </div>
            {showToast && <Toast message={error} onClose={() => setShowToast(false)} />}
    </div>
  )
}

export default Addproduct
