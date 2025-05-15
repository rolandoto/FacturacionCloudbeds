import React, { useContext, useState } from  "react"
import { ChevronDown, Moon, Bell, Menu, LayoutDashboard, Calendar, User, Clipboard, Table, FileText, MessageSquare, Mail, Receipt, BarChart, Boxes, Lock, Settings, HelpCircle, LogOut } from 'lucide-react';
import SidebarItem from "../SidebarItem/SidebarItem";
import { useNavigate } from "react-router-dom";
import  AutoProvider from "../../UseContext.js/Autoprovider";

const Sidebar  =({children }) =>{

    const [collapsed, setCollapsed] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const {setJwt} = useContext(AutoProvider)
    const navigate = useNavigate();


    const handExit =() =>{
        localStorage.removeItem('jwt')
        localStorage.removeItem('tokenDian')
        setJwt(null)
        navigate("/")  
    }

    return <>
        <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300  ${collapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center p-4 border-b border-gray-200">
                <div className="bg-indigo-600 text-white h-8 w-8 rounded-md flex items-center justify-center">
                    <Boxes size={18} />
                </div>
            {!collapsed && <div className="ml-2 font-bold text-lg">10elementos</div>}
            </div>
            <div className="flex flex-col h-full overflow-y-auto">
                <div className="py-2 px-3 text-xs font-medium text-gray-500">
                    {!collapsed && <span>MENU</span>}
                </div>
                <SidebarItem
                    icon={<LayoutDashboard size={18} />}
                    text="Dashboard"
                    expanded={!collapsed}
                    hasChildren
                    childrenItems={[
                        { text: "Inicio", to: "/dashboard" },
                        { text: "Dolar", to: "/dashboard/Dollar" },
                        { text: "Facturacion con siigo", to: "/dashboard/siigo", badge: "PRO" },
                        { text: "Ciudad", to: "/dashboard/CityDian"},
                        { text: "Cotizaciones", to: "/dashboard/Cotization", },
                    ]}
                    />
                    <SidebarItem
                    icon={<LayoutDashboard size={18} />}
                    text="Cloudbeds"
                    expanded={!collapsed}
                    hasChildren
                    childrenItems={[
                        { text: "Anticipos", to: "/Cloudbeds/Advances" },
                        { text: "Tra", to: "/Cloudbeds/Tra" },
                    ]}
                    />

                    <SidebarItem
                    icon={<LayoutDashboard size={18} />}
                    text="Email Marketing"
                    expanded={!collapsed}
                    hasChildren
                    childrenItems={[
                        { text: "Email", to: "/Dashboard/Email" },
                        { text: "Lista de Email", to: "/Dashboard/Emails" },
                    ]}
                    />
                  
            </div>
        </div>


        <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
    
        <header className="sticky top-0 bg-white border-b border-gray-200 ">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center">
                <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-md hover:bg-gray-100">
                    <Menu size={20} />
                </button>
                <div className="relative ml-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    </div>
                    <input
                    type="text"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                    placeholder="Search or type command..."
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center text-xs font-mono text-gray-400">
                    ⌘K
                    </div>
                </div>
                </div>

                <div className="relative flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Moon size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                
                <div className="relative">
                    <button onClick={() => setShowMenu(!showMenu)} className="flex items-center ml-4 focus:outline-none">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">10</div>
                    <div className="ml-2 hidden md:block">
                        <div className="text-sm font-medium">10elementos</div>
                    </div>
                    <ChevronDown size={16} className="ml-1 text-gray-600" />
                    </button>

                    {showMenu && (
                    <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg ">
                        <div className="p-4 border-b">
                        <p className="font-semibold text-sm">10elementos</p>
                        <p className="text-xs text-gray-500">10elementos@10esas.com</p>
                        </div>
                        <ul className="text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                            <User size={16} /> Edit profile
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                            <Settings size={16} /> Account settings
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                            <HelpCircle size={16} /> Support
                        </li>
                        <li  onClick={handExit} className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer border-t">
                            <LogOut size={16} /> Cerrar sesión
                        </li>
                        </ul>
                    </div>
                    )}
                </div>
                </div>
            </div>
        </header>
            {children}
        </div>
    </>
}

export default  Sidebar