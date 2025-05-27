import React, { useEffect, useState } from "react";
import { obtenerOfertasParaPostulante } from "./api"; // asegúrate de que apunta bien
import { useNavigate } from "react-router-dom";

interface Oferta {
  id: number;
  nombre: string;
  descripcion: string;
  sueldo: number;
  modalidad: string;
  creadoEn: string;
  creador: {
    name: string;
  };
}

const OfertasPostulante = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtroModalidad, setFiltroModalidad] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const userId = Number(localStorage.getItem("userId"));
  const roleName = localStorage.getItem("roleName");
  const navigate = useNavigate();

  useEffect(() => {
    if (roleName === "Postulante") {
      setError("No tienes permiso para ver esta página.");
      return;
    }

    const fetchOfertas = async () => {
      try {
        const response = await obtenerOfertasParaPostulante(userId);

        if (response.isSuccess) {
          setOfertas(response.data);
        } else {
          setError(response.message || "No se pudieron cargar las ofertas.");
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar las ofertas.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, [userId, roleName]);

  const ofertasFiltradas = ofertas.filter((oferta) => {
    const coincideBusqueda = oferta.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideModalidad = filtroModalidad
      ? oferta.modalidad === filtroModalidad
      : true;

    return coincideBusqueda && coincideModalidad;
  });

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  if (loading) {
    return <div className="text-center mt-5">Cargando ofertas...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ofertas Disponibles</h2>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="placeholder-black text-black border border-gray-300 p-2 rounded w-full"
        />

        <select
          value={filtroModalidad}
          onChange={(e) => setFiltroModalidad(e.target.value)}
          className="text-black border border-gray-300 p-2 rounded w-full md:w-1/3"
        >
          <option value="">Todas las modalidades</option>
          <option value="Presencial">Presencial</option>
          <option value="Remoto">Remoto</option>
          <option value="Híbrido">Híbrido</option>
        </select>
      </div>

      {ofertasFiltradas.length === 0 ? (
        <p>No hay ofertas disponibles con los filtros seleccionados.</p>
      ) : (
        <div className="space-y-4">
          {ofertasFiltradas.map((oferta) => (
            <div
              key={oferta.id}
              className="border border-gray-300 p-4 rounded shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">{oferta.nombre}</h3>
              <p className="text-gray-600">{oferta.descripcion}</p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Modalidad:</strong> {oferta.modalidad}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Sueldo:</strong> ${oferta.sueldo}
              </p>
              <p className="text-sm text-gray-500 italic">
                Publicado por: {oferta.creador.name} —{" "}
                {new Date(oferta.creadoEn).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfertasPostulante;
