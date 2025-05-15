import { Users, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#fdf2ec] px-6 py-10">
      <h1 className="text-4xl font-bold text-black mb-4">
        👋 Bienvenido de nuevo
      </h1>

      <p className="text-lg text-gray-700 mb-10">
        Panel de control general para monitorear usuarios, test y reportes. Navega usando el menú lateral para más opciones.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#EB4B15] text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-4">
            <Users className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">Nuevos usuarios</p>
              <p className="text-3xl font-bold">5</p>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-4">
            <FileText className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">Tests completados</p>
              <p className="text-3xl font-bold">12</p>
            </div>
          </div>
        </div>

        <div className="bg-[#E5E5E5] text-black rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-10 h-10 text-[#EB4B15]" />
            <div>
              <p className="text-xl font-semibold">Reportes pendientes</p>
              <p className="text-3xl font-bold">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 text-black rounded-2xl shadow-md p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-[#EB4B15]" />
            <div>
              <p className="text-xl font-semibold">Actividad</p>
              <p className="text-sm text-gray-600">Alta interacción esta semana</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-black mb-4">Resultados MBTI - Esta semana</h2>
        <div className="w-full h-72">
          <BarChart width={600} height={250} data={chartData}>
            <XAxis dataKey="tipo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#EB4B15" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

const chartData = [
  { tipo: 'INTJ', cantidad: 4 },
  { tipo: 'ENFP', cantidad: 3 },
  { tipo: 'ISFJ', cantidad: 2 },
  { tipo: 'ENTP', cantidad: 1 }
];

export default AdminDashboardPage;
