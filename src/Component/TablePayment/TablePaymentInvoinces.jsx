import { Button } from "@nextui-org/react"
import React, { useContext, useEffect } from "react"
import useCloubesActions from "../../Actions/useCloubesActions"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import { BsFillSendCheckFill } from "react-icons/bs";
import { toast } from "sonner"
import UseCitySigoActions from "../../Actions/UseCitySigoActions"
import  AutoProvider  from "../../UseContext.js/Autoprovider"

const TablePaymentInvoinces =() =>{
    const {id} = useParams()
    const {GetInvoince,getPdfSigo} = UseCitySigoActions()
    const {Invoince,LoadingInvoince,ErrorInvoince,
        pdf,
        LoadingPdf,
        ErrorPdf
    } =useSelector((state) => state.CitySigoSlice)
    const {dian} = useContext(AutoProvider)
    const fetData =async() =>{
        await GetInvoince({id})
    }

    useEffect(() =>{
        fetData()
    },[])


    const fillContent =()=>{
        if(LoadingInvoince){
          return <p>Cargando</p>
        }
        if(ErrorInvoince){
          return <p>Error </p>
      }if(ErrorPdf){
        return <p>Error </p>
        }

     return <div className="overflow-x-auto  ">
      <table className="min-w-full bg-white">
      <thead className="bg-gray-200 text-gray-600">
          <tr>
          <td className="py-2 border-gray-400 px-4 text-left">FECHA</td>
          <td className="py-2 border-gray-400 px-4 text-left">USUARIO</td>
          <td className="py-2 border-gray-400 px-4 text-left">DESCARGAR</td>
          <td className="py-2 border-gray-400 px-4 text-left">TOTAL</td>

          </tr>
      </thead>
      <tbody>
      {Invoince.map((itemByIdReservation) =>{

          const Fecha =  moment(itemByIdReservation.Fecha).utc().format('YYYY/MM/DD')

                              const  GnerarPdf =async() => {
                                  await getPdfSigo({id:itemByIdReservation.ID_facturacion,token:dian.access_token}).then(itemPdf =>{
                                  if (itemPdf.Status !== 500) {
                                      toast.success("descargardo factura");
                                      const linkSource = `data:application/pdf;base64,${itemPdf?.base64}`;
                                      const downloadLink = document.createElement("a");
                                      const fileName = "file.pdf";
                                      downloadLink.href = linkSource;
                                      downloadLink.download = fileName;
                                      downloadLink.click();
                                  } else {
                                      toast.error("Error al descargar");
                                  }
                                  })
                              }


          return    <tr  className="border-b">
                      <td className="py-2 px-4">{Fecha}</td>
                      <td className="py-2 px-4">{itemByIdReservation.name} {itemByIdReservation.lastname}</td>
                      <td className="py-2 px-4"><Button isLoading={LoadingPdf} onClick={GnerarPdf} color="success"  className=" rounded-none text-white" >Descargar factura electrónica</Button></td>
                      <td className="py-2 px-4">${itemByIdReservation.Abono.toLocaleString()}</td>
                  
                  </tr>
      })}
   
  </tbody>
  </table>
</div>

    }



    return <>{fillContent()}</>

}

export default TablePaymentInvoinces