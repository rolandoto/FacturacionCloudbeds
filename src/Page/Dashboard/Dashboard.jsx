import React, { useEffect } from "react"
import Header from "../../Component/Header/Header";
import useListHotel from "../../Actions/useListHotel";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";

const Dashboard = () =>{

    const {getDollar} = useListHotel()

    const {Dollar,loadingDollar,ErrorDollar
    } =useSelector((state) => state.listHotel)


    const FechDate =async() =>{
        await getDollar()
      }
    
      useEffect(() =>{
        FechDate()
      },[])

    const fillContent =()=>{
        if(loadingDollar){
          return <p>Cargandog</p>
        }
        if(ErrorDollar){
          return <p>Error </p>
      }
    
    }

    console.log(Dollar)
    

    return <>
            <div className="flex justify-between items-center bg-gray-100 p-4">
                <Header  
                             />
                </div>
                <Toaster richColors  />
                {fillContent()}

                <div className="min-h-screen flex items-center justify-center ">
                    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
                    <div className="text-center">
                        <img
                        className="mx-auto h-12 w-auto"
                        src="https://hotels.cloudbeds.com/assets/home/images/cloudbeds_nebula_logo.png"
                        alt="Cloudbeds Logo"
                        />
                        <h2 className="mt-6 text-center text-1xl  text-gray-900">
                        Bienvenido al sistema de facturación electrónica de Cloudbeds.
                        </h2>
                    </div>
                    </div>
                </div>
            </>

}

export default Dashboard