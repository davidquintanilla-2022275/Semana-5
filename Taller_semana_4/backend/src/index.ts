import express from 'express';
import cors from 'cors';
import { probarConexion } from './config/database';
import productoRoutes from './routes/producto.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    probarConexion();
});