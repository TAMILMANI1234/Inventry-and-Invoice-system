import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { useFetchoneProductsQuery,useUpdateuserMutation } from '../../ssiapi/apiSlice';
import { useNavigate } from "react-router-dom";


const Updateproduct = () => {
  const { productid } = useParams();
  const { data: product, error, isLoading,refetch } = useFetchoneProductsQuery(productid);
  const [formState, setFormState] = useState({ product_name: '',description:'',quantity:'',stock_location:'', price: '' });
  const [updateproduct] =  useUpdateuserMutation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 100);

    return () => clearInterval(interval);
  }, [refetch]);
  React.useEffect(() => {
    if (product) {
      setFormState({ product_name: product[0].product_name,
                     description:product[0].description,
                     quantity:product[0].quantity,
                     stock_location:product[0].stock_location,
                     price: product[0].price 
                    });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        await updateproduct({ productid, updatedProduct: formState }).unwrap();
        navigate('/home')
      } catch (err) {
        console.error('Failed to update the product:', err);
      }
  }

  return (
    <div >
       
        
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    
                  
                      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-full max-w-lg " >
                        <p className='text-center text-2xl font-bold'>Product ID :{productid}</p>
                        <div className="mb-4">
                                <label className="block text-black font-semibold mb-2" htmlFor="email">Product Name</label>
                                <input 
                                className="w-full p-2 border border-black rounded "
                                type="text" 
                                name="product_name"
                                required
                                value={formState.product_name}
                                onChange={handleChange}
        
                            
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black font-semibold mb-2" htmlFor="email">Description</label>
                                <input 
                                className="w-full p-2 border border-black rounded "
                                type="text" 
                                name="description"
                                required
                                value={formState.description}
                                onChange={handleChange}
        
        
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black font-semibold mb-2" htmlFor="email">Quantity</label>
                                <input 
                                className="w-full p-2 border border-black rounded "
                                type="text" 
                                name="quantity"
                                required
                                value={formState.quantity}
                                onChange={handleChange}
                            
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black font-semibold mb-2" htmlFor="email">Stock Location</label>
                                <input 
                                className="w-full p-2 border border-black rounded "
                                type="text" 
                                name="stock_location"
                                required
                                value={formState.stock_location}
                                onChange={handleChange}
                    
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-black font-semibold mb-2" htmlFor="email">Price per Unit</label>
                                <input 
                                className="w-full p-2 border border-black rounded "
                                type="text" 
                                name="price"
                                required
                                value={formState.price}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="flex justify-center">
                            <button  type='submit'
                            className="bg-black text-white px-4 py-2 rounded">
                                Update
                            </button>
                            </div>
                            
                            

                    </form>
             </div>
         
    </div>
  )
}

export default Updateproduct
