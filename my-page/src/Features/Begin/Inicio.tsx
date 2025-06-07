import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Preguntas from '../Preguntas/Preguntas'; // Asegúrate de que la ruta es correcta
import { crearTest } from './apiBegin';

const MBTITestPage = () => {
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const features = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/742/742751.png",
      alt: "Feliz",
      text: "Sé tú mismo y responde sinceridad para averiguar",
      bgColor: "bg-[#EB4B15]",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/709/709592.png",
      alt: "Búsqueda",
      text: "Descubre la manera en que personalidad influye en muchas áreas de tu vida",
      bgColor: "bg-[#E5E5E5]",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
      alt: "Avatar",
      text: "Conviértete en la persona que deseas ser con nuestros materiales prémium opcionales.",
      bgColor: "bg-black",
    },
  ];

  if (mostrarPreguntas) {
    return <Preguntas />;
  }

   

const iniciarTest = async () => {
  setError("");
  setLoading(true);

  const userId = Number(localStorage.getItem("userId"));
  if (!userId) {
    setError("Usuario no autenticado.");
    setLoading(false);
    return;
  }

  try {
    const res = await crearTest({
      idUsuario: userId,
      tipoTestId: 1,
    });

    if (res.isSuccess) {
      // Guardar ID si lo necesitas
      // localStorage.setItem("idUsuarioTest", res.data.idUsuarioTest?.toString());

      // Mostrar preguntas si el test fue creado correctamente
      setMostrarPreguntas(true);
    } else {
      setError(res.message || "No se pudo iniciar el test.");
    }
  } catch (err) {
    console.error("Error al iniciar el test:", err);
    setError("Error inesperado al conectar con el servidor.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4 py-10">
      <Motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-black"
      >
        Realizar Test de Personalidad MBTI
      </Motion.h1>

      <p className="text-center text-black max-w-xl mt-4">
        El MBTI es una herramienta de autoconocimiento que te ayuda a entender tu personalidad
        y mejorar tus relaciones personales y profesionales.
      </p>

      <p className="text-sm text-[#EB4B15] mt-2">Paso 1 de 4 • Tiempo estimado: 5 minutos</p>

      <div className="mt-10 grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        {features.map((item, index) => (
          <Motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`rounded-xl p-4 hover:shadow-xl transition-transform hover:scale-105 text-center cursor-pointer ${item.bgColor}`}
          >
            <img
              src={item.img}
              alt={item.alt}
              className="w-40 h-40 mx-auto mb-4"
            />
            {/* 👇 Color forzado directamente con inline style */}
            <p className="text-base font-medium" style={{ color: '#fff' }}>
              {item.text}
            </p>
          </Motion.div>
        ))}
      </div>
{error && <p className="text-red-600 mt-4">{error}</p>}
      <Motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 bg-[#EB4B15] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-200"
        onClick={iniciarTest}
        aria-label="Comenzar test de personalidad MBTI"
      >
        ¡Comenzar ahora! <ArrowRight size={18} />
      </Motion.button>
    </div>
  );
};

export default MBTITestPage;
