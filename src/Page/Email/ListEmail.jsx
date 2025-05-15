import React, { useContext, useEffect, useRef, useState } from "react"
import Sidebar from "../../Component/Sidebar/Sidebar"
import AutoProvider from "../../UseContext.js/Autoprovider"
import { useDispatch, useSelector } from "react-redux"
import UseGuestEmailActions from "../../Actions/UseGuestEmailActions"

import EmailTable from "../../Component/Emailtable/EmaiTable"

const ListEmail =() =>{
    const {jwt}  =  useContext(AutoProvider)
 
    const  {PostListEmail} =UseGuestEmailActions()
    const { ErrorListEmail, LoadingListEmail, ListEmail } = useSelector((state) => state.Email);
    const hasFetched = useRef(false);
    
    const fetchData = async () => {
        await  PostListEmail({propertyID:jwt?.result?.propertyID})
    };


    useEffect(() => {
        if (!hasFetched.current){
            fetchData()
        }
      }, []);

      const FillContent=() =>{
        if(LoadingListEmail){
            return <>Cargando...</>
        }if(ErrorListEmail){
            return <>Cargando...</>
        }

        return  <div className="bg-white rounded-lg shadow p-6 w-full mx-auto">
                    <h2 className="text-lg font-medium text-gray-800 mb-6">Listado de Correos</h2>
                    <EmailTable  ListEmail={ListEmail} />
                </div>
    }

   
    return <Sidebar>
            {FillContent()}
            </Sidebar>
}

export default ListEmail