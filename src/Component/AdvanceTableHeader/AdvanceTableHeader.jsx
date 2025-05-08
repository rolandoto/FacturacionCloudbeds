import { ChevronDown } from "lucide-react";

function AdvanceTableHeader() {
  
    const headers = [
      "Valor","Fecha", "Metodo de pago", "Numero de habitacion", "Tipo habitacion", "Usuario", "Codigo reserva","Check-in-Check-out"
    ];
  
    return (
      <thead className="sticky top-0 border-b  z-10 backdrop-blur-sm bg-white/70">
        <tr className="border-b">
          {headers.map((header, idx) => (
            <th key={idx} className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
              <div className="flex items-center gap-1">
                {header}
               <ChevronDown size={14} className="text-gray-400" />
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  export default AdvanceTableHeader