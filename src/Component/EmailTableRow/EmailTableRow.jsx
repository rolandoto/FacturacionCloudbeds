import React from "react"
import moment from "moment";
import "moment/locale/es"; // Para formato en español

function EmailTableRow({ itemEmail }) {

    const getStatusStyle = (status) => {
        switch (status) {
          case "email.delivered":
            return { text: "entregado", bg: "bg-green-100", textColor: "text-green-700" };
          case "email.opened":
            return { text: "abierto", bg: "bg-blue-100", textColor: "text-blue-700" };
          case "email.clicked":
            return { text: "hizo clic", bg: "bg-orange-100", textColor: "text-orange-700" };
          case "email.sent":
            return { text: "enviado", bg: "bg-red-100", textColor: "text-red-700" };
          default:
            return { text: "Unknown", bg: "bg-gray-900", textColor: "text-gray-400" };
        }
    };

    const status = itemEmail.Status_email;
    const statusStyle = getStatusStyle(status);
    const Date = moment(itemEmail.Date_email).utc().format('YYYY-MM-DD HH:mm')

    console.log(itemEmail)

    return (
        <tr key={itemEmail.ID} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4 text-sm">
                <span className="font-medium text-blue-600">{itemEmail.Email}</span>
            </td>
            <td className="py-3 px-4 text-sm text-gray-800">
                <span className={`${statusStyle.bg} ${statusStyle.textColor} capitalize text-xs font-semibold px-2.5 py-0.5 rounded-md`}>
                {statusStyle.text}
            </span>
            </td>
            <td className="py-3 px-4 text-sm text-gray-800">{Date}</td>
            <td className="py-3 px-4 text-sm text-gray-800">{itemEmail.hotel}</td> 
        </tr>
    );
}

export default EmailTableRow


