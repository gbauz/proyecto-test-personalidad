import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './my-page/backend/routes/authRoutes.js';
import cors from 'cors'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
  console.log('gola');
});
