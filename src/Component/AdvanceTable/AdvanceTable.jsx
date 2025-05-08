import AdvanceTableHeader from "../AdvanceTableHeader/AdvanceTableHeader";
import AdvanceTableRow from "../AdvanceTableRow/AdvanceTableRow";

function AdvanceTable({ advances }) {
    return (
      <div className="overflow-y-auto max-h-[800px]"> 
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
