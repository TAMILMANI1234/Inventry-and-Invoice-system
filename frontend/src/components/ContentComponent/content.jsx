import React from 'react';
import { useFetchProductsQuery, useDeleteproductMutation} from '../../ssiapi/apiSlice';

const Content = ( ) => {
  const { data: products, error, isLoading,refetch } = useFetchProductsQuery();
  const [deleteproduct] = useDeleteproductMutation();


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className='text-4xl p-3 text-center font-bold'>Error fetching products: {error.message}</p>;
 const A_count = products.filter((item) => {
    return  item.stock_location=== "Storage A";
  });
  const B_count = products.filter((item) => {
    return  item.stock_location=== "Storage B";
  });
  const Main_count = products.filter((item) => {
    return  item.stock_location=== "Main storage";
  });
  const lowquantity = products.filter((item) => {
    return  item.quantity <10;
  });
 
   
  return (
    <main className="flex-1 p-4 text-black ">
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white text-black p-4 shadow rounded">
                  <h1 className='text-2xl text-center font-semibold'>Main Storage</h1>
                     <div className="overflow-auto">
                        <table className="table-fixed   border border-black m-3">
                          <thead className={`  sticky top-0 `}>
                            <tr>
                              <th className="w-1/6 px-4 py-2 border border-black">Products Available</th>
                             
                            </tr>
                          </thead>
                          <tbody>
                            <tr cl>
                                  <td className='text-center p-5 text-xl font-semibold'>{Main_count.length}</td>     
                            </tr> 
                          </tbody>
                        </table>
                      </div>
        </div>
        <div className="bg-white p-4 shadow rounded">
              <h1 className='text-2xl text-center font-semibold'>Storage A</h1>
                     <div className="overflow-auto">
                        <table className="table-fixed m-3 border border-black">
                          <thead className={`  sticky top-0 `}>
                            <tr>
                              <th className="w-1/6 px-4 py-2 border border-black">Products Available</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                                  <td className='text-center p-5 text-xl font-semibold'>{A_count.length}</td>     
                            </tr> 
                          </tbody>
                        </table>
                      </div>
        </div>
        <div className="bg-white p-4 shadow rounded">
              <h1 className='text-2xl text-center font-semibold'>Storage B</h1>
                     <div className="overflow-auto">
                        <table className="table-fixed m-3 border border-black">
                          <thead className={`  sticky top-0 `}>
                            <tr>
                              <th className="w-1/6 px-4 py-2 border border-black">Products Available</th>
                             
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                                  <td className='text-center p-5 text-xl font-semibold'>{B_count.length}</td>     
                            </tr> 
                          </tbody>
                        </table>
                      </div>
        </div>
        <div className="bg-white p-4 shadow rounded">
              <h1 className='text-2xl text-center font-semibold'>Low in stock</h1>
              <div className="overflow-auto">
                        <table className="table-fixed w-full">
                          <thead  >
                            <tr>
                              <th className="w-1/6 px-4 py-2 border">Product ID</th>
                              <th className="w-1/6 px-4 py-2 border">Product Name</th>
                              <th className="w-1/6 px-4 py-2 border">Quantity in Stock</th>
                              <th className="w-1/6 px-4 py-2 border">Stock Location</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lowquantity.map(item => (
                              <tr key={item.id} > 
                                <td className="border px-2 capitalize">{item.product_id}</td>
                                <td className="border px-2 capitalize">{item.product_name}</td>
                                <td className="border px-2 capitalize">{item.quantity}</td>
                                <td className="border px-2 capitalize">{item.stock_location}</td> 
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>      
            </div>
            <div className="bg-white p-4 shadow rounded col-span-2">
                 <h1 className='text-2xl mb-4 text-center font-semibold'>Available Product</h1>
                   <div className="overflow-auto">
                        <table className="table-fixed w-full">
                          <thead  >
                            <tr>
                              <th className="w-1/6 px-4 py-2 border">Product ID</th>
                              <th className="w-1/6 px-4 py-2 border">Product Name</th>
                              <th className="w-1/6 px-4 py-2 border">Quantity in Stock</th>
                              <th className="w-1/6 px-4 py-2 border">Stock Location</th>
                              <th className="w-1/6 px-4 py-2 border">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(item => (
                              <tr key={item.id} > 
                                <td className="border px-2 py-2 capitalize">{item.product_id}</td>
                                <td className="border px-2 py-2 capitalize">{item.product_name}</td>
                                <td className="border px-2 py-2 capitalize">{item.quantity}</td>
                                <td className="border px-2 py-2 capitalize">{item.stock_location}</td> 
                                <td className="border px-2 py-2 capitalize">
                                  <button 
                                    onClick={()=>{deleteproduct(item.product_id)}}
                                    className='w-full bg-red-500 rounded text-white font-semibold' >Delete</button>  
                                </td> 
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>      
            </div>
      </div>
    </main>
  )
}

export default Content
