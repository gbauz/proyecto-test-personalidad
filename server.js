import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './my-page/backend/routes/authRoutes.js'; // 👈 agrega extensión .js

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
