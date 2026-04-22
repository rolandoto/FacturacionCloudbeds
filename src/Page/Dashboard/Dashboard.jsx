import React from "react";
import {
  Bed,
  Building2,
  Check,
  ChevronDown,
  Eye,
  Settings,
  User,
  Users,
} from "lucide-react";
import Sidebar from "../../Component/Sidebar/Sidebar";

const checkInData = [
  { id: "6670428772023", guests: 1, name: "MATTIS THEODOR VALENTINO LOHSS" },
  { id: "1386051088550", guests: 1, name: "ANNEMIEK GERARDINA MARIA VAN DOMMELEN" },
  { id: "8658675184739", guests: 1, name: "MAHDI GOUDARZI" },
  { id: "7516197457009", guests: 1, name: "JAWED JAMSHIDI" },
  { id: "2189793384362", guests: 1, name: "KRZYSZTOF PYTLOS" },
];

const checkOutData = [
  { id: "9771910096877", guests: 1, name: "CARLTON ETHAN", tra: true },
  { id: "6558108188978", guests: 1, name: "ANA ORDUÑO", tra: true },
  { id: "3356362705736", guests: 1, name: "Sam de Groot", tra: true },
  { id: "1537861252778", guests: 1, name: "LUCCA CLERMONTS", tra: true },
  { id: "2727542231422", guests: 2, name: "AARON DORIAN SEITZ", tra: true },
];

const GuestCard = ({ guest, showTra = false }) => (
  <article className="mb-3 rounded-md border border-gray-200 bg-white px-4 py-4 shadow-sm last:mb-0">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-xl font-medium tracking-wide text-gray-700">{guest.name}</h3>
        <p className="mt-1 text-sm text-gray-500">ID: {guest.id}</p>
      </div>

      <div className="mt-1 flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-500">
        <User size={12} /> x{guest.guests}
      </div>
    </div>

    <div className="mt-4 flex justify-end gap-2">
      <span className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-xs font-medium tracking-wide text-gray-600">
        SIRE
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 text-white">
          <Check size={14} />
        </span>
      </span>

      {showTra && guest.tra && (
        <span className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-xs font-medium tracking-wide text-gray-600">
          TRA
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 text-white">
            <Check size={14} />
          </span>
        </span>
      )}
    </div>
  </article>
);

const ListPanel = ({ title, count, items, showTra = false }) => (
  <section className="rounded-md border border-gray-200 bg-gray-50/50 p-3">
    <header className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3">
      <div className="flex items-center gap-2 text-gray-700">
        <Bed size={16} className="text-cyan-500" />
        <h2 className="text-base font-medium">{title}</h2>
      </div>
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-sky-100 px-2 text-xs font-semibold text-sky-700">
        {count}
      </span>
    </header>

    {items.map((guest) => (
      <GuestCard key={guest.id} guest={guest} showTra={showTra} />
    ))}
  </section>
);

const Dashboard = () => {
  return (
    <Sidebar>
      <main className="h-screen overflow-y-auto bg-[#f7f9fb] p-4 md:p-6">
        <div className="mx-auto max-w-7xl rounded-md border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-slate-50 px-3 py-2 text-sm text-gray-600">
                <Building2 size={16} className="text-slate-500" />
                Masaya Medellín
                <ChevronDown size={15} />
              </button>

              <div className="flex items-center gap-4 text-slate-500">
                <Eye size={16} className="cursor-pointer" />
                <Settings size={16} className="cursor-pointer" />
                <span className="text-sm font-medium text-sky-600">TRA &amp; SIRE Connect</span>
              </div>
            </div>

            <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="w-1/2 bg-cyan-400" />
              <div className="w-1/2 bg-sky-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6">
            <ListPanel title="Check-in completados" count={10} items={checkInData} />
            <ListPanel title="Check-out completados" count={19} items={checkOutData} showTra />
          </div>

          <footer className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-xs text-gray-400 md:px-6">
            <span>Actualizado hace 2 minutos</span>
            <span className="inline-flex items-center gap-1">
              <Users size={13} /> 42 huéspedes procesados hoy
            </span>
          </footer>
        </div>
      </main>
    </Sidebar>
  );
};

export default Dashboard;
