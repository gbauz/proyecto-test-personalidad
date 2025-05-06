
const Landing = () => {
  return (
    <div className="min-h-screen text-white">

    {/* Hero Section */}
<section  
  className="bg-cover bg-no-repeat text-white px-6 rounded-[24px] m-4"
  style={{ 
    backgroundImage: 'url(/imagenes/FondoHero.png)', 
     
    paddingBottom: '180px' 
  }}
>
    {/* Navbar inside Hero Section */}
    <div className="max-w-screen-xl mx-auto flex justify-between items-center py-8">
          {/* Logo */}
          <div className="text-3xl font-extrabold">
            <span className="text-white">Humanize</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8">
            <a href="#" className="hover:text-gray-400">Inicio</a>
            <a href="#" className="hover:text-gray-400">Caracteristicas</a>
            <a href="#" className="hover:text-gray-400">Casos de Estudio</a>
            <a href="#" className="hover:text-gray-400">Blogs</a>
            <a href="#" className="hover:text-gray-400">Careers</a>
          </div>

          {/* Contact Button */}
          <div>
            <button className="bg-[#EB4B15] text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
              Iniciar Sesión
            </button>
          </div>
        </div>
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left Side */}
    <div>
      <h1 className="text-4xl font-extrabold mb-4 text-white " style={{ color: '#FFFFFF',paddingTop: '120px', }}>
        Potencia tu equipo con Humanize
      </h1>
      <p className="text-xl mb-6 text-white" style={{ color: '#FFFFFF' }}>
        Descubre el verdadero potencial de tu talento con evaluaciones MBTI precisas. 
        Contrata mejor, lidera con inteligencia y crea equipos más sólidos desde el primer día.
      </p>
      <div className="flex gap-4">
        <button className="bg-[#EB4B15] text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-200">
          Realiza una prueba gratuita
        </button>
        <button className="bg-[#E5E5E5] text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200">
          Solicita una demo
        </button>
      </div>      
    </div>
    
          {/* Right Side - Image */}
          <div className="flex justify-center items-center w-full" style={{paddingTop: '120px'}}>
            <img 
              src="/imagenes/cuadroEstadistico.png" 
              alt="Humanize Image"
              className="w-5/8 h-auto rounded-[24px]" // Asegura que la imagen no se deforme
            />
          </div>
        </div>
    

</section>


      {/* Features Section */}
      <section className="py-20 px-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Características poderosas para potenciar<br /> tus decisiones de<spam className="text-[#EA4711]"> Recursos Humanos</spam>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left: ¿Por qué MBTI Insight? */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">¿Por qué MBTI Insight?</h3>
            <p className="text-gray-600 mb-4">
              No es solo un test. Es una herramienta basada en psicología reconocida, que traduce los tipos de personalidad en estrategias reales de reclutamiento, liderazgo y colaboración.
            </p>
            <p className="text-gray-600">
              MBTI Insight utiliza inteligencia artificial para analizar perfiles de personalidad y sugerir combinaciones ideales dentro de los equipos.
            </p>
          </div>

          <div className="bg-[#FF7A4E] p-8 rounded-lg shadow-lg">
  <h3 className="font-semibold text-white mb-4" style={{ color: '#FFFFFF' }}>Rendimiento en tiempo real</h3>
  <p className="text-white mb-4" style={{ color: '#FFFFFF' }}>
    Visualiza patrones de personalidad por departamento, identifica gaps de comunicación y mejora el clima organizacional con datos accionables.
  </p>
  
</div>




          {/* Right: Vitalidad del equipo */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vitalidad del equipo</h3>
            <p className="text-gray-600 mb-4">
              Sigue la evolución del bienestar de tus equipos en tiempo real y haz ajustes antes de que el conflicto o el burnout afecten el rendimiento.
            </p>
            
          </div>

        </div>
      </section>
    </div>
    
 
);
};

export default Landing;
