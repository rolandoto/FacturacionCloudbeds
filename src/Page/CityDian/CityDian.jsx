
import React, { useEffect, useState } from "react"
import Sidebar from "../../Component/Sidebar/Sidebar"
import { Search, ChevronDown, Trash2, Edit } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import UseCitySigoActions from "../../Actions/UseCitySigoActions";

const CityDian =() =>{
    const [entries, setEntries] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const {getCitySigo} = UseCitySigoActions()
    const dispatch = useDispatch();
    const { City, error, loading } = useSelector((state) => state.CitySigoSlice);
 
  
    const fetchData = async () => {
      try {
        await getCitySigo();
      } catch (err) {
      
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [dispatch]);
  
    const filteredCities = City.filter((city) =>
        city.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.Country.toLowerCase().includes(searchTerm.toLowerCase())
      );
  

    const FillContent=() =>{
        if(loading){
            return <>Cargando...</>
        }if(error){
            return <>Cargando...</>
        }

        return  <div className="bg-white rounded-lg shadow p-6 w-full mx-auto">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Ciudades de la DIAN registradas</h2>
                <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <div className="relative">
                    <select 
                        className="appearance-none border rounded px-3 py-1 pr-8 bg-white text-sm"
                        value={entries}
                        onChange={(e) => setEntries(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                    </div>
                    </div>
                    <span className="text-sm text-gray-600">entries</span>
                </div>
        
                <div className="relative">
                    <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border rounded-md w-64 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                    </div>
                </div>
                </div>
                
                <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                    <tr className="border-b">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
                        <div className="flex items-center gap-1">
                            Ciudad
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
                        Código ciudad
                        <ChevronDown size={14} className="text-gray-400" />
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
                        Código país
                        <ChevronDown size={14} className="text-gray-400" />
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
                        Código estado
                        <ChevronDown size={14} className="text-gray-400" />
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
                        País
                        <ChevronDown size={14} className="text-gray-400" />
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
                        Departamento
                        <ChevronDown size={14} className="text-gray-400" />
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                        Acción
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCities.slice(0, entries).map((cityItem) => (
                        <tr key={cityItem.ID} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">
                            <span className="font-medium text-blue-600">{cityItem.City}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">{cityItem.Code_city}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{cityItem.Code_country}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{cityItem.Code_state}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{cityItem.Country}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{cityItem.State_departament}</td>
                        <td className="py-3 px-4">
                            <div className="flex space-x-2">
                            <button className="p-1 text-gray-500 hover:text-red-500">
                                <Trash2 size={18} />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-blue-500">
                                <Edit size={18} />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
        
                <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-1">
                    <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100">
                    Previous
                    </button>
                    <button className="px-3 py-1 border rounded text-sm bg-blue-500 text-white">
                    1
                    </button>
                    <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100">
                    Next
                    </button>
                </div>
                <div className="text-sm text-gray-600">
                    Showing 1 to {Math.min(entries, filteredCities.length)} of {filteredCities.length} entries
                </div>
                </div>
                </div>
    }


    return  <>
            <Sidebar>
                {FillContent()}
            </Sidebar>
            </>

}

export default   CityDian