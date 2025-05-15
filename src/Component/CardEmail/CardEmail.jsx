import React from "react"

const CardEmail =(props)=>{

    const  {email,name,initials,color,selectedEmails,toggleSelect} = props
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const selectedClasses = emailRegex.test(email) ? "" : "text-red-500";

    return  <>
            <li className="flex justify-between gap-x-6 py-5 items-center">
                    <div className="flex items-center min-w-0 gap-x-4">
                    <input
                        type="checkbox"
                        className="size-4 items-center"
                        checked={selectedEmails.some((itemEmail) =>itemEmail.email == email )}
                        onChange={() => toggleSelect(props)}
                    />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${color}`}>
                        {initials}
                        </div>
                        <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold text-gray-900">{name}</p>
                        <p className={`${selectedClasses} mt-1 truncate text-xs text-gray-500`}>{email}</p>
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end justify-center">
                        <div className="flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs text-gray-500">Correo electrónico enviado.</p>
                        </div>
                    </div>
                    </li>
        </>
}

export default  CardEmail

