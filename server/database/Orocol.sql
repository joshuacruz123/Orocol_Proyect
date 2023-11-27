create database orocol;
use orocol;

create table usuario
(
IdUsuario bigint unsigned primary key auto_increment,
nombreUsuario varchar(255) not null,
apellidosUsuario varchar (255) null,
correoUsuario varchar(255) not null,
passwordUsuario varchar(255) not null,
estadoUsuario enum('activo','inactivo') default 'activo'
);

create table rol
(
IdRol bigint unsigned primary key auto_increment,
TipoRol enum('Minero','Administrador')not null,
EstadoRol enum('activo','inactivo') default 'activo',
IdUs_FK bigint unsigned not null, foreign key (IdUs_FK) references usuario (IdUsuario)
);

create table Administrador
(
IdAdmin bigint unsigned primary key auto_increment,
CargoAdmin varchar(255) not null,
IdUs_FK bigint unsigned not null, foreign key (IdUs_FK) references usuario (IdUsuario)
);

create table Minero
(
IdMinero bigint unsigned primary key auto_increment,
TipoDoc Enum('Cedula de ciudadania','Cedula de Extranjeria') not null,
NumeroDoc bigint unique not null,
Turno int not null,
Asistencia boolean not null,
Telefono mediumint not null,
AsignacionTareas varchar(255) not null,
FechaNacimiento date not null,
DireccionVivienda varchar(255),
Fechapago date not null,
Novedades varchar(255) null,
FechaNovedad date null,
IdUs_FK bigint unsigned not null, foreign key (IdUs_FK) references usuario (IdUsuario)
);

create table Novedad
(
Id_Novedad bigint unsigned primary key auto_increment,
fecha_Novedad date not null,
descripcion text not null,
IdMINERO bigint unsigned not null, foreign key (IdMINERO) references usuario (IdUsuario),
IdAdmin bigint unsigned not null, foreign key (IdAdmin) references Administrador (IdAdmin)
);
create table GestionVentas
(
Idgestionventa bigint unsigned primary key auto_increment,
fechaExtraccionOro date not null,
precioOro mediumint not null,
cantidad int not null,
EstadoVenta enum('activo','inactivo') default 'activo',
IdMINERO bigint unsigned not null, foreign key (IdMINERO) references usuario (IdUsuario)
);

create table Producto
(
IdProducto bigint unsigned primary key auto_increment,
TipoOro varchar(255)not null,
Estadoproducto enum('activo','inactivo') default 'activo',
Idgestion_FK bigint unsigned not null, foreign key (Idgestion_FK)  references GestionVentas  (Idgestionventa)
);

create table SalidaVenta
(
IdSVenta bigint unsigned primary key auto_increment,
PesogrOro float not null,
IdProducto_FK bigint unsigned not null, foreign key (IdProducto_FK)  references Producto (IdProducto),
IdADMIN_FK bigint unsigned not null, foreign key (IdADMIN_FK)  references Administrador (IdAdmin)
);

create table cliente
(
Idcliente bigint unsigned primary key auto_increment,
NombreCompleto varchar(255) not null,
Empresa varchar(255) null,
Pais varchar(255)not null,
Ciudad_Municipio varchar(255)not null,
Fecha_Exportacion date not null,
IdSalida bigint unsigned not null, foreign key (IdSalida) references SalidaVenta (IdSVenta)
);

/* Registros*/
insert into usuario(IdUsuario,nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,estadoUsuario)
values('1246','Andres Manuel','Hernandez Castillo','hernandez@gmail.com','0125478N','activo');
insert into usuario(IdUsuario,nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,estadoUsuario)
values('4652','Alezander Antonio','Velazco','alexV@gmail.com','15872L6i','activo');
insert into usuario(IdUsuario,nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,estadoUsuario)
values('6556','Jesus Alvarez','Sierra Daza','JesusSD@gmail.com','456985L','activo');
insert into usuario(IdUsuario,nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,estadoUsuario)
values('4482','Anderson ','Perez Silva','Anders@gmail.com','046543h1','activo');
insert into usuario(IdUsuario,nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,estadoUsuario)
values('5100','Felipe montez','Brievich Gomez','FelipeMZ@gmail.com','235687X7','activo');
insert into usuario(IdUsuario,nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,estadoUsuario)
values('0027','Brenton parra','Casillas','BrentP@gmail.com','46432132q','activo');
insert into usuario(IdUsuario,nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,estadoUsuario)
values('0156','Bernabe Alex','Gamez','AlexisG@gmail.com','slpk1245Z','activo');

insert into rol(IdRol,TipoRol,EstadoRol,IdUs_FK)
values('236','Administrador','activo','1246');
insert into rol(IdRol,TipoRol,EstadoRol,IdUs_FK)
values('237','Minero','activo','4652');
insert into rol(IdRol,TipoRol,EstadoRol,IdUs_FK)
values('239','Administrador','activo','4482');
insert into rol(IdRol,TipoRol,EstadoRol,IdUs_FK)
values('240','Minero','activo','5100');
insert into rol(IdRol,TipoRol,EstadoRol,IdUs_FK)
values('241','Administrador','activo','0027');
insert into rol(IdRol,TipoRol,EstadoRol,IdUs_FK)
values('242','Minero','activo','6556');
insert into rol(IdRol,TipoRol,EstadoRol,IdUs_FK)
values('243','Administrador','activo','0156');

SET FOREIGN_KEY_CHECKS=0;

insert into Administrador(IdAdmin,CargoAdmin,IdUs_FK)
values('136','Administracion del sistema','1246');
insert into Administrador(IdAdmin,CargoAdmin,IdUs_FK)
values('137','Administracion del sistema','4652');
insert into Administrador(IdAdmin,CargoAdmin,IdUs_FK)
values('138','Administracion del sistema','0027');
insert into Administrador(IdAdmin,CargoAdmin,IdUs_FK)
values('139','Administracion del sistema','0156');

insert into Minero(IdMinero,TipoDoc,NumeroDoc,Turno,Asistencia,Telefono,AsignacionTareas,FechaNacimiento,DireccionVivienda,Fechapago,Novedades,FechaNovedad,IdUs_FK)
values('5100','Cedula de ciudadania','1012587523','2','1','3212564','Extraer 240 gr de Oro y registrar la venta','1980-05-12','cra 102 #45-46','2015-11-02','No asiste por motivo de lesion','2016-02-07','0027');

insert into novedad(Id_Novedad,fecha_Novedad,descripcion,IdMINERO,IdAdmin)
values('10','2014-08-24','Incumple con el horario de trabajo','5100','0027');

insert into gestionventas(Idgestionventa,fechaExtraccionOro,precioOro,cantidad,EstadoVenta,IdMINERO)
values ('001','2008-09-25','450000','40','activo','4652');
insert into gestionventas(Idgestionventa,fechaExtraccionOro,precioOro,cantidad,EstadoVenta,IdMINERO)
values ('002','2008-11-09','461000','40','activo','4652');
insert into gestionventas(Idgestionventa,fechaExtraccionOro,precioOro,cantidad,EstadoVenta,IdMINERO)
values ('003','2011-08-27','500000','37','activo','5100');

insert into Producto(IdProducto,TipoOro,Estadoproducto,Idgestion_FK)
values('1','oro amarillo','activo','001');
insert into Producto(IdProducto,TipoOro,Estadoproducto,Idgestion_FK)
values('2','oro amarillo','activo','002');
insert into Producto(IdProducto,TipoOro,Estadoproducto,Idgestion_FK)
values('3','oro amarillo','activo','003');

insert into SalidaVenta(IdSVenta,PesogrOro,IdProducto_FK,IdADMIN_FK)
values('21','2.8','1','136');
insert into SalidaVenta(IdSVenta,PesogrOro,IdProducto_FK,IdADMIN_FK)
values('22','3.5','2','138');
insert into SalidaVenta(IdSVenta,PesogrOro,IdProducto_FK,IdADMIN_FK)
values('23','1.2','3','138');

insert into cliente(Idcliente,NombreCompleto,Empresa,Pais,Ciudad_Municipio,Fecha_Exportacion,IdSalida)
values('0054','Timothy Jhohanson MacBech','GatorCorporaton','Colombia','Magdalena','2014-02-15','23');

/* vistas*/
create view view_Login_Admin
As select correoUsuario,passwordUsuario,r.TipoRol 
from usuario US  INNER JOIN  Administrador Ad ON  US.IdUsuario = Ad.IdAdmin INNER JOIN rol r ON  US.IdUsuario = r.IdRol;

create view view_Login_Minero
As select correoUsuario,passwordUsuario,r.TipoRol 
from usuario US  INNER JOIN  Minero M ON  US.IdUsuario = M.IdMinero INNER JOIN rol r ON  US.IdUsuario = r.IdRol;  

create view view_Administrador
As select nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,Ad.CargoAdmin,r.TipoRol,r.EstadoRol 
from usuario US  INNER JOIN  Administrador Ad ON  US.IdUsuario = Ad.IdAdmin INNER JOIN rol r ON  US.IdUsuario = r.IdRol; 

create view view_Minero
As select nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario,
M.TipoDoc,M.NumeroDoc,M.Turno,M.Asistencia,M.Telefono,M.AsignacionTareas,M.FechaNacimiento,M.DireccionVivienda,M.Fechapago,
r.TipoRol,r.EstadoRol 
from usuario US  INNER JOIN  Minero M ON  US.IdUsuario = M.IdMinero INNER JOIN rol r ON  US.IdUsuario = r.IdRol;


/* procedimientos almacenados*/
Delimiter //
create procedure Registro_form(
nombreUs varchar(255),
apellidoUs varchar(255),
correoUs varchar(255),
passwordUs varchar(255)
)
insert into usuario(nombreUsuario,apellidosUsuario,correoUsuario,passwordUsuario) 
values(nombreUs,apellidoUs,correoUs,passwordUs);
//

Delimiter //
create procedure login(
in email varchar(255),
in passwordd varchar(255)
)
select correoUsuario,passwordUsuario,TipoRol,EstadoRol from usuario Us inner join rol R ON Us.IdUsuario = R.rol  where correoUsuario=email  and passwordUsuario=passwordd and estadoUsuario='activo';
//

Delimiter //
CREATE PROCEDURE ConsultaPerfil_Min(IN numeroDoc BIGINT)
BEGIN
    SELECT * FROM Minero WHERE NumeroDoc = numeroDoc;
END
//

DELIMITER //

CREATE PROCEDURE ConsultarEpf_Min(
    IN p_Nombre VARCHAR(255),
    IN p_NumeroDoc BIGINT
)
BEGIN
    SELECT *
    FROM Minero
    WHERE Nombre = p_Nombre OR NumeroDoc = p_NumeroDoc;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ModificarPerfil_Min(
    IN p_IdMinero BIGINT UNSIGNED,
    IN p_TipoDoc ENUM('Cedula de ciudadania','Cedula de Extranjeria'),
    IN p_NumeroDoc BIGINT,
    IN p_Turno INT,
    IN p_AsignacionTareas VARCHAR(255),
    IN p_Telefono MEDIUMINT,
    IN p_DireccionVivienda VARCHAR(255),
    IN p_Novedades VARCHAR(255),
    IN p_FechaNovedad DATE
)
BEGIN
    UPDATE Minero
    SET TipoDoc = p_TipoDoc,
        NumeroDoc = p_NumeroDoc,
        Turno = p_Turno,
        AsignacionTareas = p_AsignacionTareas,
        Telefono = p_Telefono,
        DireccionVivienda = p_DireccionVivienda,
        Novedades = p_Novedades,
        FechaNovedad = p_FechaNovedad
    WHERE IdMinero = p_IdMinero;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE Inactivar_Min(
    IN p_IdUsuario BIGINT UNSIGNED
)
BEGIN
    UPDATE usuario
    SET estadoUsuario = 'inactivo'
    WHERE IdUsuario = p_IdUsuario;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE solicitarReactivarMinero(
    IN email VARCHAR(255)
)
BEGIN
    UPDATE usuario
    SET estadoUsuario = 'activo'
    WHERE correoUsuario = email;
END //

Delimiter //
create procedure consultaMinPRODUCTO()
select * from producto where Estadoproducto = "activo";
//

Delimiter //
create procedure registrarMin_comprayventa(
in  F date,
in  P bigint unsigned,
in  C smallint unsigned
)
insert into GestionVentas(fechaExtraccionOro,precioOro,cantidad) values(F,P,C);
select * from  GestionVentas;
//

Delimiter //
create procedure consultarMin_comprayventa()
select * from GestionVentas;
//

Delimiter //
create procedure consultarMin_cliente()
select * from cliente ;
//
DELIMITER //

CREATE PROCEDURE ConsultarPropioAdmin(
    IN p_IdAdmin BIGINT UNSIGNED
)
BEGIN
    -- Realizar la lógica para consultar los datos del Administrador, por ejemplo, hacer una consulta JOIN con la tabla usuario
    SELECT a.IdAdmin, a.CargoAdmin, u.nombreUsuario, u.apellidosUsuario, u.correoUsuario, u.estadoUsuario
    FROM Administrador a
    JOIN usuario u ON a.IdUs_FK = u.IdUsuario
    WHERE a.IdAdmin = p_IdAdmin;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE ModificarPropioAdmin(
    IN p_IdAdmin BIGINT UNSIGNED,
    IN p_CargoAdmin VARCHAR(255),
    IN p_NombreUsuario VARCHAR(255),
    IN p_ApellidosUsuario VARCHAR(255),
    IN p_CorreoUsuario VARCHAR(255),
    IN p_PasswordUsuario VARCHAR(255),
    IN p_EstadoUsuario ENUM('activo', 'inactivo')
)
BEGIN
    -- Realizar la lógica para modificar los datos del Administrador
    UPDATE Administrador a
    JOIN usuario u ON a.IdUs_FK = u.IdUsuario
    SET a.CargoAdmin = p_CargoAdmin,
        u.nombreUsuario = p_NombreUsuario,
        u.apellidosUsuario = p_ApellidosUsuario,
        u.correoUsuario = p_CorreoUsuario,
        u.passwordUsuario = p_PasswordUsuario,
        u.estadoUsuario = p_EstadoUsuario
    WHERE a.IdAdmin = p_IdAdmin;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE consultarAdmin_Us()
BEGIN
    SELECT * FROM usuario;
END //

Delimiter //
create procedure modificarAdmin_Us(
IN idUsuario BIGINT UNSIGNED,
    IN nombreUsuario VARCHAR(255),
    IN apellidosUsuario VARCHAR(255),
    IN correoUsuario VARCHAR(255),
    IN passwordUsuario VARCHAR(255),
    IN estadoUsuario ENUM('activo', 'inactivo')
)
BEGIN
    UPDATE usuario
    SET nombreUsuario = nombreUsuario,
        apellidosUsuario = apellidosUsuario,
        correoUsuario = correoUsuario,
        passwordUsuario = passwordUsuario,
        estadoUsuario = estadoUsuario
    WHERE IdUsuario = idUsuario;
END
//

Delimiter //
CREATE PROCEDURE inactivarAdmin_Us(
    IN idUsuario BIGINT UNSIGNED
)
BEGIN
    UPDATE usuario
    SET estadoUsuario = 'inactivo'
    WHERE IdUsuario = idUsuario;
END //

DELIMITER //
CREATE PROCEDURE registrarAdmin_Us(
    IN nombreUsuario VARCHAR(255),
    IN apellidosUsuario VARCHAR(255),
    IN correoUsuario VARCHAR(255),
    IN passwordUsuario VARCHAR(255),
    IN estadoUsuario ENUM('activo', 'inactivo') 
)
BEGIN
    INSERT INTO usuario (nombreUsuario, apellidosUsuario, correoUsuario, passwordUsuario, estadoUsuario)
    VALUES (nombreUsuario, apellidosUsuario, correoUsuario, passwordUsuario, estadoUsuario);
END //


DELIMITER //
CREATE PROCEDURE consultarAdmin_NovedadesMin(
    IN idAdmin BIGINT UNSIGNED
)
BEGIN
    SELECT n.Id_Novedad, n.fecha_Novedad, n.descripcion, u.nombreUsuario, u.apellidosUsuario
    FROM Novedad n
    INNER JOIN Minero m ON n.IdMINERO = m.IdMinero
    INNER JOIN usuario u ON m.IdUs_FK = u.IdUsuario
    WHERE n.IdAdmin = idAdmin;
END //


DELIMITER //
CREATE TRIGGER verificar_Autorizacion BEFORE UPDATE ON Minero
FOR EACH ROW
BEGIN
    DECLARE autorizado INT;
    SELECT COUNT(*) INTO autorizado FROM Administrador WHERE IdUs_FK = NEW.IdUs_FK;
    IF autorizado = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No tiene autorización para modificar el número de documento';
    END IF;
END //

DELIMITER //

DELIMITER //

CREATE PROCEDURE ContestarSolicitudCambioDoc_Min(
    IN p_IdMinero BIGINT UNSIGNED,
    IN p_Respuesta VARCHAR(255)
)
BEGIN
    DECLARE autorizado INT;
    SELECT COUNT(*) INTO autorizado FROM Administrador WHERE IdUs_FK = (SELECT IdUs_FK FROM Minero WHERE IdMinero = p_IdMinero);
    IF autorizado = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No tiene autorización para contestar la solicitud';
    ELSE
        -- Realizar la lógica para contestar la solicitud, por ejemplo, actualizar un campo en la tabla Minero
        UPDATE Minero
        SET RespuestaSolicitud = p_Respuesta
        WHERE IdMinero = p_IdMinero;
        SELECT 'Solicitud contestada correctamente' AS mensaje;
    END IF;
END //

DELIMITER ;


Delimiter //
CREATE PROCEDURE modificarNumeroDocAdmin(
    IN idMinero BIGINT UNSIGNED,
    IN nuevoNumeroDoc BIGINT
)
BEGIN
    DECLARE autorizado INT;
    SELECT COUNT(*) INTO autorizado FROM Administrador WHERE IdUs_FK = (SELECT IdUs_FK FROM Minero WHERE IdMinero = idMinero);
    IF autorizado = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No tiene autorización para modificar el número de documento';
    ELSE
        UPDATE Minero
        SET NumeroDoc = nuevoNumeroDoc
        WHERE IdMinero = idMinero;
        SELECT 'Número de documento modificado correctamente' AS mensaje;
    END IF;
END //

Delimiter ;

DELIMITER //

CREATE PROCEDURE RegistrarAsistenciaMinero(
    IN p_IdMinero BIGINT UNSIGNED
)
BEGIN
    -- Realizar la lógica para registrar la asistencia del Minero, por ejemplo, actualizar un campo en la tabla Minero
    UPDATE Minero
    SET Asistencia = 1
    WHERE IdMinero = p_IdMinero;
    SELECT 'Asistencia registrada correctamente' AS mensaje;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE RegistrarNovedad_Min (IN IdMineroParam INT, IN fechaNovedadParam DATE, IN descripcionParam TEXT, IN IdAdminParam INT)
BEGIN
    INSERT INTO Novedad (fecha_Novedad, descripcion, IdMINERO, IdAdmin) VALUES (fechaNovedadParam, descripcionParam, IdMineroParam, IdAdminParam);
END //
DELIMITER ;