import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Preguntas from '../Preguntas/Preguntas';
import { crearTest, eliminarTest, verificarTest } from './apiBegin';
import { VerificarTestInterface } from './apiBegin';
import { useNavigate } from 'react-router-dom';

const MBTITestPage = () => {
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idUsuarioTest, setIdUsuarioTest] = useState<number>(0);
  const [testCompleted, setTestCompleted] = useState<string>("");
  const [mensajeVerificacion, setMensajeVerificacion] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  // ✅ Ejecutar solo después de montar el componente
  useEffect(() => {
   

    init();
  }, []);

   const init = async () => {
      const storedId = localStorage.getItem("userId");
      const testCompletado = localStorage.getItem("testCompleted");
      if(testCompletado != null){
        setTestCompleted(testCompletado);
      } 
      if (storedId) {
        const id = Number(storedId);
        setUserId(id);
        await verificarTestExistente(id);
      } else {
        setError("Usuario no autenticado.");
      }
      if(testCompletado === "false"){}
      if(storedId != null){
                eliminarTestExistente(Number(storedId))
      }

      }
    

  // ✅ Verifica si el test ya existe
  const verificarTestExistente = async (id: number) => {
    setLoading(true);
    try {
      const response = await verificarTest({ idUsuario: id });
      if (response.isSuccess && response.data?.idUsuarioTest) {
        setIdUsuarioTest(response?.data?.idUsuarioTest);
        localStorage.setItem("idUsuarioTest", response.data.idUsuarioTest.toString());
      }
      setMensajeVerificacion(response.message);
    } catch (err) {
      console.error("Error al verificar el test", err);
      setError("No se pudo verificar el estado del test.");
    } finally {
      setLoading(false);
    }
  };


  
  // ✅ Verifica elimina el test si existe 
  const eliminarTestExistente = async (id: number) => {
    setLoading(true);
    try {
      const response = await eliminarTest({idUsuario: id});
      if (response.isSuccess && response.data?.count > 0) {
        localStorage.removeItem("idUsuarioTest");
      }
      setMensajeVerificacion("Aun no se a creado ningun test");
    } catch (err) {
      console.error("Error al verificar el test", err);
      setError("No se pudo verificar el estado del test.");
    } finally {
      setLoading(false);
    }
  };

  // // ✅ Inicia nuevo test si no existe
  // const iniciarTest = async () => {
  //   if (!userId) {
  //     setError("Usuario no autenticado.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await crearTest({
  //       idUsuario: userId,
  //       tipoTestId: 1,
  //     });

  //     if (res?.isSuccess == true) {
  //       const testId = res.data.idUsuarioTest
  //       setIdUsuarioTest(testId);
     
        
  //       localStorage.setItem("idUsuarioTest", idUsuarioTest?.toString());
  //       setMostrarPreguntas(true); 
  //     } else {
  //       setError(res?.message || "No se pudo iniciar el test.");
  //     }
  //      navigate("/crearTest")
      
  //   } catch (err) {
  //     console.error("Error al iniciar el test:", err);
  //     setError("Error inesperado al conectar con el servidor.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const iniciarTest = async () => {
  if (!userId) {
    setError("Usuario no autenticado.");
    return;
  }

  setLoading(true);
  try {
    const res = await crearTest({
      idUsuario: userId,
      tipoTestId: 1,
    });

    if (res?.isSuccess === true) {
      const testId = res.data.idUsuarioTest;
      setIdUsuarioTest(testId);

      localStorage.setItem("idUsuarioTest", testId.toString());
      setMostrarPreguntas(true);
      navigate("/crearTest");
    } else {
      setError(res?.message || "No se pudo iniciar el test.");
    }
  } catch (err) {
    console.error("Error al iniciar el test:", err);
    setError("Error inesperado al conectar con el servidor.");
  } finally {
    setLoading(false);
  }
};


  // ✅ Continuar test existente
  const verTestCreado = () => {
     navigate("/verTest")
  };

  // // ✅ Mostrar preguntas
  // if (mostrarPreguntas) {
   
  // }

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
      text: "Descubre cómo tu personalidad influye en muchas áreas de tu vida",
      bgColor: "bg-[#E5E5E5]",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
      alt: "Avatar",
      text: "Conviértete en la persona que deseas ser con nuestros materiales prémium opcionales.",
      bgColor: "bg-black",
    },
  ];

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
            <p className="text-base font-medium" style={{ color: '#fff' }}>
              {item.text}
            </p>
          </Motion.div>
        ))}
      </div>

      {(mensajeVerificacion  && testCompleted == "false") && (
        <p className="mt-6 text-green-600 font-semibold text-lg">
          {mensajeVerificacion}
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-semibold">
          {error}
        </p>
      )}

      {testCompleted == "false" && (
        <Motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 bg-[#EB4B15] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-200"
          onClick={iniciarTest}
        >
          ¡Comenzar ahora! <ArrowRight size={18} />
        </Motion.button>
      )}

      {testCompleted == "true" && (
        <Motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-200"
          onClick={verTestCreado}
        >
          Ver test <ArrowRight size={18} />
        </Motion.button>
      )}
    </div>
  );
};

export default MBTITestPage;
