import React from "react"
import Header from "../../Component/Header/Header";

const Dashboard = () =>{

  

    return <>
            <div className="flex justify-between items-center bg-gray-100 p-4">
                <Header  
                             />
                </div>
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