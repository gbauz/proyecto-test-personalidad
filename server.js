import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// import router from './my-page/backend/routes/index';
import cors from 'cors';
import router from './my-page/backend/routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear carpetas para uploads y temp si no existen
const uploadDirs = [
  path.join(__dirname, 'uploads'),
  path.join(__dirname, 'uploads', 'fotos'),
  path.join(__dirname, 'uploads', 'cv'),
  path.join(__dirname, 'temp'),
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Carpeta creada: ${dir}`);
  }
});

app.use(express.json());
app.use(cors());

// Servir archivos estáticos (fotos, currículums)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('api/')
// app.use('/api/auth', authRoutes);
// app.use('/api/test', authRoutes)
app.use('/api', router); // todo va por /api


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
