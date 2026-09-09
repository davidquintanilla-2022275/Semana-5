import { Router } from 'express';
import { agregarProducto } from '../controller/producto.controller';

const router = Router();

router.post('/', agregarProducto);

export default router;