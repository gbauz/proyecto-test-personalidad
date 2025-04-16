import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-xl overflow-hidden">
        
        {/* Izquierda: branding/mensaje */}
        <div className="relative bg-black text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-4">Humanalyze</h2>
          <p className="text-xl font-semibold mb-6 leading-snug">
            ¿Listo para descubrir tu perfil de personalidad?
          </p>
          <p className="text-sm text-gray-300 mb-6">
            Evalúa, conecta y contrata con inteligencia emocional.
          </p>
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80"
            alt="Team working"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Derecha: formulario */}
        <div className="p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-3"
                placeholder="usuario@correo.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-3"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Recordarme
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition duration-300"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
