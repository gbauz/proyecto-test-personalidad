import { useState } from 'react';

const MBTIQuestionPage = () => {
  const questions = [
    "Haces nuevos amigos con frecuencia.",
    "Te sientes cómodo/a en situaciones sociales.",
    "Prefieres planificar todo con anticipación.",
    "Confías más en tu intuición que en los hechos.",
    "Te resulta fácil empatizar con los demás."
  ];

  const options = [3, 2, 1, 0, -1, -2, -3];
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (questionIndex, value) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const getCircleStyle = (value, selected) => {
    const sizeMap = {
      3: 'w-16 h-16',
      2: 'w-14 h-14',
      1: 'w-12 h-12',
      0: 'w-10 h-10',
      '-1': 'w-12 h-12',
      '-2': 'w-14 h-14',
      '-3': 'w-16 h-16'
    };

    const baseClass = `rounded-full border-4 flex items-center justify-center transition-transform duration-200 overflow-hidden shadow-lg bg-white`;
    const sizeClass = sizeMap[value];
    const ringClass = selected ? ' scale-105 border-[#EB4B15]' : ' border-gray-300';

    return `${baseClass} ${sizeClass} ${ringClass}`;
  };

  const getFaceUrl = (value) => {
    switch (value) {
   case 3:
      return "https://i.ibb.co/hxp3m422/happy.png"; // Muy feliz
    case 2:
      return "https://i.ibb.co/23yrWpP0/smiling.png"; // Feliz
    case 1:
      return "https://i.ibb.co/G4Wx52t2/smile.png"; // Leve sonrisa
    case 0:
      return "https://i.ibb.co/DfWyDM0z/confused.png"; // Neutral
    case -1:
      return "https://i.ibb.co/BVJKw26B/sad-3.png"; // Triste
    case -2:
      return "https://i.ibb.co/rKQ42LN3/sad-face.png"; // Molesto
    case -3:
      return "https://i.ibb.co/Mydqjr61/angry-3.png"; // Muy enojado
    default:
      return "https://cdn-icons-png.flaticon.com/512/6141/6141082.png";
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
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

      {questions.map((q, i) => (
        <div key={i} className="mb-12">
          <p className="text-xl font-semibold text-center text-black mb-6">{q}</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-md text-[#EB4B15] font-medium">De acuerdo</span>
            <div className="flex gap-3">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(i, opt)}
                  className={getCircleStyle(opt, answers[i] === opt)}
                >
                  <img src={getFaceUrl(opt)} alt={`respuesta ${opt}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            <span className="text-md text-black font-medium">En desacuerdo</span>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-[#EB4B15] text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-orange-600 transition-all duration-200"
        >
          Enviar respuestas
        </button>
      </div>

      {result && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Resultado del Test</h2>
          <p className="text-lg text-gray-700">Tu tipo MBTI simulado es: <span className="font-semibold text-[#EB4B15]">{result}</span></p>
        </div>
      )}
    </div>
  );
};

export default MBTIQuestionPage;
