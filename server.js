import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Ruta de la API
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hola desde el backend de Express!' });
});

// Middleware para servir archivos estáticos
app.use(express.static(path.join(process.cwd(), 'client/dist')));

// Manejar todas las demás rutas para el SPA (React)
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
