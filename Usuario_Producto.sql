Create database actividad2;
use actividad2;

create table usuario (
	id_usuario int auto_increment primary key,
    nombre varchar (100) not null,
    usuario varchar (100) not null,
    contrasena varchar (100) not null,
    correo varchar (100) not null
);

create table producto (
	id_producto int auto_increment primary key,
    nombre varchar (100),
    descripcion varchar (225),
    precio int not null,
    categoria varchar (100) not null,
    stock int not null
);

delimiter //
-- =============================================
-- PROCEDIMIENTOS PARA LA TABLA: producto
-- =============================================

-- 1. Crear Producto
create procedure sp_InsertarProducto(
    in p_nombre varchar(100),
    in p_descripcion varchar(225),
    in p_precio int,
    in p_categoria varchar(100),
    in p_stock int
)
begin
    insert into producto (nombre, descripcion, precio, categoria, stock)
    values (p_nombre, p_descripcion, p_precio, p_categoria, p_stock);
end //

-- prducto
call sp_InsertarProducto('Laptop Pro 15', 'Laptop de alto rendimiento 16GB RAM', 1200, 'Electrónica', 15);
call sp_InsertarProducto('Mouse Inalámbrico', 'Mouse ergonómico Bluetooth', 25, 'Accesorios', 50);
call sp_InsertarProducto('Teclado Mecánico', 'Teclado RGB con switches azules', 75, 'Accesorios', 30);
call sp_InsertarProducto('Monitor 27 Pulgadas', 'Monitor 4K IPS tasa de refresco 144Hz', 350, 'Electrónica', 10);
call sp_InsertarProducto('Silla Ergonómica', 'Silla de oficina soporte lumbar', 180, 'Mobiliario', 20);