import AdvanceTableHeader from "../AdvanceTableHeader/AdvanceTableHeader";
import AdvanceTableRow from "../AdvanceTableRow/AdvanceTableRow";

function AdvanceTable({ advances }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <AdvanceTableHeader />
          <tbody>
            {advances.map((item) => (
              <AdvanceTableRow key={item.reservationID} item={item}  />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default AdvanceTable
