import React, { useState } from "react";
import Header from "../../Component/Header/Header";
import { Toaster } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const numberWithCommas = (event) => {
    // Verificar si el evento no es un número o es negativo
    if (isNaN(event) || event < 0) {
      // Si es así, devolver una cadena vacía o un mensaje de error, según tu preferencia
      return '';
    }
  
    // Convertir el valor a una cadena de texto
    const stringValue = event.toString();
    // Eliminar todos los caracteres que no sean dígitos
    const intValue = parseInt(stringValue.replace(/[^\d]/g, ''), 10);
    // Formatear el número con separadores de miles
    const formattedValue = intValue.toLocaleString('es-CO');
    return formattedValue;
  };


const Price = () => {
    
    const [razonSocial, setRazonSocial] = useState("");
    const [nit, setNit] = useState("");
    const [correo, setCorreo] = useState("");

    // Estado para la cantidad de habitaciones, huéspedes, noches y precio total
    const [habitaciones, setHabitaciones] = useState(1);
    const [huespedes, setHuespedes] = useState(1);
    const [noches, setNoches] = useState(8);
    const [totalHospedaje, setTotalHospedaje] = useState(""); // Editable por el usuario


    const cleanedPrice = totalHospedaje.replace(/\./g, '');


    // Constantes de precios
    const costoPorNoche = 110000;
    const seguroPorNoche = 1100;

    // Cálculos dinámicos
    const totalSeguroHotelero = noches * seguroPorNoche * huespedes;
    const totalHospedajeAmmount = parseInt(cleanedPrice) - totalSeguroHotelero;
    const totalRound = totalHospedajeAmmount / 1.19;


    // Valor base redondeado
    const ValorBase = Math.round(totalRound * 100) / 100;

    // IVA calculado y redondeado
    const iva = ValorBase * 0.19;
    const ammountIva = Math.round(iva * 100) / 100;

    // Sumamos la base con el seguro hotelero
    const valorBaseTotal = ValorBase + totalSeguroHotelero;
  
    // Cálculo de la retención en la fuente (3.5%)
    const rte = valorBaseTotal * 0.035;
    const ammountRte = Math.round(rte * 100) / 100;

    const totalAPagar = cleanedPrice - ammountRte;



    const base = Math.max(ValorBase, 0);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        // Encabezado del documento
        doc.setFontSize(18);
        doc.text("COTIZACIÓN", 14, 20);
    
        // Información de la empresa
        doc.setFontSize(12);
        doc.text(`Razón Social / Nombre: ${razonSocial}`, 14, 30);
        doc.text(`NIT: ${nit}`, 14, 37);
        doc.text(`Correo: ${correo}`, 14, 44);
    
        // Espaciado antes de la primera tabla
        let startY = 50;
    
        // Tabla de impuestos
        autoTable(doc, {
            startY,
            head: [["IMPUESTO"]],
            body: [[" "]],
        });
    
        startY = doc.lastAutoTable.finalY + 5;
    
        autoTable(doc, {
            startY,
            head: [["Descripción", "Monto Base", "%", "IVA"]],
            body: [
                ["Habitaciones", `$${(base).toLocaleString()}`, "19%", `$${(ammountIva).toLocaleString()}`],
                ["Seguro Hotelero", `$${(totalSeguroHotelero)}`, "0%", "$0"],
            ],
        });
    
        startY = doc.lastAutoTable.finalY + 10;
    
        // Tabla de costos detallada
        autoTable(doc, {
            startY,
            head: [["Descripción", "Cantidad", "Valor Unitario", "Total"]],
            body: [
                ["Habitaciones", habitaciones, `$${(costoPorNoche).toLocaleString()}`, `$${(ValorBase + ammountIva +totalSeguroHotelero).toLocaleString()}`],
                ["Seguro Hotelero", `${noches * huespedes}`, `$${(seguroPorNoche)}`, `$${(totalSeguroHotelero).toLocaleString()}`],
            ],
        });
    
        startY = doc.lastAutoTable.finalY + 10;
    
        // Desglose de impuestos y totales
        autoTable(doc, {
            startY,
            body: [
                ["Subtotal", `$${(base + totalSeguroHotelero).toLocaleString()}`],
                ["IVA (19%)", `$${(ammountIva).toLocaleString()}`],
                ["Total (Incluye IVA)", `$${(ValorBase + ammountIva +totalSeguroHotelero).toLocaleString()}`],
                ["Retención en la Fuente (3.5%)", `$${ammountRte.toLocaleString()}`],
                ["TOTAL A PAGAR", `$${totalAPagar.toLocaleString()}`],
            ],
            styles: { fontStyle: "bold" },
        });
    
        // Guardar el documento
        doc.save(`Cotizacion_${razonSocial}.pdf`);
    };
    
    return (<>

            <div className="flex justify-between items-center bg-gray-100 p-4">
                <Header />
                <Toaster richColors  />
            </div>
                <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border">
                <h2 className="text-2xl font-bold text-center mb-6">COTIZACIÓN</h2>                  
                <div className="mb-4 border-b pb-4">
                                        <label className="block text-sm font-semibold">Razón Social / Nombre:</label>
                                        <input
                                        type="text"
                                        value={razonSocial}
                                        onChange={(e) => setRazonSocial(e.target.value)}
                                        className="border p-2 rounded w-full mb-2"
                                        />

                                        <label className="block text-sm font-semibold">NIT:</label>
                                        <input
                                        type="text"
                                        value={nit}
                                        onChange={(e) => setNit(e.target.value)}
                                        className="border p-2 rounded w-full mb-2"
                                        />

                                        <label className="block text-sm font-semibold">Correo:</label>
                                        <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        className="border p-2 rounded w-full mb-2"
                                        />
                                    </div>

                                    {/* Datos de hospedaje */}
                                    <div className="mb-4 border-b pb-4">
                                        <label className="block text-sm font-semibold">Cantidad de Habitaciones:</label>
                                        <input
                                        type="number"
                                        min="1"
                                        value={habitaciones}
                                        onChange={(e) => setHabitaciones(parseInt(e.target.value) || 1)}
                                        className="border p-2 rounded w-full mb-2"
                                        />

                                        <label className="block text-sm font-semibold">Cantidad de Huéspedes:</label>
                                        <input
                                        type="number"
                                        min="1"
                                        value={huespedes}
                                        onChange={(e) => setHuespedes(parseInt(e.target.value) || 1)}
                                        className="border p-2 rounded w-full mb-2"
                                        />

                                        <label className="block text-sm font-semibold">Cantidad de Noches:</label>
                                        <input
                                        type="number"
                                        min="1"
                                        value={noches}
                                        onChange={(e) => setNoches(parseInt(e.target.value) || 1)}
                                        className="border p-2 rounded w-full mb-2"
                                        />

                                        <label className="block text-sm font-semibold">Precio Total ($):</label>
                                        <input
                                        type="text"
                                        value={totalHospedaje !== '' ? numberWithCommas(totalHospedaje) : ''}
                                        onChange={(e) => setTotalHospedaje(e.target.value)}
                                        className="border p-2 rounded w-full mb-2"
                                        />
                                    </div>

                                    
                                    <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
                                            
                                        <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border p-2">IMPUESTO</th>
                                           
                                        </tr>
                                        </thead>
                                        
                                    </table>
                                    <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
                                            
                                        <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border p-2">Descripción</th>
                                            <th className="border p-2">Monto base</th>
                                            <th className="border p-2">%</th>
                                            <th className="border p-2">IVA</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border p-2">Habitaciones</td>
                                            <td className="border p-2">${base.toLocaleString()}</td>
                                            <td className="border p-2">19%</td>
                                            <td className="border p-2">${ammountIva.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">Seguro Hotelero</td>
                                            <td className="border p-2">${totalSeguroHotelero.toLocaleString()}</td>
                                            <td className="border p-2">0%</td>
                                            <td className="border p-2">0</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
                                        <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border p-2">Descripción</th>
                                            <th className="border p-2">Cantidad</th>
                                            <th className="border p-2">Valor Unitario</th>
                                            <th className="border p-2">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border p-2">Habitaciones</td>
                                            <td className="border p-2">{habitaciones}</td>
                                            <td className="border p-2">${costoPorNoche.toLocaleString()}</td>
                                            <td className="border p-2">${parseInt(cleanedPrice).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">Seguro Hotelero</td>
                                            <td className="border p-2">{noches * huespedes}</td>
                                            <td className="border p-2">${seguroPorNoche.toLocaleString()}</td>
                                            <td className="border p-2">${totalSeguroHotelero.toLocaleString()}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    {/* Desglose de impuestos */}
                                    <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
                                        <tbody>
                                        <tr>
                                            <td className="border p-2 font-semibold">Subtotal</td>
                                            <td className="border p-2">${(base +totalSeguroHotelero).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2 font-semibold">IVA (19%)</td>
                                            <td className="border p-2">${ammountIva.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2 font-semibold">Total (Incluye IVA)</td>
                                            <td className="border p-2">${(ValorBase + ammountIva +totalSeguroHotelero).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2 font-semibold">Retención en la Fuente (3.5%)</td>
                                            <td className="border p-2">${ammountRte.toLocaleString()}</td>
                                        </tr>
                                        <tr className="font-bold bg-gray-100">
                                            <td className="border p-2">TOTAL A PAGAR</td>
                                            <td className="border p-2 text-lg">${totalAPagar.toLocaleString()}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <p className="text-xs text-gray-600">
                                        * El seguro hotelero es de 1.100 por noche y por persona.
                                    </p>

                                    <button onClick={handleDownloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700">
        Descargar PDF
      </button>
                </div>
                </>);
  };
  
  export default Price;