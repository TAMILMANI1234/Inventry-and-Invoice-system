import React from 'react'
import { useFetchInvoiceQuery } from '../../ssiapi/apiSlice'

const Invoicelist = ({theme}) => {
  const { data: products, error, isLoading,refetch } = useFetchInvoiceQuery();
      if (isLoading) return <p>Loading...</p>;
      if (error) return <p className='text-4xl p-3 text-center font-bold'>Error fetching products: {error.message}</p>;

      return (
        <div>
                  <h2 className='text-2xl p-3 text-center font-bold'>Invoice List</h2>
                  
                      <div className="overflow-auto">
                        <table className="table-fixed w-full">
                          <thead className={`${theme =="light"? 'bg-white text-black':'bg-black text-white'} sticky top-0 `}>
                            <tr>
                              <th className="w-1/6 px-4 py-2 border">Invoice ID</th>
                              <th className="w-1/6 px-4 py-2 border">Customer Name</th>
                              <th className="w-1/3 px-4 py-2 border">Customer Mobile</th>
                              <th className="w-1/6 px-4 py-2 border">Customer Address</th>
                              <th className="w-1/6 px-4 py-2 border">Issued by</th> 
                              <th className="w-1/6 px-4 py-2 border">Date</th>
                              <th className="w-1/6 px-4 py-2 border">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(item => (
                              <tr key={item.id} className={`${theme =="light"? 'bg-gray-100 text-black':'bg-black text-white'}   `}> 
                                <td className="border px-4 py-2 capitalize">{item.id}</td>
                                <td className="border px-4 py-2 capitalize">{item.customer_name}</td>
                                <td className="border px-4 py-2 capitalize">{item.customer_mobile}</td>
                                <td className="border px-4 py-2 capitalize">{item.customer_address}</td>
                                <td className="border px-4 py-2 capitalize">{item.invoiced_by}</td> 
                                <td className="border px-4 py-2">{item.date}</td>
                                <td className="border px-4 py-2">Rs.{item.total_amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                </div>
                 
    
      )
}

export default Invoicelist
