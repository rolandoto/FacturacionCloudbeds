import React, { useContext } from "react"
import { motion } from 'framer-motion';
import UseCitySigoActions from "../../Actions/UseCitySigoActions";
import  AutoProvider from "../../UseContext.js/Autoprovider";
import { toast } from "sonner"
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";

const InvoinceDian =({facturas}) =>{

    const {getPdfSigo} = UseCitySigoActions()
    const {dian} = useContext(AutoProvider)


    const {Invoince,LoadingInvoince,ErrorInvoince,
        pdf,
        LoadingPdf,
        ErrorPdf
    } =useSelector((state) => state.CitySigoSlice)

    return <>
       <div className="w-full lg:w-1/3">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4">
        <h2 className="font-medium text-lg text-gray-900">📄 Facturas Electrónicas</h2>

        <motion.div
  key="facturas-lista"
  initial="hidden"
  animate="visible"
  exit="exit"
  variants={{
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
  }}
  className="mt-3"
>
  {facturas.length > 0 ? (
    <ul className="space-y-2">
            {facturas.map((factura) => {

         
                const  GnerarPdf =async() => {
                    await getPdfSigo({id:factura.ID_facturacion,token:dian.access_token}).then(itemPdf =>{
                    if (itemPdf?.Status !== 500) {
                        toast.success("descargardo factura");
                        
                    const byteCharacters = atob(itemPdf?.base64.split(",")[1] || itemPdf?.base64); 
                    const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));
                    const fileURL = URL.createObjectURL(new Blob([byteArray], { type: "application/pdf" }));
                    window.open(fileURL, "_blank");
                    } else {
                        toast.error("Error al descargar");
                    }
                    })
                }

            return  <motion.li
                key={factura.id}
                variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                }}
                className="flex justify-between items-center bg-gray-100 rounded-xl p-4 shadow-sm"
                >
                <div>
                    <h4 className="font-medium text-gray-800">
                    Factura #{factura.ID_Reserva}
                    </h4>
                    <p className="text-sm text-gray-600">
                    ID Facturación: {factura.ID_facturacion}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <span className="font-semibold text-black-600">
                    ${factura.Abono.toLocaleString()}
                    </span>
                    <Button
                    onClick={GnerarPdf}
                    isLoading={LoadingPdf} 
                    color="primary"
                    className="text-sm  text-white px-3 py-1 rounded-full  transition"
                    >
                    Descargar
                    </Button>
                </div>
                </motion.li>
              })}
            </ul>
        ) : (
            <p className="text-gray-500 text-sm">No hay facturas emitidas.</p>
        )}
        </motion.div>
      </div>
    </div>
    
        </>

}

export default InvoinceDian