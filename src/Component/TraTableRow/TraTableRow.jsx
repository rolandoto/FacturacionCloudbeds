import React from "react"
import moment from "moment";
import "moment/locale/es"; // Para formato en español

function TraTableRow({ item }) {

    const Date = moment(item.Date).local().format('YYYY-MM-DD HH:mm');
    return (
      <tr key={item.Codigo_tra} className="border-b hover:bg-gray-50">
        <td className="py-3 px-4 text-sm">
          <span className="font-medium text-blue-600">{item.Codigo_tra}</span>
        </td>
        <td className="py-3 px-4 text-sm text-gray-800">{item.guestName}</td>
        <td className="py-3 px-4 text-sm text-gray-800">
            <span className="font-medium text-blue-600">{item.reservationID}</span></td>
        <td className="py-3 px-4 text-sm text-gray-800">{item.name}</td>
        <td className="py-3 px-4 text-sm text-gray-800">{Date}</td>
      </tr>
    );
}

export default TraTableRow