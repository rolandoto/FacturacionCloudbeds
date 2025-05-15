import TraTableHeader from "../TraTableHeader/TraTableHeader";
import TraTableRow from "../TraTableRow/TraTableRow";

function TraTable({ GuestTra }) {
    return (
        <div className="overflow-y-auto max-h-[800px]">
        <table className="min-w-full border rounded-full ">
        <TraTableHeader />
          <tbody>
            {GuestTra.map((item) => (
              <TraTableRow key={item.Codigo_tra} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default TraTable
