-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2024 a las 01:21:20
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `orocol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `idAdmin` int(11) NOT NULL,
  `cargoAdmin` varchar(60) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`idAdmin`, `cargoAdmin`, `idUsuario`) VALUES
(1, 'Gerente', 1),
(2, 'Supervisor', 3),
(3, 'Supervisor', 5),
(4, 'Jefe de minas', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `IdCliente` int(11) NOT NULL,
  `NombreCompleto` varchar(60) NOT NULL,
  `Empresa` varchar(70) DEFAULT NULL,
  `Pais` varchar(55) NOT NULL,
  `CiudadMunicipio` varchar(80) NOT NULL,
  `FechaExportacion` date NOT NULL,
  `estadoCompra` varchar(15) NOT NULL DEFAULT 'En proceso',
  `IdSalidaVenta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`IdCliente`, `NombreCompleto`, `Empresa`, `Pais`, `CiudadMunicipio`, `FechaExportacion`, `estadoCompra`, `IdSalidaVenta`) VALUES
(1, 'Timothy Jhohanson MacBench', 'Gator Corporation', 'Perú', 'Lima', '2023-12-15', 'Terminada', 1),
(2, 'Juan Manuel Hernandez Cabrera', 'GoldSocial', 'Colombia', 'Tolima', '2023-02-14', 'En proceso', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradaventas`
--

CREATE TABLE `entradaventas` (
  `idGestionVenta` int(11) NOT NULL,
  `fechaExtraccionOro` date NOT NULL,
  `precioOro` float NOT NULL,
  `cantidad` float NOT NULL,
  `estadoVenta` varchar(15) NOT NULL DEFAULT 'Activo',
  `IdMinero` int(11) DEFAULT NULL,
  `IdProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `entradaventas`
--

INSERT INTO `entradaventas` (`idGestionVenta`, `fechaExtraccionOro`, `precioOro`, `cantidad`, `estadoVenta`, `IdMinero`, `IdProducto`) VALUES
(1, '2023-10-04', 7500000, 450, 'Activo', 1, 2),
(2, '2023-10-05', 7000000, 400, 'Activo', 2, 1),
(3, '2023-10-06', 7000000, 400, 'Inactivo', 3, 1),
(4, '2023-10-07', 8000000, 450, 'Activo', 3, 3),
(5, '2023-10-09', 9000000, 500, 'Activo', 4, 8),
(6, '2023-10-10', 7000000, 400, 'Activo', 4, 11),
(7, '2023-10-11', 7000000, 400, 'Activo', 2, 11),
(8, '2023-10-10', 9000000, 500, 'Activo', 4, 8),
(9, '2023-10-28', 8000000, 500, 'Activo', 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mineros`
--

CREATE TABLE `mineros` (
  `IdMinero` int(11) NOT NULL,
  `tipo_documento` varchar(30) NOT NULL,
  `numero_documento` int(20) NOT NULL,
  `cambio_documento` varchar(15) NOT NULL,
  `telefono` mediumint(9) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion_vivienda` varchar(55) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `mineros`
--

INSERT INTO `mineros` (`IdMinero`, `tipo_documento`, `numero_documento`, `cambio_documento`, `telefono`, `fecha_nacimiento`, `direccion_vivienda`, `idUsuario`) VALUES
(1, 'Cedula de ciudadania', 1012587523, 'Acepto', 3212564, '1993-10-15', 'cra 102 #45-46', 2),
(2, 'Cedula de ciudadania', 1332778599, 'No acepto', 3186279, '1987-12-08', 'Transversal 1b este # 81d 84 sur', 4),
(3, 'Cedula de Extranjeria', 1312587790, 'Acepto', 3182777, '1996-08-12', 'Av C.Cali #64 sur', 6),
(4, 'Cedula de ciudadania', 1032678564, 'No acepto', 3186279, '2006-01-25', 'Transversal 1b este #81d 84 sur', 8),
(5, 'Cedula de Extranjeria', 1234567855, 'Acepto', 3188607, '1994-04-25', 'Calle Principal 123', 9),
(6, 'Cedula de ciudadania', 1398765432, 'No acepto', 3183607, '1987-10-14', 'Avenida Central 456', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `idNovedad` int(11) NOT NULL,
  `fechaNovedad` date NOT NULL,
  `descripcion` text NOT NULL,
  `IdMinero` int(11) DEFAULT NULL,
  `idAdmin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `idPerfil` int(11) NOT NULL,
  `fotoPerfil` varchar(255) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`idPerfil`, `fotoPerfil`, `idUsuario`) VALUES
(12, '/uploads/2_6277e2b5.jpg', 2),
(13, '/uploads/3_FWi76tMVUAE4rNN.jpg', 3),
(14, '/uploads/1_sennior.jpg', 1),
(15, '/uploads/4_minerodos.jpg', 4),
(16, '/uploads/5_leonnesajdsnw.jpg', 5),
(17, '/uploads/6_fondo_perfil.jpg', 6),
(18, '/uploads/7_Alex Gamez.jpg', 7),
(19, '/uploads/8_mifoto - copia.jpeg', 8),
(20, '/uploads/10_4556seora.jpg', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `IdProducto` int(11) NOT NULL,
  `TipoOro` varchar(60) NOT NULL,
  `estadoProducto` varchar(15) NOT NULL DEFAULT 'Disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`IdProducto`, `TipoOro`, `estadoProducto`) VALUES
(1, 'Oro de 24 quilates', 'Disponible'),
(2, 'Oro de 22 quilates', 'Disponible'),
(3, 'Oro de 18 quilates', 'Disponible'),
(8, 'Oro de 14 quilates', 'Disponible'),
(9, 'Oro de 10 quilates', 'Disponible'),
(10, 'Oro de 20 quilates', 'Disponible'),
(11, 'Oro de 28 quilates', 'Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `tipoRol` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `tipoRol`) VALUES
(1, 'Administrador'),
(2, 'Minero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidaventas`
--

CREATE TABLE `salidaventas` (
  `IdSalidaVenta` int(11) NOT NULL,
  `PesogrOro` float NOT NULL,
  `idGestionVenta` int(11) DEFAULT NULL,
  `idAdmin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `salidaventas`
--

INSERT INTO `salidaventas` (`IdSalidaVenta`, `PesogrOro`, `idGestionVenta`, `idAdmin`) VALUES
(1, 5, 1, 1),
(2, 6, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnominero`
--

CREATE TABLE `turnominero` (
  `idTurno` int(11) NOT NULL,
  `FechaTurno` datetime NOT NULL,
  `Asistencia` varchar(15) NOT NULL,
  `AsignacionTareas` varchar(255) NOT NULL,
  `IdMinero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `turnominero`
--

INSERT INTO `turnominero` (`idTurno`, `FechaTurno`, `Asistencia`, `AsignacionTareas`, `IdMinero`) VALUES
(1, '2023-01-12 13:00:00', 'Nó asistió', 'Recolección de oro', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(60) NOT NULL,
  `apellidosUsuario` varchar(60) DEFAULT NULL,
  `correoUsuario` varchar(70) NOT NULL,
  `passwordUsuario` varchar(60) NOT NULL,
  `estadoUsuario` varchar(55) NOT NULL DEFAULT 'activo',
  `idRol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `apellidosUsuario`, `correoUsuario`, `passwordUsuario`, `estadoUsuario`, `idRol`) VALUES
(1, 'Andres Manuel', 'Hernandez Cantillo', 'hernandez@gmail.com', '$2a$10$1Yak0tfIQOVh1JYyOw4Ip.OEfqgTU89StEB4qM3nC6ZwD75P.W7.m', 'activo', 1),
(2, 'Alezander Antonio', 'Velazco', 'alexV@gmail.com', '$2a$10$/eI7tUIVItug.pueoIEY4.3nzc82I8QqWS/62rzjHu37RIVo0/8sa', 'activo', 2),
(3, 'Jesus Alvarez', 'Sierra Daza', 'jesusSierra@gmail.com', '$2a$10$mXm6KLuo26wqW.AiFHS9seaJUZk7TGYD0MzZZgnOFOEnQIST8hZ3y', 'activo', 1),
(4, 'Anderson Manuel', 'Perez Silva', 'Anders@gmail.com', '$2a$10$GHRSqaLvJBnkYCyiB9Y2CuhQ/KlLHPWbVy.rXYP6INHtO.BNs5lxi', 'activo', 2),
(5, 'Felipe Montes', 'Brievich Gomez', 'felipeMZ@gmail.com', '$2a$10$qN9SHFO5nr99JtkkiH6oSuOtomOeAjKSo7vHOuRnvkJawxtxhJeJS', 'activo', 1),
(6, 'Brenton Para', 'Casillas Aguilar', 'brentP@gmail.com', '$2a$10$9klsiKIRz61NtZuqaYrgyOlhIUrjhYTlJQyN17EKZUL0gmycpyqh2', 'activo', 2),
(7, 'Bernabe Alex', 'Gamez Prieto', 'alexisGe@gmail.com', '$2a$10$tEGOpI.R2MRei0twimhiRO0FYRowrL0gGzikbT0DGuNIPRBCcOUIG', 'activo', 1),
(8, 'Joshua Sebastian', 'Cruz Fierro', 'joshuacruz@gmail.com', '$2a$10$3d7ydTiupaEVXlU44f6HROFiK.bMRwn8CQYm7HVdEvrwMuAowNsi2', 'activo', 2),
(9, 'Juan Santiago', 'García Perez', 'juan.garcia@gmail.com', '$2a$10$PwuyccOxLUqE/9ceTP9hXe4WNLKELuHTW85Irug7mHi1RnnHpaP.S', 'activo', 2),
(10, 'María José', 'López Martínez', 'marialopez@gmail.com', '$2a$10$9zTxtGP.Ll9xGw9kIt9ZmeuJFDO6WfV6.7qGX0dW/FMQdyvwVv8C.', 'activo', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `REL_f45422a1a894630e78e3d50ee5` (`idUsuario`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`IdCliente`),
  ADD KEY `FK_a9fb8ed978ec5dd0c6b6d7910f9` (`IdSalidaVenta`);

--
-- Indices de la tabla `entradaventas`
--
ALTER TABLE `entradaventas`
  ADD PRIMARY KEY (`idGestionVenta`),
  ADD KEY `FK_4ddd803d124eab4737574c6fd28` (`IdMinero`),
  ADD KEY `FK_18880bb9912c448ed634004c246` (`IdProducto`);

--
-- Indices de la tabla `mineros`
--
ALTER TABLE `mineros`
  ADD PRIMARY KEY (`IdMinero`),
  ADD UNIQUE KEY `IDX_c6b696c2c925d4a3a44346a211` (`numero_documento`),
  ADD UNIQUE KEY `REL_3288e274d9bbffa27ba2b73166` (`idUsuario`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`idNovedad`),
  ADD KEY `FK_6958f40b5c32e5c2475960ff65a` (`IdMinero`),
  ADD KEY `FK_b40c5ecba6b17e41c8626152939` (`idAdmin`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`idPerfil`),
  ADD UNIQUE KEY `REL_b35ce50c61b2e3923fb284890a` (`idUsuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`IdProducto`),
  ADD UNIQUE KEY `IDX_ba435b76cb32a9f8707ada766d` (`TipoOro`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `salidaventas`
--
ALTER TABLE `salidaventas`
  ADD PRIMARY KEY (`IdSalidaVenta`),
  ADD UNIQUE KEY `REL_12d42c21ebcbf734d5711b9f5c` (`idGestionVenta`),
  ADD KEY `FK_f4be3836c66b17be5f229bffeba` (`idAdmin`);

--
-- Indices de la tabla `turnominero`
--
ALTER TABLE `turnominero`
  ADD PRIMARY KEY (`idTurno`),
  ADD KEY `FK_872224d1429bd72b4f4f1df6932` (`IdMinero`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `IDX_63b005ad37462db6f8736b95fe` (`correoUsuario`),
  ADD KEY `FK_6776507c41374cd8f2247d1c185` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `entradaventas`
--
ALTER TABLE `entradaventas`
  MODIFY `idGestionVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `mineros`
--
ALTER TABLE `mineros`
  MODIFY `IdMinero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `idNovedad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `idPerfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `IdProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `salidaventas`
--
ALTER TABLE `salidaventas`
  MODIFY `IdSalidaVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `turnominero`
--
ALTER TABLE `turnominero`
  MODIFY `idTurno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `FK_f45422a1a894630e78e3d50ee58` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `FK_a9fb8ed978ec5dd0c6b6d7910f9` FOREIGN KEY (`IdSalidaVenta`) REFERENCES `salidaventas` (`IdSalidaVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `entradaventas`
--
ALTER TABLE `entradaventas`
  ADD CONSTRAINT `FK_18880bb9912c448ed634004c246` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4ddd803d124eab4737574c6fd28` FOREIGN KEY (`IdMinero`) REFERENCES `mineros` (`IdMinero`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mineros`
--
ALTER TABLE `mineros`
  ADD CONSTRAINT `FK_3288e274d9bbffa27ba2b73166d` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD CONSTRAINT `FK_6958f40b5c32e5c2475960ff65a` FOREIGN KEY (`IdMinero`) REFERENCES `mineros` (`IdMinero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b40c5ecba6b17e41c8626152939` FOREIGN KEY (`idAdmin`) REFERENCES `administradores` (`idAdmin`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `FK_b35ce50c61b2e3923fb284890a8` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `salidaventas`
--
ALTER TABLE `salidaventas`
  ADD CONSTRAINT `FK_12d42c21ebcbf734d5711b9f5c0` FOREIGN KEY (`idGestionVenta`) REFERENCES `entradaventas` (`idGestionVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f4be3836c66b17be5f229bffeba` FOREIGN KEY (`idAdmin`) REFERENCES `administradores` (`idAdmin`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `turnominero`
--
ALTER TABLE `turnominero`
  ADD CONSTRAINT `FK_872224d1429bd72b4f4f1df6932` FOREIGN KEY (`IdMinero`) REFERENCES `mineros` (`IdMinero`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_6776507c41374cd8f2247d1c185` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
