import React from "react";

const data = [
  {
    id: 7,
    idDicotomia: 2,
    idUsuarioTest: 14,
    isActive: true,
    createdAt: "2025-06-15T21:49:10.434Z",
    personalidades: {
      id: 2,
      nombre: "ESTP",
      keywords: "Espontáneo. Energético. Resolvedor de conflictos.",
      descripcion:
        "Los ESTP viven el momento. Son ingeniosos y directos, prefieren actuar antes que planear en exceso. Les encanta tomar riesgos y adaptarse rápido a los cambios. Fortalezas: Enérgicos, percepti",
      isActive: true,
    },
    usuariotest: {
      id: 14,
      idUsuario: 9,
      tipoTestId: 1,
      codigo: "TEST-572ef39c-cef5-42d4-8e74-e22dedc2e0c4",
      isActive: true,
      testCompleted: true,
      user: {
        id: 9,
        name: "carlos pinduisaca",
        email: "carlospinduisca@gmail.com",
        roleId: 2,
        isActive: true,
      },
    },
  },
  {
    id: 12,
    idDicotomia: 2,
    idUsuarioTest: 19,
    isActive: true,
    createdAt: "2025-06-15T21:49:10.434Z",
    personalidades: {
      id: 2,
      nombre: "ESTP",
      keywords: "Espontáneo. Energético. Resolvedor de conflictos.",
      descripcion:
        "Los ESTP viven el momento. Son ingeniosos y directos, prefieren actuar antes que planear en exceso. Les encanta tomar riesgos y adaptarse rápido a los cambios. Fortalezas: Enérgicos, percepti",
      isActive: true,
    },
    usuariotest: {
      id: 19,
      idUsuario: 14,
      tipoTestId: 1,
      codigo: "TEST-fa51fd34-0c7c-4912-bc22-13172183f4ea",
      isActive: true,
      testCompleted: true,
      user: {
        id: 14,
        name: "juliette lasso",
        email: "juliettelasso@gmail.com",
        roleId: 2,
        isActive: true,
      },
    },
  },
];

const TestList = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Tests Completados
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {data.map((test) => (
          <div
            key={test.id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-600">
                Personalidad: {test.personalidades?.nombre || "N/A"}
              </h2>
              <p className="text-sm text-gray-500">
                Test ID: {test.usuariotest?.codigo || "N/A"}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Descripción:</span>{" "}
                {test.personalidades?.descripcion || "Sin descripción"}
              </p>
            </div>

            <div className="text-sm text-gray-600 mt-4">
              <p>
                <span className="font-semibold">Usuario:</span>{" "}
                {test.usuariotest?.user?.name || "Desconocido"}
              </p>
              <p>
                <span className="font-semibold">Correo:</span>{" "}
                {test.usuariotest?.user?.email || "No disponible"}
              </p>
              <p>
                <span className="font-semibold">Fecha:</span>{" "}
                {test.createdAt
                  ? new Date(test.createdAt).toLocaleString()
                  : "Fecha no disponible"}
              </p>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              ID Test Interno: {test.id} | ID Usuario Test:{" "}
              {test.idUsuarioTest}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestList;
