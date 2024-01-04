-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-01-2024 a las 00:35:32
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
  `cargoAdmin` varchar(255) NOT NULL,
  `IdUs_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`idAdmin`, `cargoAdmin`, `IdUs_FK`) VALUES
(1, 'Gerente', 1),
(2, 'Supervisor', 3),
(3, 'Supervisor', 5),
(4, 'Supervisor', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `IdCliente` int(11) NOT NULL,
  `NombreCompleto` varchar(255) NOT NULL,
  `Empresa` varchar(255) DEFAULT NULL,
  `Pais` varchar(255) NOT NULL,
  `CiudadMunicipio` varchar(255) NOT NULL,
  `FechaExportacion` date NOT NULL,
  `estadoCompra` varchar(15) NOT NULL DEFAULT 'Activo',
  `IdSalidaEV_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`IdCliente`, `NombreCompleto`, `Empresa`, `Pais`, `CiudadMunicipio`, `FechaExportacion`, `estadoCompra`, `IdSalidaEV_FK`) VALUES
(1, 'Timothy Jhohanson MacBech', 'Gator Corporation', 'Perú', 'Lima', '2023-12-16', 'Activo', 1),
(2, 'Juan Manuel Hernandez Cabrera', 'GoldSocial', 'Colombia', 'Tolima', '2023-02-15', 'Activo', 2),
(3, 'Andres Manuel Lopez Obrador', 'MexiJoyas', 'México', 'Ciudad de México', '2023-12-19', 'Activo', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradaventas`
--

CREATE TABLE `entradaventas` (
  `idGestionVenta` int(11) NOT NULL,
  `fechaExtraccionOro` date NOT NULL,
  `precioOro` mediumint(9) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estadoVenta` varchar(15) NOT NULL DEFAULT 'Activo',
  `mineroId` int(11) DEFAULT NULL,
  `productoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `entradaventas`
--

INSERT INTO `entradaventas` (`idGestionVenta`, `fechaExtraccionOro`, `precioOro`, `cantidad`, `estadoVenta`, `mineroId`, `productoId`) VALUES
(1, '2023-05-13', 1500000, 15, 'Activo', 1, 1),
(2, '2023-10-22', 1200000, 5, 'Activo', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mineros`
--

CREATE TABLE `mineros` (
  `IdMinero` int(11) NOT NULL,
  `tipo_documento` varchar(22) NOT NULL,
  `numero_documento` bigint(20) NOT NULL,
  `cambio_documento` varchar(15) NOT NULL,
  `telefono` mediumint(9) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion_vivienda` varchar(255) NOT NULL,
  `IdUs_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `mineros`
--

INSERT INTO `mineros` (`IdMinero`, `tipo_documento`, `numero_documento`, `cambio_documento`, `telefono`, `fecha_nacimiento`, `direccion_vivienda`, `IdUs_FK`) VALUES
(1, 'Cedula de ciudadania', 1012587523, 'Acepto', 3212564, '1993-10-15', 'cra 102 #45-46', 2),
(2, 'Cedula de ciudadania', 1332778599, 'No acepto', 3186279, '1987-12-08', 'Transversal 1b este # 81d 84 sur', 4),
(3, 'Cedula de ciudadania', 1312587790, 'Acepto', 3182777, '1996-08-12', 'Av C.Cali #64 sur', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `idNovedad` int(11) NOT NULL,
  `fechaNovedad` date NOT NULL,
  `descripcion` text NOT NULL,
  `IdMinN_FK` int(11) DEFAULT NULL,
  `IdAdminN_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`idNovedad`, `fechaNovedad`, `descripcion`, `IdMinN_FK`, `IdAdminN_FK`) VALUES
(1, '2023-11-30', 'No pude cumplir con mi horario de trabajo por calamidad domestica.', 1, 2),
(2, '2023-07-17', 'No cumple con el horario de trabajo', 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `IdProducto` int(11) NOT NULL,
  `TipoOro` varchar(255) NOT NULL,
  `estadoProducto` varchar(15) NOT NULL DEFAULT 'Disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`IdProducto`, `TipoOro`, `estadoProducto`) VALUES
(1, 'oro amarillo', 'Disponible'),
(2, 'oro amarillo', 'Disponible');

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
(2, 'Minero'),
(3, 'Administrador'),
(4, 'Minero'),
(5, 'Administrador'),
(6, 'Minero'),
(7, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidaventas`
--

CREATE TABLE `salidaventas` (
  `IdSalidaVenta` int(11) NOT NULL,
  `PesogrOro` float NOT NULL,
  `IdProdSV` int(11) DEFAULT NULL,
  `IdAdminEV_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `salidaventas`
--

INSERT INTO `salidaventas` (`IdSalidaVenta`, `PesogrOro`, `IdProdSV`, `IdAdminEV_FK`) VALUES
(1, 2.8, 1, 2),
(2, 8, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnominero`
--

CREATE TABLE `turnominero` (
  `idTurno` int(11) NOT NULL,
  `FechaTurno` datetime NOT NULL,
  `Asistencia` varchar(15) NOT NULL,
  `AsignacionTareas` varchar(255) NOT NULL,
  `IdMinT_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `turnominero`
--

INSERT INTO `turnominero` (`idTurno`, `FechaTurno`, `Asistencia`, `AsignacionTareas`, `IdMinT_FK`) VALUES
(1, '2023-01-12 13:00:00', 'Nó asistió', 'Recolección de oro', 1),
(2, '2023-01-12 07:00:00', 'Sí asistió', 'Carga de materiales', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(255) NOT NULL,
  `apellidosUsuario` varchar(255) DEFAULT NULL,
  `correoUsuario` varchar(255) NOT NULL,
  `passwordUsuario` varchar(255) NOT NULL,
  `estadoUsuario` varchar(55) NOT NULL DEFAULT 'activo',
  `IdUs_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `apellidosUsuario`, `correoUsuario`, `passwordUsuario`, `estadoUsuario`, `IdUs_FK`) VALUES
(1, 'Andres Manuel', 'Hernandez Castillo', 'hernandez@gmail.com', '0125478N', 'activo', NULL),
(2, 'Alezander Antonio', 'Velazco', 'alexV@gmail.com', '15872L6i', 'activo', NULL),
(3, 'Jesus Alvarez', 'Sierra Daza', 'JesusSD@gmail.com', '456985L', 'activo', NULL),
(4, 'Anderson', 'Perez Silva', 'Anders@gmail.com', '046543h1', 'activo', NULL),
(5, 'Felipe montez', 'Brievich Gomez', 'FelipeMZ@gmail.com', '235687X7', 'activo', NULL),
(6, 'Brenton parra', 'Casillas', 'BrentP@gmail.com', '46432132q', 'activo', NULL),
(7, 'Bernabe Alex', 'Gamez', 'AlexisG@gmail.com', 'slpk1245Z', 'activo', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`idAdmin`),
  ADD KEY `FK_6dff517e229af951e43ea33a5ad` (`IdUs_FK`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`IdCliente`),
  ADD KEY `FK_016458eaa1347ef62dd35238f20` (`IdSalidaEV_FK`);

--
-- Indices de la tabla `entradaventas`
--
ALTER TABLE `entradaventas`
  ADD PRIMARY KEY (`idGestionVenta`),
  ADD KEY `FK_c1becf60a403e779fb391392887` (`mineroId`),
  ADD KEY `FK_9590e24cf99b59b0a928a2205c6` (`productoId`);

--
-- Indices de la tabla `mineros`
--
ALTER TABLE `mineros`
  ADD PRIMARY KEY (`IdMinero`),
  ADD KEY `FK_c1f749173f0cee7c24d5928aa3c` (`IdUs_FK`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`idNovedad`),
  ADD KEY `FK_4a3f13015c249307343c1ed0c53` (`IdMinN_FK`),
  ADD KEY `FK_e55fb91d37f8bd053910662c868` (`IdAdminN_FK`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`IdProducto`);

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
  ADD KEY `FK_ad8004f69f0037896cee993dada` (`IdProdSV`),
  ADD KEY `FK_5c3ceea4ad2d2bf333757bac282` (`IdAdminEV_FK`);

--
-- Indices de la tabla `turnominero`
--
ALTER TABLE `turnominero`
  ADD PRIMARY KEY (`idTurno`),
  ADD KEY `FK_f4faa92902993a0ad8ecc5c9eaf` (`IdMinT_FK`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `IDX_63b005ad37462db6f8736b95fe` (`correoUsuario`),
  ADD KEY `FK_8f76c93f47a7da3bc963dee7472` (`IdUs_FK`);

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
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `entradaventas`
--
ALTER TABLE `entradaventas`
  MODIFY `idGestionVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mineros`
--
ALTER TABLE `mineros`
  MODIFY `IdMinero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `idNovedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `IdProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `salidaventas`
--
ALTER TABLE `salidaventas`
  MODIFY `IdSalidaVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `turnominero`
--
ALTER TABLE `turnominero`
  MODIFY `idTurno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `FK_6dff517e229af951e43ea33a5ad` FOREIGN KEY (`IdUs_FK`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `FK_016458eaa1347ef62dd35238f20` FOREIGN KEY (`IdSalidaEV_FK`) REFERENCES `salidaventas` (`IdSalidaVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `entradaventas`
--
ALTER TABLE `entradaventas`
  ADD CONSTRAINT `FK_9590e24cf99b59b0a928a2205c6` FOREIGN KEY (`productoId`) REFERENCES `productos` (`IdProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c1becf60a403e779fb391392887` FOREIGN KEY (`mineroId`) REFERENCES `mineros` (`IdMinero`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mineros`
--
ALTER TABLE `mineros`
  ADD CONSTRAINT `FK_c1f749173f0cee7c24d5928aa3c` FOREIGN KEY (`IdUs_FK`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD CONSTRAINT `FK_4a3f13015c249307343c1ed0c53` FOREIGN KEY (`IdMinN_FK`) REFERENCES `mineros` (`IdMinero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e55fb91d37f8bd053910662c868` FOREIGN KEY (`IdAdminN_FK`) REFERENCES `administradores` (`idAdmin`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `salidaventas`
--
ALTER TABLE `salidaventas`
  ADD CONSTRAINT `FK_5c3ceea4ad2d2bf333757bac282` FOREIGN KEY (`IdAdminEV_FK`) REFERENCES `administradores` (`idAdmin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ad8004f69f0037896cee993dada` FOREIGN KEY (`IdProdSV`) REFERENCES `productos` (`IdProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `turnominero`
--
ALTER TABLE `turnominero`
  ADD CONSTRAINT `FK_f4faa92902993a0ad8ecc5c9eaf` FOREIGN KEY (`IdMinT_FK`) REFERENCES `mineros` (`IdMinero`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_8f76c93f47a7da3bc963dee7472` FOREIGN KEY (`IdUs_FK`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
