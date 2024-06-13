import React, { useState,useRef } from 'react'
import { 
  useFetchProductsQuery, 
  useUpdateuserMutation,
  useGetuseroneQuery,
  useInsertinvoiceMutation
} from '../../ssiapi/apiSlice';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const Order = ({theme}) => {
  const { data: products, error, isLoading,refetch } = useFetchProductsQuery();
  const { data: user, usererror, isLoading_user, refetch_user } = useGetuseroneQuery(localStorage.getItem("loggedusername"));
  const [currentProduct,setCurrentProduct]=useState('..');
  const [currentPrice,setCurrentPrice]=useState('0.00');
  const [currentId,setCurrentId]=useState();
  const [currentproduct_des,setCurrentproduct_des]=useState();
  const [currentproduct_loc,setCurrentproduct_loc]=useState();
  const [currentquantity,setCurrentquantity]=useState(0);
  const [initial_quantity,setinitial_quantity]=useState();
  const [items, setItems] = useState([]);
  const [total,setTotal]=useState(0)
  const [Invoiceisopen, setInvoiceisOpen] = useState(false);
  const [updateproduct] =  useUpdateuserMutation();
  const [discount,setDiscount]=useState(0); 
  const [customer_name,setCustomer_name]=useState('');
  const [customer_mobile,setCustomer_mobile]=useState('');
  const [customer_address,setCustomer_address]=useState('');
  const [company_name,setCompany_name]=useState();
  const [company_email,setCompany_email]=useState();
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const [insertIncoice] =useInsertinvoiceMutation();
  const [print_node,setPrintmode]=useState(false);
  const componentRef = useRef();

  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 100);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleCurrentProduct=(current_product,current_price,id,des,loc,initial_quantity)=>{
        setCurrentProduct(current_product);
        setCurrentPrice(current_price);
        setCurrentquantity(1);      
        setCurrentId(id);
        setCurrentproduct_des(des);
        setCurrentproduct_loc(loc);
        setinitial_quantity(initial_quantity);
  }

  const addItem = async() => {
     if(currentProduct=='..' || currentPrice=='0.0' || currentquantity==0){
       alert("Add Product to current Section");
     }
     else{
      setItems([...items, [currentProduct,currentquantity,currentPrice]]);
      setTotal(total+(currentPrice*currentquantity));
      try {
        await updateproduct({ productid: currentId, 
          updatedProduct: {
            "product_name":currentProduct,
            "description":currentproduct_des,
            "quantity":initial_quantity-currentquantity,
            "price":currentPrice,
            "stock_location":currentproduct_loc
          } }).unwrap();
         
      } catch (err) {
        console.error('Failed to update the product:', err);
      }
     }
  };

  const toggleInvoice =async () => {
    if(customer_name=="" || customer_address=="" || customer_mobile=="" ){
             alert("Please Enter Invoice Details")
    }
    else{
      setInvoiceisOpen(!Invoiceisopen);
      const obj_product={};
      items.forEach((arr,index)=>{
        obj_product[index]=arr;
      });
     const invoice_details={
        "customer_name":customer_name,
        "customer_mobile":customer_mobile,
        "customer_address":customer_address,
        "invoiced_by":localStorage.getItem("loggedusername"),
        "products":obj_product,
        "date":formattedDate,
        "total_amount":total-discount
      }
      await insertIncoice(invoice_details).unwrap();
      
    }
  };

  React.useEffect(() => {
    if (user) {
      
        setCompany_email(user[0].email);
        setCompany_name(user[0].company_name)
    }
  }, [user]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className='text-4xl p-3 text-center font-bold'>Error fetching products: {error.message}</p>;

  return (
    <div >
        <div className='grid grid-cols-3 gap-2'>
             <div className='col-span-2  '>
                  <div>
                      <div className='grid grid-cols-2'>
                          <div className='p-3'>
                               <p>Customer Details:</p>
                               <input 
                                  className="w-full p-2 border border-black rounded mb-4"
                                  type='text'
                                  name="customer_name"
                                  required
                                  placeholder='Customer Name'
                                  value={customer_name}
                                  onChange={(e)=>{setCustomer_name(e.target.value)}}
                                />
                                <input 
                                  className="w-full p-2 border border-black rounded mb-4"
                                  type='text'
                                  name="mobile"
                                  required
                                  placeholder='Customer Mobile Number'
                                  value={customer_mobile}
                                  onChange={(e)=>{setCustomer_mobile(e.target.value)}}
                                />
                                <input 
                                  className="w-full p-2 border border-black rounded mb-4 "
                                  type='text'
                                  name="adderss"
                                  placeholder='Customer Adderss'
                                  required
                                  value={customer_address}
                                  onChange={(e)=>{setCustomer_address(e.target.value)}}
                                />
                          </div>
                          <div  className='p-3'>
                              <p>Builled by:</p>
                               <input 
                                  className="capitalize w-full p-2 border border-black rounded mb-4"
                                  type='text'
                                  name="owner_name"
                                  required
                                  value={localStorage.getItem("loggedusername")}
                                  disabled
                                />
                                <input 
                                  className=" w-full p-2 border border-black rounded mb-4"
                                  type='email'
                                  name="owneremail"
                                  required
                                  value={company_email}
                                  disabled
                                 
                                />
                                <input 
                                  className="capitaliz w-full p-2 border border-black rounded mb-4 "
                                  type='text'
                                  name="company_name"
                                   value={company_name}
                                  required
                                  disabled
                                />
                          </div>
                      </div>
                  </div>
                  
                  <section>
                  <div class=" h-72 border-separate overflow-clip rounded-xl border border-solid flex flex-col">
                      <table class="w-full table-fixed">
                        <thead class="sticky top-0 ">
                          <tr>
                            <th className=" px-4 py-2 capitalize">Product ID</th>
                            <th className=" px-4 py-2 capitalize">Product Name</th>
                            <th className=" px-4 py-2 capitalize">Product Price</th>
                            <th className=" px-4 py-2 capitalize">Quantity in stock</th>
                            <th className=" px-4 py-2 capitalize">Action</th>
                          </tr>
                        </thead>
                      </table>
                      <div class="flex-1 overflow-y-auto">
                        <table class="w-full table-fixed">
                          <tbody>
                          {products.map(item => (
                              <tr key={item.id} className={`${theme =="light"? 'bg-gray-100 text-black':'bg-black text-white'} `}>
                                <td className="border px-4 py-2 capitalize">{item.product_id}</td>
                                <td className="border px-4 py-2 capitalize">{item.product_name}</td>
                                <td className="border px-4 py-2"> Rs.{item.price}</td> 
                                <td className={`${item.quantity < 10 ? 'border-2 border-red-500 ':' '} border px-4 py-2 `}>{item.quantity}</td>
                                <td className="border px-4 py-2 capitalize">
                                   <button onClick={()=>{handleCurrentProduct(item.product_name,item.price,item.product_id,item.description,item.stock_location,item.quantity)}}
                                   className={`${theme =="light"? 'bg-black text-white' :'bg-white text-black'} w-full rounded-lg  font-bold`}>+</button>
                                </td>
                                 
                               </tr>
                            ))}

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>

                  <section>
                        <div className="grid grid-cols-4 gap-4 p-4">
                             <div>
                                <p className='border-b-2 border-black'>{currentProduct}</p>
                             </div>
                             <div>
                              <p className='border-b-2 border-black'>{currentPrice}</p>
                             </div>
                             <div>
                                  <ul className="flex ">
                                     <li className=' mr-7'>
                                        <button 
                                            onClick={()=>{ currentquantity > 1 ? setCurrentquantity(currentquantity-1): setCurrentquantity(currentquantity)}}
                                            className=' bg-red-500 w-full px-3 text-white font-extrabold text-center'
                                          >-</button>
                                      </li>
                                     <li className='pr-5  border-b-2 border-black'>{currentquantity}</li>
                                     <li>
                                       <button 
                                         onClick={()=>{setCurrentquantity(currentquantity+1)}}
                                         className='ml-5 bg-red-500 w-full px-3 text-white font-extrabold text-center'
                                         >+</button>
                                       </li>
                                  </ul>
                             </div>
                             <div className='flex justify-center items-center'>
                                <button onClick={addItem} className='px-5 text-white rounded-xl bg-blue-700    '>Push to Incoice</button>
                             </div>
                             
                        </div>
                  </section>
             </div>
             <div className=' '>
                  <div className='flex justify-center items-center'>
                      <button onClick={toggleInvoice} className='w-72 rounded-md m-3 bg-blue-600 text-white font-semibold p-2'>
                          Priview Invoice
                      </button>
                  </div>
                      
                   <section>
                      <div className='h-72 border-separate overflow-clip rounded-xl border border-solid flex flex-col'>
                        <table class="w-full table-fixed border-b-2">
                          <thead class="sticky top-0 ">
                            <tr>
                              <th className=" px-4 py-2 capitalize">Product Name</th>
                              <th className=" px-4 py-2 capitalize">Quantity</th>
                              <th className=" px-4 py-2 capitalize">Price</th>
                            </tr>
                          </thead>
                        </table> 
                          <div class="flex-1 overflow-y-auto">
                            <table class="w-full table-fixed">
                                <tbody>
                                   {items.map((item, index) => (
                                      <tr  key={index} className="mb-2 border-b-2  ">
                                          <td className='pl-8 p-2'>{item[0]}</td>
                                          <td className='text-center p-2'>{item[1]}</td>
                                          <td className='text-center p-2'>{item[2]*item[1]}</td>
                                         </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>


                       </div>

                        <div>
                            <div className='grid grid-cols-2 gap-3 text-center py-3 pl-8 '>
                                <div><p>Total</p></div>
                                <div className='pl-10'>{total}</div>
                            </div>
                            <div className='grid grid-cols-2 gap-3 text-center py-3 pl-8 '>
                                <div><p>Discount Amount</p></div>
                                <div className='pl-10'>
                                  <input className='text-center border-b border-b-black'
                                       type='text'
                                       name='discount'
                                       value={discount}
                                       onChange={(e)=>{setDiscount(e.target.value)}}
                                    />
                                    
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-3 text-center py-3 pl-8 '>
                                <div><p className='text-xl font-semibold'>Final Amount</p></div>
                                
                                <div className='pl-10 text-xl font-semibold'>Rs.{total-discount}</div>
                            </div>
                        </div>
                   </section>
                   <section>
                        <div className="p-4">
                          
                            {Invoiceisopen && (
                              <div ref={componentRef} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                                <div className={`${theme=='light'? 'bg-white':'bg-black border-2 border-white'} p-8 rounded shadow-lg max-w-2xl w-full`}>
                                         <section>
                                         <div className="max-w-4xl  p-4 shadow-md rounded-lg">
                                            <header className="flex justify-between items-center border-b pb-4">
                                              <div>
                                                <h1 className="text-3xl font-bold">Invoice</h1>
                                                <p className="text-gray-500">{formattedDate}</p>
                                              </div>
                                              <div className="text-right">
                                                  <h2 className="text-xl font-semibold capitalize">{localStorage.getItem("loggedusername")}</h2>
                                                  <p className="text-gray-500">{company_name}</p>
                                                  <p className="text-gray-500">{company_email}</p>
                                              </div>
                                            </header>
                                            
                                            <section className="my-8">
                                              <h2 className="text-xl font-bold mb-4">Bill To:</h2>
                                              <div className="mb-4">
                                                <p className="font-semibold capitalize">{customer_name}</p>
                                                <p className='capitalize'>{customer_address}</p>
                                                <p className='capitalize'>{customer_mobile}</p>
                                              </div>
                                            </section>

                                           <section>
                                               <div className={`${print_node==true ? "h-full": "h-40"} border-separate overflow-clip rounded-xl border border-solid flex flex-col`}>
                                                <table class="w-full table-fixed border-b-2">
                                                  <thead class="sticky top-0 ">
                                                    <tr>
                                                      <th className=" px-4 py-2 capitalize">Product Name</th>
                                                      <th className=" px-4 py-2 capitalize">Quantity</th>
                                                      <th className=" px-4 py-2 capitalize">Price</th>
                                                    </tr>
                                                  </thead>
                                                </table> 
                                                  <div class="flex-1 overflow-y-auto">
                                                    <table class="w-full table-fixed  ">
                                                        <tbody>
                                                          {items.map((item, index) => (
                                                              <tr  key={index} className="mb-2 border-b-2  ">
                                                                  <td className='pl-8 p-2'>{item[0]}</td>
                                                                  <td className='text-center p-2'>{item[1]}</td>
                                                                  <td className='text-center p-2'>{item[2]*item[1]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div> 
                                              </div>

                                           </section>

                                            <div className="flex justify-between items-center border-t pt-4">
                                              <div>
                                                <p className="text-gray-500">Thank you for your business!</p>
                                              </div>
                                              <div className="text-right">
                                                <p className="text-lg font-bold">Total:Rs.{total-discount}</p>
                                              </div>
                                            </div>
                                          </div>


                                         </section>
                                         <section  className='mt-2'>
                                           <button onClick={handlePrint} className="mx-3 bg-blue-500 text-white py-2 px-4 rounded">Print Invoice</button>
                                           <button onClick={()=>{setInvoiceisOpen(!Invoiceisopen)}} className="bg-red-500 text-white py-2 px-4 rounded" >
                                              Close
                                            </button>
                                         </section>
                                  
                                   </div>
                              </div>
                            )}
                         </div>
                   </section>
             </div> 
        </div>
    </div>
  )
}

export default Order
 