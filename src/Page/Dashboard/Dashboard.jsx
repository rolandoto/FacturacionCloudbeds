import React, { useEffect, useState } from "react"
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

      const [amountInUsd, setAmountInUsd] = useState(''); // Estado como string para manejar formato

  // Función para manejar cambios en el input
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea dígito
    setAmountInUsd(Number(value).toLocaleString()); // Formatear con puntos de millar
  };
    
      const fillContent = () => {
        if (loadingDollar) {
          return <p>Cargando...</p>;
        }
        if (ErrorDollar) {
          return <p>Error</p>;
        }
    
        if (Dollar?.conversion_rates?.COP) {
          const usdToCopRate = Dollar.conversion_rates.COP;
          const amountInCop = parseInt(amountInUsd) * usdToCopRate; // Convertir el valor de USD a COP
          const newUsdToCopRate = usdToCopRate - 500; // Restar 500 pesos a la tasa de cambio
          const newAmountInCop =  parseInt(amountInUsd) * newUsdToCopRate; // Calcular el nuevo valor en pesos con la tasa ajustada
    
          return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                  <img
                    className="mx-auto h-12 w-auto"
                    src="https://hotels.cloudbeds.com/assets/home/images/cloudbeds_nebula_logo.png"
                    alt="Cloudbeds Logo"
                  />
                  
                  {/* Campo de entrada */}
                  <div className="my-4">
                    <input
                      type="text"
                      placeholder="Ingrese cantidad en USD"
                      value={amountInUsd}
                      onChange={handleChange}
                      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
        
                  {/* Mostrar resultados */}
                  <div className="my-4 text-gray-700">
                    <span className="block text-sm">El dólar está a: <strong>{usdToCopRate}</strong> COP</span>
                    <p>{amountInUsd.toLocaleString()} USD equivale a <strong>{amountInCop.toLocaleString()}</strong> COP</p>
                    <p className="font-bold text-lg mt-2 text-gray-800">Con una tasa de cambio restada en 500 pesos:</p>
                    <p className="font-bold text-2xl text-blue-600 mt-1">
                      {amountInUsd.toLocaleString()} USD equivale a: ${newAmountInCop.toLocaleString()} COP
                    </p>
                  </div>
        
                  <h2 className="mt-6 text-center text-xl font-medium text-gray-900">
                    Bienvenido al sistema de facturación electrónica de Cloudbeds.
                  </h2>
                </div>
              </div>
        
              {/* Pie de página */}
              <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-100 text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Cloudbeds. Todos los derechos reservados.
              </footer>
            </div>
          );
        }
    
        return <p>No se pudo obtener la tasa de cambio</p>;
      };
    

    return <>
            <div className="flex justify-between items-center bg-gray-100 p-4">
                <Header  
                             />
                </div>
                <Toaster richColors  />
                {fillContent()}

               
            </>

}

export default Dashboard