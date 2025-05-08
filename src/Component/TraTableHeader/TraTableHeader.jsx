import { ChevronDown } from "lucide-react";

function TraTableHeader() {
  
    const headers = [
      "Codigo tra", "Nombre completo", "Codigo reserva", "Hotel", "Fecha"
    ];
  
    return (
      <thead>
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

  export default TraTableHeader