import React from "react";

const pasos = [
  "Registrado",
  "Validacion documento",
  "Revision RH",
  "Aprobacion Solicitud",
  "Aceptar solicitud",
];

const estadoDatos = [
  { estado: "Registrado", dias: 20, fecha: "15-05-2025" },
  { estado: "Validacion documentos", dias: "", fecha: "" },
  { estado: "Revision Rh", dias: "", fecha: "" },
  { estado: "Aprobacion solicitud", dias: "", fecha: "" },
  { estado: "Aceptar solicitud", dias: "", fecha: "" },
];

function EstadoPostulacion() {
  return (
    <div className="min-h-screen p-6 bg-white">
      <h1
        className="text-xl font-semibold mb-8 text-center"
        style={{ color: "black" }}
      >
        Estado de solicitud
      </h1>

      {/* Linea de pasos */}
      <div className="flex items-center justify-center space-x-4 mb-10">
        {pasos.map((paso, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center font-bold" style={{ color: "black" }}>
                {index + 1}
              </div>
              <span
                className="mt-2 text-sm text-center max-w-xs"
                style={{ color: "black" }}
              >
                {paso}
              </span>
            </div>
            {index < pasos.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Info adicional */}
      <div className="max-w-md mx-auto mb-6 space-y-1" style={{ color: "black" }}>
        <p>
          <strong>No postulación:</strong> 54567897
        </p>
        <p>
          <strong>Tipo de trámite:</strong> Postulación oferta laboral
        </p>
      </div>

      {/* Tabla */}
      <table className="w-full max-w-md mx-auto border border-gray-300 rounded-md text-left">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="px-4 py-2 border-b border-gray-300"
              style={{ color: "black" }}
            >
              Estado
            </th>
            <th
              className="px-4 py-2 border-b border-gray-300"
              style={{ color: "black" }}
            >
              N días
            </th>
            <th
              className="px-4 py-2 border-b border-gray-300"
              style={{ color: "black" }}
            >
              Fecha de aprobación
            </th>
          </tr>
        </thead>
        <tbody>
          {estadoDatos.map(({ estado, dias, fecha }, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td
                className="px-4 py-2 border-b border-gray-300"
                style={{ color: "black" }}
              >
                {estado}
              </td>
              <td
                className="px-4 py-2 border-b border-gray-300"
                style={{ color: "black" }}
              >
                {dias}
              </td>
              <td
                className="px-4 py-2 border-b border-gray-300"
                style={{ color: "black" }}
              >
                {fecha}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstadoPostulacion;
