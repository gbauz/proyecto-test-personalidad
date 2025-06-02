import { useEffect, useState } from 'react';
import { getTestPreguntas } from './api';
import { TestPersonality } from './api';

const MBTIQuestionPage = () => {
  const [preguntas, setPreguntas] = useState<TestPersonality[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [categoriaActualIndex, setCategoriaActualIndex] = useState(0);
  const [userId, setUserId] = useState<string>('');


  useEffect(() => {
    cargarPreguntas();
    obtenerUsuarioId();
  }, []);


  
  const obtenerUsuarioId = () => {
    const idUsuario = localStorage.getItem("userId")
    if(idUsuario !== null){
      setUserId(idUsuario)
    }
  }

  console.log("xddd",userId)


  const cargarPreguntas = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getTestPreguntas();
      if (!res.isSuccess) {
        setError(res.message || "No se pudieron obtener las preguntas.");
        return;
      }
      setPreguntas(res.data);
    } catch {
      setError("Error al conectar con el servidor.");
      setPreguntas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const getCircleStyle = (value: number, selected: boolean) => {
    const sizeMap = {
      2: 'w-16 h-16',
      1: 'w-12 h-12',
      0: 'w-10 h-10',
      '-1': 'w-12 h-12',
      '-2': 'w-16 h-16'
    };

    const baseClass = `rounded-full border-4 flex items-center justify-center transition-transform duration-200 overflow-hidden shadow-lg bg-white`;
    const sizeClass = sizeMap[value];
    const ringClass = selected ? ' scale-105 border-[#EB4B15]' : ' border-gray-300';

    return `${baseClass} ${sizeClass} ${ringClass}`;
  };

  const getFaceUrl = (value: number) => {
    switch (value) {
      case 2: return "https://i.ibb.co/hxp3m422/happy.png";
      case 1: return "https://i.ibb.co/G4Wx52t2/smile.png";
      case 0: return "https://i.ibb.co/DfWyDM0z/confused.png";
      case -1: return "https://i.ibb.co/BVJKw26B/sad-3.png";
      case -2: return "https://i.ibb.co/Mydqjr61/angry-3.png";
      default: return "https://cdn-icons-png.flaticon.com/512/6141/6141082.png";
    }
  };

  const preguntasPorCategoria = preguntas.reduce((acc, pregunta) => {
    if (!acc[pregunta.categoria]) acc[pregunta.categoria] = [];
    acc[pregunta.categoria].push(pregunta);
    return acc;
  }, {} as Record<string, TestPersonality[]>);

  const categorias = Object.keys(preguntasPorCategoria);
  const categoriaActual = categorias[categoriaActualIndex];
  const preguntasCategoria = preguntasPorCategoria[categoriaActual] || [];

  const handleSubmit = () => {
    if (Object.keys(answers).length < preguntas.length) {
      alert("Por favor responde todas las preguntas antes de continuar.");
      return;
    }

    const total = Object.values(answers).reduce((acc, val) => acc + val, 0);
    let tipo = "";

    if (total >= 10) tipo = "ENFJ - Líder empático";
    else if (total >= 0) tipo = "ISFJ - Protector confiable";
    else tipo = "INTP - Analítico introspectivo";

    setResult(tipo);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 max-w-4xl mx-auto overflow-y-auto">
      <h1 className="text-4xl font-bold text-center text-black mb-12">Test de Personalidad MBTI</h1>

      {loading && <p className="text-center text-gray-600">Cargando preguntas...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <div key={categoriaActual} className="mb-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#EB4B15]">{categoriaActual}</h2>

          {preguntasCategoria.map((pregunta) => (
            <div key={pregunta.id} className="mb-12">
              <p className="text-xl font-semibold text-center text-black mb-6">{pregunta.pregunta}</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-md text-[#EB4B15] font-medium">De acuerdo</span>
                <div className="flex gap-3">
                  {[2, 1, 0, -1, -2].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(pregunta.id, opt)}
                      className={getCircleStyle(opt, answers[pregunta.id] === opt)}
                    >
                      <img src={getFaceUrl(opt)} alt={`respuesta ${opt}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
                <span className="text-md text-black font-medium">En desacuerdo</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navegación por categorías */}
      <div className="flex justify-between mt-8">
        <button
          disabled={categoriaActualIndex === 0}
          onClick={() => setCategoriaActualIndex((i) => i - 1)}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full disabled:opacity-50"
        >
          Anterior
        </button>

        {categoriaActualIndex === categorias.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#EB4B15] text-white rounded-full hover:bg-orange-600"
          >
            Enviar respuestas
          </button>
        ) : (
          <button
            onClick={() => setCategoriaActualIndex((i) => i + 1)}
            className="px-6 py-2 bg-[#EB4B15] text-white rounded-full hover:bg-orange-600"
          >
            Siguiente
          </button>
        )}
      </div>

      {result && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Resultado del Test</h2>
          <p className="text-lg text-gray-700">
            Tu tipo MBTI simulado es: <span className="font-semibold text-[#EB4B15]">{result}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MBTIQuestionPage;
