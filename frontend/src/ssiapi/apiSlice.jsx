import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({  
    reducerPath:'apiSlice',                                //unique key for reducer
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000',                   // baseurl from  server
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
              headers.set('Authorization', token);
            }
            return headers;
          },
    }), 
    
    endpoints:(builder)=>({
        adduser:builder.mutation({                          //endpoint for add data
            query:(user)=>({
                url:'auth/register',  
                method:'POST',
                body:user,  
            }),
            
        }),
        addproduct:builder.mutation({                      //endpoint for add data
          query:(user)=>({
              url:'/products/',  
              method:'POST',
              body:user,  
          }),
          
      }),
        getlogin: builder.mutation({
            query: (body) => ({
              url:'auth/login',                         //ENDpoint for login
              method:'POST',
              body: body,
            }),
          }),
        fetchProducts: builder.query({
            query: () => ({
              url: '/products/',
              method: 'GET',
              refetchOnMountOrArgChange: true,
            }), 
          }),
          fetchoneProducts: builder.query({
            query: (id) => ({
              url: `/products/${id}`,
              method: 'GET',
              
            }),
          
          }),
          getuserone: builder.query({
            query: (username) => ({
              url: `/user/${username}`,
              method: 'GET',         
            }),     
          }),
          updateuser: builder.mutation({               //endpoint for updating data
            query: ({ productid, updatedProduct }) => ({
              url: `/products/${productid}`,
              method: 'PUT',
              body: updatedProduct,
            }),
            
          }),
          insertinvoice:builder.mutation({            //endpoint for add data
            query:(data)=>({
                url:'/invoice/',  
                method:'POST',
                body:data,  
            }),
            
        }),
        fetchInvoice: builder.query({
          query: () => ({
            url: '/invoice/',
            method: 'GET',
            refetchOnMountOrArgChange: true,
          }), 
        }),
        deleteproduct: builder.mutation({   // endpoint for deleting data
          query: (id) => ({
            url: `/products/${id}`,
            method: 'DELETE',
          }),
         
        }),

    })
})

export const {
    useAdduserMutation,
    useGetloginMutation,
    useFetchProductsQuery,
    useFetchoneProductsQuery,
    useUpdateuserMutation,
    useGetuseroneQuery,
    useInsertinvoiceMutation,
    useFetchInvoiceQuery,
    useDeleteproductMutation,
    useAddproductMutation
}=apiSlice;               //export all endpoint as a customs hooks