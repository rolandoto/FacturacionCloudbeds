import React from "react"
import Sidebar from "../../Component/Sidebar/Sidebar";
import { Users, Package, MoreVertical } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, 
  AreaChart, Area, YAxis } from 'recharts';

  

const Dashboard = () =>{


  const monthlyData = [
    { name: 'Jan', value: 180 },
    { name: 'Feb', value: 350 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 320 },
    { name: 'May', value: 180 },
    { name: 'Jun', value: 190 },
    { name: 'Jul', value: 320 },
    { name: 'Aug', value: 90 },
    { name: 'Sep', value: 200 },
    { name: 'Oct', value: 320 },
    { name: 'Nov', value: 280 },
    { name: 'Dec', value: 90 },
  ];
  
  // Area chart data
  const areaData = Array(30).fill().map((_, i) => {
    return {
      name: i,
      value1: Math.floor(Math.random() * 50) + 150,
      value2: Math.floor(Math.random() * 50) + 50
    };
  });


    return <>
              <div >
              <Sidebar>
                <div className={`flex-1 flex flex-col transition-all duration-300 `}>
                <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-gray-100 rounded-md">
                          <Users size={24} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-500">Customers</p>
                          <h3 className="text-2xl font-bold">3,782</h3>
                        </div>
                        <div className="ml-auto">
                          <span className="flex items-center text-sm font-medium text-green-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            11.01%
                          </span>
                        </div>
                      </div>
                    </div>

                
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-gray-100 rounded-md">
                          <Package size={24} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-500">Orders</p>
                          <h3 className="text-2xl font-bold">5,359</h3>
                        </div>
                        <div className="ml-auto">
                          <span className="flex items-center text-sm font-medium text-red-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            9.05%
                          </span>
                        </div>
                      </div>
                    </div>

                  
                    <div className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Monthly Target</h3>
                          <p className="text-sm text-gray-500">Target you've set for each month</p>
                        </div>
                        <div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="relative w-40 h-40">
                          <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="#EDF2F7" 
                              strokeWidth="10" 
                            />
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="#4F46E5" 
                              strokeWidth="10" 
                              strokeDasharray="282.7" 
                              strokeDashoffset="70" 
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold">75.55%</span>
                            <span className="text-sm text-green-500">+10%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <p className="text-sm">
                          You earn $3287 today, it's higher than last month.
                        </p>
                        <p className="text-sm font-medium">
                          Keep up your good work!
                        </p>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Target</p>
                          <p className="font-semibold flex items-center justify-center">
                            $20K
                            <svg className="w-3 h-3 ml-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Revenue</p>
                          <p className="font-semibold flex items-center justify-center">
                            $20K
                            <svg className="w-3 h-3 ml-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Today</p>
                          <p className="font-semibold flex items-center justify-center">
                            $20K
                            <svg className="w-3 h-3 ml-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

              
                  <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Monthly Sales</h2>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <CartesianGrid vertical={false} stroke="#f5f5f5" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#718096' }}
                          />
                          <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-semibold">Statistics</h2>
                        <p className="text-sm text-gray-500">Target you've set for each month</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">Monthly</button>
                        <button className="px-3 py-1 text-sm text-gray-600 rounded-md">Quarterly</button>
                        <button className="px-3 py-1 text-sm text-gray-600 rounded-md">Annually</button>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#A5B4FC" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#A5B4FC" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <YAxis 
                            tickCount={6} 
                            domain={[0, 300]} 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#718096' }}
                          />
                          <CartesianGrid vertical={false} stroke="#f5f5f5" />
                          <Area 
                            type="monotone" 
                            dataKey="value1" 
                            stroke="#4F46E5" 
                            fillOpacity={1} 
                            fill="url(#colorValue1)" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value2" 
                            stroke="#A5B4FC" 
                            fillOpacity={1} 
                            fill="url(#colorValue2)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </main>
              </div>
              </Sidebar>
              </div>
            </>

}

export default Dashboard


