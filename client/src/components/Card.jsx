import { useTheme } from 'styled-components'

const Card = ({ title, description }) => {
  const theme = useTheme()

  return (
    <div
      className="rounded-4xl p-6 shadow-soft transition-all duration-300 hover:shadow-medium"
      style={{
        backgroundColor: theme.colors.neutral,
        color: theme.colors.text,
        boxShadow: theme.boxShadow.soft,
      }}
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-base">{description}</p>
    </div>
  )
}

export default Card
