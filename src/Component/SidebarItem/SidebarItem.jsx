import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

function SidebarItem({ icon, text, expanded, to = "#", hasChildren = false, childrenItems = [] }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    if (hasChildren) setOpen(!open);
  };

  return (
    <div>
      <div
        className={`flex items-center px-3 py-2 cursor-pointer rounded-md transition-colors 
        ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 p-8 hover:bg-gray-100'}`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-center w-6 h-6">{icon}</div>
        {expanded && (
          <div className="ml-3 flex-1 flex items-center justify-between">
            <span className="font-sans text-black">{text}</span>
            {hasChildren &&
              (open ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              ))}
          </div>
        )}
      </div>

      {/* Sub Items */}
      {hasChildren && open && expanded && (
        <div className="ml-9 mt-1 space-y-1">
          {childrenItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center justify-between text-sm px-2 py-1 rounded-md hover:bg-blue-50 ${
                location.pathname === item.to ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-600'
              }`}
            >
              <span>{item.text}</span>
            
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarItem;
