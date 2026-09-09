import * as mysql from "mysql2/promise";

export const conexion = mysql.createPool({
    host: "localhost",
    user: "IN5CM",
    password: "?donmoA5m@",
    database: "actividad2_IN5CM",
    waitForConnections: true,
    connectionLimit: 10
});

export const probarConexion = async () => {
    try {
        const conexionPrueba = await conexion.getConnection();

        console.log("Conexión a MySQL establecida correctamente");

        conexionPrueba.release();
    } catch (error) {
        console.error("Error al conectar con MySQL:", error);
    }
};