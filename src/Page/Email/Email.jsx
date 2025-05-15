import React, { useContext, useState } from "react"
import Sidebar from "../../Component/Sidebar/Sidebar"
import { useSelector } from "react-redux";
import UseGuestEmailActions from "../../Actions/UseGuestEmailActions";
import  AutoProvider  from "../../UseContext.js/Autoprovider";
import { Loader, SearchX  } from "lucide-react";
import CardEmail from "../../Component/CardEmail/CardEmail";
import { Toaster } from "sonner";
import { People } from "./people";


const Email =() =>{

    const {jwt}  =  useContext(AutoProvider)
    const { sendEmail, loadingsendEmail, errorsendEmail } = useSelector((state) => state.Email);
    const  {PostSendEmail} =UseGuestEmailActions()
    const [selectedEmails, setSelectedEmails] = useState([]);

    const handleSendEmail = async() => {
       await PostSendEmail({propertyID:jwt?.result?.propertyID,rayEmail:selectedEmails })
    };

    const peopleWithId = People.map((person, index) => ({
      id: index + 1,
      ...person,
    }));
    
     
    const toggleSelect = (person) => {
       
        setSelectedEmails((prev) => {
          const exists = prev.find((p) => p.email === person.email);
          return exists
            ? prev.filter((p) => p.email !== person.email)
            : [...prev, { name: person.name, email: person.email }];
        });
    };


    const toggleSelectAll = () => {
        if (selectedEmails.length === peopleWithId.length) {
        setSelectedEmails([]);
        } else {
        setSelectedEmails(peopleWithId);
        }
    };

  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500'];

  const FillContent=() =>{
    if(loadingsendEmail){
        return <> <div className="flex justify-center items-center h-40">
                <Loader className="w-8 h-8 animate-spin text-indigo-600" />
                </div></>
    }if(loadingsendEmail){
        return  <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                    <SearchX className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">Vuelve a recargar la pagina</p>
                </div>
    }

    return <ul role="list" className="divide-y divide-gray-100">
                {peopleWithId.map((person,i) => {
                const initials = person.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase();

                const color = colors[person.name.length % colors.length];

                return ( <CardEmail     
                              key={i}
                              color={color} 
                              initials={initials} 
                              toggleSelect={toggleSelect  }
                              selectedEmails={selectedEmails}
                            {...person}
                                        />);
                })}
            </ul>

}

    return  <>
            <Sidebar >
            <Toaster   />
                    <div className="p-4" >
                        <div className="max-w-7xl mx-auto border rounded-3xl mt-5  p-4 ">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={selectedEmails.length === peopleWithId.length}
                                onChange={toggleSelectAll}
                                className="size-4"
                            />
                            <span className="text-sm">Seleccionar todos</span>
                            </div>
                            <button
                            onClick={handleSendEmail}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                            >
                            Enviar correo
                            </button>
                        </div>
                        {FillContent()}
                    </div>
                </div>
            </Sidebar>
            </>
}

export default Email