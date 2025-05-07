import moment from "moment";
import "moment/locale/es"; // Para formato en español
function AdvanceTableRow({ item }) {

    const start = moment(item.guestCheckIn);
    const end = moment(item.guestCheckOut);
    const formatted = `${start.format("MMM D")} – ${end.format("D")}`;

    return (
      <tr key={item.reservationID} className="border-b hover:bg-gray-50">
        <td className="py-3 px-4 text-sm">
          <span className="font-medium text-blue-600">${parseFloat(item.amount).toLocaleString("es-CO")}</span>
        </td>
        <td className="py-3 px-4 text-sm text-gray-800">
        <span className="font-medium text-blue-600">{item.transactionDateTime}</span></td>
        <td className="py-3 px-4 text-sm text-gray-800">{item.category}</td>
        <td className="py-3 px-4 text-sm text-gray-800">{item.roomName}</td>
        <td className="py-3 px-4 text-sm text-gray-800">{item.roomTypeName}</td>
        <td className="py-3 px-4 text-sm text-gray-800">{item.userName}</td>
        <td className="py-3 px-4 text-sm text-gray-800">{item.reservationID}</td>
        <td className="py-3 px-4 text-sm text-gray-800">
            <div className="inline-block w-[150px] font-mono text-center  bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                {formatted}
            </div>
        </td>
      </tr>
    );
}


export default AdvanceTableRow

