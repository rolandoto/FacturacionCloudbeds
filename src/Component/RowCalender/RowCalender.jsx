import React from "react"

function RowCalender() {

    const day =["L","M","X","J","V","S","D"]

    return  <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
                {day.map((itemDay,i) =>(
                    <div key={i} >
                        {itemDay}
                    </div>
                ))}
            </div>
}

export default  RowCalender