-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-02-2024 a las 16:19:12
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
(4, 'Supervisor', 7),
(5, 'Supervisor', 11);

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
  `estadoCompra` varchar(15) NOT NULL DEFAULT 'Activo',
  `IdSalidaVenta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`IdCliente`, `NombreCompleto`, `Empresa`, `Pais`, `CiudadMunicipio`, `FechaExportacion`, `estadoCompra`, `IdSalidaVenta`) VALUES
(1, 'Juan Manuel Hernandez Cabrera', 'GoldSocial', 'Colombia', 'Tolima', '2023-02-15', 'Activo', 2),
(2, 'Juan Manuel Hernandez Cabrera', 'GoldSocial', 'Colombia', 'Tolima', '2023-02-15', 'Activo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradaventas`
--

CREATE TABLE `entradaventas` (
  `idGestionVenta` int(11) NOT NULL,
  `fechaExtraccionOro` date NOT NULL,
  `precioOro` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estadoVenta` varchar(15) NOT NULL DEFAULT 'Activo',
  `IdMinero` int(11) DEFAULT NULL,
  `IdProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `entradaventas`
--

INSERT INTO `entradaventas` (`idGestionVenta`, `fechaExtraccionOro`, `precioOro`, `cantidad`, `estadoVenta`, `IdMinero`, `IdProducto`) VALUES
(1, '2023-10-03', 9000000, 500, 'Activo', 1, 1),
(2, '2023-10-05', 7000000, 400, 'Activo', 2, 2),
(3, '2023-10-09', 10000000, 700, 'Activo', 1, 3),
(4, '2023-10-09', 10000000, 700, 'Activo', 1, 3),
(5, '2023-10-09', 9000000, 500, 'Activo', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mineros`
--

CREATE TABLE `mineros` (
  `IdMinero` int(11) NOT NULL,
  `tipo_documento` varchar(30) NOT NULL,
  `numero_documento` bigint(20) NOT NULL,
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
(3, 'Cedula de ciudadania', 1312587790, 'Acepto', 3182777, '1996-08-12', 'Av C.Cali #64 sur', 6),
(4, 'Cedula de ciudadania', 1032678006, 'Acepto', 8388607, '2006-01-25', 'Transversal 1b este #81d 84 sur', 10);

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

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`idNovedad`, `fechaNovedad`, `descripcion`, `IdMinero`, `idAdmin`) VALUES
(1, '2023-11-30', 'No pude cumplir con mi horario de trabajo por calamidad domestica.', 1, 1),
(2, '2023-07-17', 'No cumple con el horario de trabajo', 2, 2);

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
(4, 'Oro de 14 quilates', 'Disponible'),
(5, 'Oro de 10 quilates', 'Disponible');

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
(1, 5.1, 1, 1),
(2, 6.2, 2, 2);

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
(1, '2023-01-12 13:00:00', 'Nó asistió', 'Recolección de oro', 1),
(2, '2023-01-12 07:00:00', 'Sí asistió', 'Carga de materiales', 2);

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
(1, 'Andres Manuel', 'Hernandez Castillo', 'hernandez@gmail.com', '$2a$10$gcmqwb.SnhjuRRMrUE5bWeY.KBYPzpeHvIcEAvXjUaV1sSVnTcRBO', 'activo', 1),
(2, 'Alezander Antonio', 'Velazco', 'alexV@gmail.com', '$2a$10$b.QIKrwQPqDADWWg0nizGOaPaSpKhRGdqF.xV/dswOT5Uo4uqjZmO', 'activo', 2),
(3, 'Jesus Alvarez', 'Sierra Daza', 'JesusSD@gmail.com', '$2a$10$PGX9jyNwNFxOQ12zjCB2NuLR8xpSD61nDF6.3zzf9S.NGBAJx4cou', 'activo', 1),
(4, 'Joshua Santiago', 'Cruz Fierro', 'Santicruz@gmail.com', '$2a$10$jyLibU4YAkVROx6BCHiDo.P/QFRNLKBuBepT9CcM3HnuV1KkcU/O2', 'activo', 2),
(5, 'Felipe montez', 'Brievich Gomez', 'FelipeMZ@gmail.com', '$2a$10$9THMWi4TwxdgHgF8Q59.p.Jxp7Z8S2ZgpZZbMRk0Wk6wzzIsIisYO', 'activo', 1),
(6, 'Brenton parra', 'Casillas', 'BrentP@gmail.com', '$2a$10$R9KnEyz94i9DpTWujWJQU.ntm07we2msnI757OAJ6wXJ6N.oqdeK.', 'activo', 2),
(7, 'Bernabe Alex', 'Gamez', 'AlexisG@gmail.com', '$2a$10$iMo.spvHY7Th.OE2qZi8uOrnrRxLR9BcOBf6A3l0je6v0MKiixJQu', 'activo', 1),
(10, 'Joshua Sebastian', 'Cruz Fierro', 'joshuacruz@gmail.com', '$2a$10$Q7CKUMCbWDv6vQfHcvMTH.WbPtoTTA9vDYNVnIlM9mZsUv5yT3vAy', 'activo', 2),
(11, 'Angelina Marcela', 'Cruz Fierro', 'amcruzf04@gmail.com', '$2a$10$VrnLHf3liGIJypj9j/0FCe.85ndtX0GVOxpE4TSnr7YMm.Ox7yzgi', 'activo', 1);

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
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `entradaventas`
--
ALTER TABLE `entradaventas`
  MODIFY `idGestionVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mineros`
--
ALTER TABLE `mineros`
  MODIFY `IdMinero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `idNovedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `IdProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `salidaventas`
--
ALTER TABLE `salidaventas`
  MODIFY `IdSalidaVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `turnominero`
--
ALTER TABLE `turnominero`
  MODIFY `idTurno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
