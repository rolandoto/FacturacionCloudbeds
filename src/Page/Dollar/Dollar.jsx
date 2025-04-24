import React, { useEffect, useState } from "react"
import Sidebar from "../../Component/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import useListHotel from "../../Actions/useListHotel";

const Dollar =() =>{
    const {getDollar} = useListHotel()
    const [amountInUsd, setAmountInUsd] = useState(''); // Estado como string para manejar formato

    const {Dollar,loadingDollar,ErrorDollar
    } =useSelector((state) => state.listHotel)

  
    function formatAmountInCOP(amount) {
        const newAmountInCop = amount.toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 3
        });
        return newAmountInCop;
      }

    const FechDate =async() =>{
        await getDollar()
    }
    
      useEffect(() =>{
        FechDate()
      },[])

 
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
          
        const amount = formatAmountInCOP(newAmountInCop)

          return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-3xl shadow-lg">
                <div className="text-center">
                  <span className="font-semibold text-[30px]" >Conversion autorizada</span>
                  <div className="my-4">
                    <input
                      type="text"
                      placeholder="Ingrese cantidad en USD"
                      value={amountInUsd}
                      onChange={handleChange}
                      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="my-4 text-gray-700">
                    <span className="block text-sm">El dólar está a: <strong>{usdToCopRate}</strong> COP</span>
                    <p>{amountInUsd.toLocaleString()} USD equivale a <strong>{amountInCop.toLocaleString()}</strong> COP</p>
                    <p className="font-bold text-lg mt-2 text-gray-800">Con una tasa de cambio restada en 500 pesos:</p>
                    <p className="font-bold text-2xl text-blue-600 mt-1">
                      {amountInUsd.toLocaleString()} USD equivale a:{amount} COP
                    </p>
                  </div>
                </div>
              </div>
            
            </div>
          );
        }
    
        return <p>No se pudo obtener la tasa de cambio</p>;
      };
    
    return <>
    
        <Sidebar>
        {fillContent()}
        </Sidebar>

            </>

}

export default Dollar