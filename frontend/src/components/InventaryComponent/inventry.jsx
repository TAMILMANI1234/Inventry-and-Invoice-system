import React from 'react'
import { useFetchProductsQuery } from '../../ssiapi/apiSlice';
import { useNavigate } from "react-router-dom";


const Inventry = ({theme}) => { 
   const { data: products, error, isLoading,refetch } = useFetchProductsQuery();
   const navigate = useNavigate();
    React.useEffect(() => {
      const interval = setInterval(() => {
        refetch();
      }, 100);

      return () => clearInterval(interval);
    }, [refetch]);

   if (isLoading) return <p>Loading...</p>;
   if (error) return <p className='text-4xl p-3 text-center font-bold'>Error fetching products: {error.message}</p>;

  
   return (
    <div>
             <div>
                  <h2 className='text-2xl p-3 text-center font-bold'>Product List</h2>
                     <div>
                       <button onClick={()=>{navigate('/addproduct')}} className='p-3 bg-blue-500 font-semibold m-3 text-white rounded-lg'>ADD Product</button>
                     </div>
                      <div className="overflow-auto">
                        <table className="table-fixed w-full">
                          <thead className={`${theme =="light"? 'bg-white text-black':'bg-black text-white'} sticky top-0 `}>
                            <tr>
                              <th className="w-1/6 px-4 py-2 border">Product ID</th>
                              <th className="w-1/6 px-4 py-2 border">Product Name</th>
                              <th className="w-1/3 px-4 py-2 border">Product Description</th>
                              <th className="w-1/6 px-4 py-2 border">Stock Location</th>
                              <th className="w-1/6 px-4 py-2 border">Quantity in Stock</th>
                              <th className="w-1/6 px-4 py-2 border">Unit Price</th>
                              <th className="w-1/6 px-4 py-2 border">Stock value</th>
                              <th className="w-1/6 px-4 py-2 border">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(item => (
                              <tr key={item.id} className={`${theme =="light"? 'bg-gray-100 text-black':'bg-black text-white'}   `}>
                                 
                                <td className="border px-4 py-2 capitalize">{item.product_id}</td>
                                <td className="border px-4 py-2 capitalize">{item.product_name}</td>
                                <td className="border px-4 py-2 capitalize">{item.description}</td>
                                <td className="border px-4 py-2 capitalize">{item.stock_location}</td>
                                <td className={`${item.quantity < 10 ? 'border-2 border-red-500 p-2':  ''} border px-4 py-2 capitalize`}>{item.quantity}</td>
                                <td className="border px-4 py-2"> Rs.{item.price}</td>
                                <td className="border px-4 py-2"> Rs.{parseInt(item.price) * parseInt(item.quantity) }</td>
                                <td className="border justify-center items-center flex p-2">
                                    <button onClick={()=>{navigate(`/updateproduct/${item.product_id}`)}} className=' bg-blue-600 px-5 py-1 rounded-lg text-white w-ful' >Update</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                </div>
                 
    </div>
  )
}

export default Inventry
