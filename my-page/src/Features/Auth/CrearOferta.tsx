import { useState } from "react";
import { crearOferta } from "./api";

const FormularioOfertaFlowbite = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    sueldo: "",
    modalidad: "",
  });

  const [mensaje, setMensaje] = useState("");

  const creadorId = Number(localStorage.getItem("userId"));
  const roleName = localStorage.getItem("roleName");
  console.log("ROL ACTUAL:", roleName);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if ((roleName || "").toLowerCase() !== "Recursos Humanos") {
    //   setMensaje("No tienes permiso para crear ofertas.");
    //   return;
    // }

    try {
      const result = await crearOferta({
        ...form,
        sueldo: parseFloat(form.sueldo),
        creadorId,
      });

      if (result.isSuccess) {
        setMensaje("Oferta creada correctamente.");
        setForm({ nombre: "", descripcion: "", sueldo: "", modalidad: "" });
      } else {
        setMensaje(result.message || "No se pudo crear la oferta.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error en el servidor.");
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Crear Nueva Oferta</h2>

      <div className="mb-5">
        <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">
          Nombre del puesto
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          placeholder="Ej: Desarrollador Frontend"
          className="w-full border border-gray-300 p-2 rounded text-black"
          style={{ color: "black" }}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          placeholder="Breve descripción del puesto"
          className="w-full border border-gray-300 p-2 rounded text-black"
          style={{ color: "black" }}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="sueldo" className="block mb-2 text-sm font-medium text-gray-900">
          Sueldo
        </label>
        <input
          type="number"
          id="sueldo"
          name="sueldo"
          value={form.sueldo}
          onChange={handleChange}
          required
          placeholder="Ej: 45000"
          className="w-full border border-gray-300 p-2 rounded text-black"
          style={{ color: "black" }}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="modalidad" className="block mb-2 text-sm font-medium text-gray-900">
          Modalidad
        </label>
        <select
          id="modalidad"
          name="modalidad"
          value={form.modalidad}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded text-black"
          style={{ color: "black" }}
        >
          <option value="">Selecciona una modalidad</option>
          <option value="Remoto">Remoto</option>
          <option value="Presencial">Presencial</option>
          <option value="Híbrido">Híbrido</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear Oferta
      </button>

      {mensaje && <p className="mt-3 text-sm text-red-600">{mensaje}</p>}
    </form>
  );
};

export default FormularioOfertaFlowbite;
