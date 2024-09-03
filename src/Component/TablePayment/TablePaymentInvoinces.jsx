import { Button } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import useCloubesActions from "../../Actions/useCloubesActions"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import { BsFillSendCheckFill } from "react-icons/bs";
import { toast } from "sonner"
import UseCitySigoActions from "../../Actions/UseCitySigoActions"
import  AutoProvider  from "../../UseContext.js/Autoprovider"
import { IoArrowForwardOutline } from "react-icons/io5";
import useFormValuesForwardEmail from "../../Hooks/useFormValuesForwardEmail"
import useValidationForwardEmail from "../../Hooks/useValidationForwardEmail"

const TablePaymentInvoinces =() =>{
    const {id} = useParams()
    const {GetInvoince,getPdfSigo,PostForwardEmail} = UseCitySigoActions()
    const {Invoince,LoadingInvoince,ErrorInvoince,
        pdf,
        LoadingPdf,
        ErrorPdf
    } =useSelector((state) => state.CitySigoSlice)

    const {forwardEmail,
        loadingforwardEmail,
        ErrorForwardEmail
    } =useSelector((state) => state.CitySigoSlice)
    const {dian} = useContext(AutoProvider)
    const fetData =async() =>{
        await GetInvoince({id})
    }

    const validate = useValidationForwardEmail();
    const [formErrors, setFormErrors] = useState({});
    const [formValues, handleChange] =  useFormValuesForwardEmail()


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
                <td className="py-2 border-gray-400 px-4 text-left">REENVIAR FACTURA ELECTRÓNICA POR CORREO</td>

                </tr>
            </thead>
                <tbody>
                {Invoince.map((itemByIdReservation) =>{

                
                    const handleSubmit =async() =>{
                        const errors = validate(formValues);
                        setFormErrors(errors);
                        if (Object.keys(errors).length === 0){
                         await   PostForwardEmail({id:itemByIdReservation.ID_facturacion,token:dian.access_token,Email_to:"10elementossas@gmail.com",Copy_to:formValues.email})
                        }
                    }

                    

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
                                <td className="px-4 py-2 ">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Ingrese correo"
                                        className="border p-2 w-full border-gray-300 rounded px-1 py-1 mr-2"
                                    />
                                         {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                                        <Button
                                            color="primary"
                                            onClick={handleSubmit}
                                            isLoading={loadingforwardEmail}
                                            className="text-white mt-2 rounded-none  flex items-center">
                                            <span className="mr-2">REENVIAR CORREO</span>
                                            <IoArrowForwardOutline fontSize={30} />
                                        </Button>
                                    </td>
                                                        
                                                    </tr>
                                        })}
            </tbody>
            </table>
          
</div>

    }



    return <>{fillContent()}</>

}

export default TablePaymentInvoinces