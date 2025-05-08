import TraTableHeader from "../TraTableHeader/TraTableHeader";
import TraTableRow from "../TraTableRow/TraTableRow";

function TraTable({ GuestTra }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <TraTableHeader />
          <tbody>
            {GuestTra.map((item) => (
              <TraTableRow key={item.Codigo_tra} item={item}  />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default TraTable
