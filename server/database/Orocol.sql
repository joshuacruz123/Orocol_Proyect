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
IdMINERO bigint unsigned not null, foreign key (IdMINERO) references usuario (IdUsuario)
);
create table GestionVentas
(
Idgestionventa bigint unsigned primary key auto_increment,
fechaExtraccionOro date not null,
precioOro bigint not null,
cantidad smallint not null,
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
values(5100,'Cedula de ciudadania','1012587523','2','1','3212564','Extraer 240 gr de Oro y registrar la venta','1980-05-12','cra 102 #45-46','2015-11-02','No asiste por motivo de lesion','2016-02-07','0027');

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
