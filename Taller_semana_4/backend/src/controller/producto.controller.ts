import { Request, Response } from 'express';
import { conexion } from '../config/database';

export const agregarProducto = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, precio, categoria, stock } = req.body;

        if (!nombre || !descripcion || precio === undefined || !categoria || stock === undefined) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const sql = `
            INSERT INTO producto
            (nombre, descripcion, precio, categoria, stock)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [resultado] = await conexion.execute(sql, [
            nombre,
            descripcion,
            precio,
            categoria,
            stock
        ]);

        res.status(201).json({
            mensaje: 'Producto agregado correctamente',
            producto: {
                id_producto: (resultado as any).insertId,
                nombre,
                descripcion,
                precio,
                categoria,
                stock
            }
        });

    } catch (error) {
        console.error('Error al agregar producto:', error);

        res.status(500).json({
            mensaje: 'Error al agregar el producto'
        });
    }
};