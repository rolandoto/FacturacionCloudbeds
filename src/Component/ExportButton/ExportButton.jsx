import * as XLSX from 'xlsx';
import { FileSpreadsheet } from "lucide-react";

const ExportButton = ({ data, filename }) => {
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
      XLSX.writeFile(wb, filename);
    };
  
    return (
      <button 
        onClick={exportToExcel}
        className="mt-2 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        <FileSpreadsheet className="w-5 h-5" />
        Exportar Excel
      </button>
    );
  };


export default ExportButton