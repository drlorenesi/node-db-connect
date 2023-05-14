-- Create Test Database
USE master;
GO
DROP DATABASE IF EXISTS testDB;
GO
CREATE DATABASE testDB;
GO
USE testDB;
GO

-- Crear tabla de niveles de usuarios
-- IDENTITY [ (seed , increment) ]
DROP TABLE IF EXISTS nivel_usuario;
GO
CREATE TABLE nivel_usuario(
	nivel_id TINYINT PRIMARY KEY IDENTITY(1,1),
	descripcion VARCHAR(50) NOT NULL
);
INSERT INTO nivel_usuario
    (descripcion)
VALUES
    ('Administrador'),
	('Usuario General');
GO

-- Crear tabla de usuarios web
DROP TABLE IF EXISTS usuarios_web;
GO
CREATE TABLE usuarios_web (
    usuario_id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,
	nivel_id TINYINT FOREIGN KEY REFERENCES nivel_usuario(nivel_id) DEFAULT 2,
    activo CHAR(32) DEFAULT NULL,
    fecha_registro DATETIME DEFAULT GETDATE(),
);
GO
INSERT INTO usuarios_web
    (nombre, apellido, email, pass)
VALUES
    ('John', 'Doe', 'johnd@gmail.com', '1234'),
    ('Jane', 'Doe', 'janed@gmail.com', '12345'),
    ('Mark', 'Test', 'test@gmail.com', '123456');
GO