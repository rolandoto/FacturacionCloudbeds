import React from "react";
import { Building2, ChevronDown, Eye, Pencil } from "lucide-react";
import Sidebar from "../../Component/Sidebar/Sidebar";

const sireParams = [
  { label: "Hora programada para enviar SIRE", value: "19:00 - 22:59" },
  { label: "Código de la empresa en SIRE", value: "6714" },
  { label: "Departamento de la empresa en SIRE", value: "Antioquia" },
  { label: "Ciudad de la empresa en SIRE", value: "Medellín" },
  { label: "Tipo de documento", value: "Cédula de ciudadanía" },
  { label: "Numero de documento", value: "****" },
  { label: "Contraseña de acceso", value: "****" },
];

const traParams = [
  { label: "RNT", value: "93095" },
  { label: "Token de acceso", value: "mHzLATUXls9vPvxIRqGrMX96Rj8Oh7aFDatuLuda" },
  { label: "Hora programada para enviar TRA", value: "23:00" },
];

const ConfigRow = ({ label, value }) => (
  <div className="mb-3 flex items-center justify-between rounded-sm bg-gray-100 px-4 py-4 text-sm last:mb-0">
    <span className="text-gray-600">{label}</span>
    <div className="flex items-center gap-4 pl-4">
      <span className="font-semibold text-gray-700">{value}</span>
      <button className="text-sky-500 hover:text-sky-600" aria-label={`Editar ${label}`}>
        <Pencil size={14} />
      </button>
    </div>
  </div>
);

const ConfigCard = ({ title, rows }) => (
  <section className="rounded-sm border border-gray-200 bg-white p-4">
    <h2 className="mb-4 text-3xl font-medium text-gray-800">{title}</h2>
    {rows.map((row) => (
      <ConfigRow key={row.label} label={row.label} value={row.value} />
    ))}
  </section>
);

const TraSireConfig = () => {
  return (
    <Sidebar>
      <main className="min-h-screen bg-[#f6f7f9] p-4 md:p-6">
        <div className="mx-auto max-w-7xl rounded-sm border border-gray-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-sm bg-slate-100 px-3 py-2 text-sm text-gray-600">
                <Building2 size={16} />
                Masaya Medellín
                <ChevronDown size={14} />
              </button>
              <Eye size={16} className="text-gray-600" />
            </div>
            <span className="text-sm font-medium text-sky-600">TRA &amp; SIRE Connect</span>
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 md:p-6">
            <ConfigCard title="Parámetros para SIRE" rows={sireParams} />
            <ConfigCard title="Parámetros para TRA" rows={traParams} />
          </div>
        </div>
      </main>
    </Sidebar>
  );
};

export default TraSireConfig;
