import Card from '@components/Card'

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral text-darkText">
      <Card
        title="Bienvenido a mi proyecto 🚀"
        description="Esta tarjeta usa Tailwind para la estructura y tu ThemeProvider para los estilos globales."
      />
    </div>
  )
}

export default Home
