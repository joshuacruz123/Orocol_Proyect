--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7
-- Dumped by pg_dump version 15.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Administradores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Administradores" (
    "idAdmin" integer NOT NULL,
    "cargoAdmin" character varying(60) NOT NULL,
    "idUsuario" integer
);


ALTER TABLE public."Administradores" OWNER TO postgres;

--
-- Name: Administradores_idAdmin_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Administradores_idAdmin_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Administradores_idAdmin_seq" OWNER TO postgres;

--
-- Name: Administradores_idAdmin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Administradores_idAdmin_seq" OWNED BY public."Administradores"."idAdmin";


--
-- Name: Clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Clientes" (
    "IdCliente" integer NOT NULL,
    "NombreCompleto" character varying(60) NOT NULL,
    "Empresa" character varying(70),
    "Pais" character varying(55) NOT NULL,
    "CiudadMunicipio" character varying(80) NOT NULL,
    "FechaExportacion" date NOT NULL,
    "estadoCompra" character varying(15) DEFAULT 'En proceso'::character varying NOT NULL,
    "IdSalidaVenta" integer
);


ALTER TABLE public."Clientes" OWNER TO postgres;

--
-- Name: Clientes_IdCliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Clientes_IdCliente_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Clientes_IdCliente_seq" OWNER TO postgres;

--
-- Name: Clientes_IdCliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Clientes_IdCliente_seq" OWNED BY public."Clientes"."IdCliente";


--
-- Name: EntradaVentas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EntradaVentas" (
    "idGestionVenta" integer NOT NULL,
    "fechaExtraccionOro" date NOT NULL,
    "precioOro" numeric(10,2) NOT NULL,
    cantidad integer NOT NULL,
    "estadoVenta" character varying(15) DEFAULT 'Activo'::character varying NOT NULL,
    "IdMinero" integer,
    "IdProducto" integer
);


ALTER TABLE public."EntradaVentas" OWNER TO postgres;

--
-- Name: EntradaVentas_idGestionVenta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EntradaVentas_idGestionVenta_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EntradaVentas_idGestionVenta_seq" OWNER TO postgres;

--
-- Name: EntradaVentas_idGestionVenta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EntradaVentas_idGestionVenta_seq" OWNED BY public."EntradaVentas"."idGestionVenta";


--
-- Name: Mineros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Mineros" (
    "IdMinero" integer NOT NULL,
    tipo_documento character varying(30) NOT NULL,
    numero_documento integer NOT NULL,
    cambio_documento character varying(15) NOT NULL,
    telefono character varying(15) NOT NULL,
    fecha_nacimiento date NOT NULL,
    direccion_vivienda character varying(55) NOT NULL,
    "idUsuario" integer
);


ALTER TABLE public."Mineros" OWNER TO postgres;

--
-- Name: Mineros_IdMinero_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Mineros_IdMinero_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Mineros_IdMinero_seq" OWNER TO postgres;

--
-- Name: Mineros_IdMinero_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Mineros_IdMinero_seq" OWNED BY public."Mineros"."IdMinero";


--
-- Name: Productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Productos" (
    "IdProducto" integer NOT NULL,
    "TipoOro" character varying(60) NOT NULL,
    "estadoProducto" character varying(15) DEFAULT 'Disponible'::character varying NOT NULL
);


ALTER TABLE public."Productos" OWNER TO postgres;

--
-- Name: Productos_IdProducto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Productos_IdProducto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Productos_IdProducto_seq" OWNER TO postgres;

--
-- Name: Productos_IdProducto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Productos_IdProducto_seq" OWNED BY public."Productos"."IdProducto";


--
-- Name: Rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Rol" (
    "idRol" integer NOT NULL,
    "tipoRol" character varying(15) NOT NULL
);


ALTER TABLE public."Rol" OWNER TO postgres;

--
-- Name: Rol_idRol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Rol_idRol_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Rol_idRol_seq" OWNER TO postgres;

--
-- Name: Rol_idRol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Rol_idRol_seq" OWNED BY public."Rol"."idRol";


--
-- Name: SalidaVentas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SalidaVentas" (
    "IdSalidaVenta" integer NOT NULL,
    "PesogrOro" numeric(10,2) NOT NULL,
    "idGestionVenta" integer,
    "idAdmin" integer
);


ALTER TABLE public."SalidaVentas" OWNER TO postgres;

--
-- Name: SalidaVentas_IdSalidaVenta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SalidaVentas_IdSalidaVenta_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SalidaVentas_IdSalidaVenta_seq" OWNER TO postgres;

--
-- Name: SalidaVentas_IdSalidaVenta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SalidaVentas_IdSalidaVenta_seq" OWNED BY public."SalidaVentas"."IdSalidaVenta";


--
-- Name: Usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Usuarios" (
    "idUsuario" integer NOT NULL,
    "nombreUsuario" character varying(60) NOT NULL,
    "apellidosUsuario" character varying(60),
    "correoUsuario" character varying(70) NOT NULL,
    "passwordUsuario" character varying(60) NOT NULL,
    "estadoUsuario" character varying(55) DEFAULT 'activo'::character varying NOT NULL,
    "idRol" integer
);


ALTER TABLE public."Usuarios" OWNER TO postgres;

--
-- Name: Usuarios_idUsuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Usuarios_idUsuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Usuarios_idUsuario_seq" OWNER TO postgres;

--
-- Name: Usuarios_idUsuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Usuarios_idUsuario_seq" OWNED BY public."Usuarios"."idUsuario";


--
-- Name: novedades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.novedades (
    "idNovedad" integer NOT NULL,
    "fechaNovedad" timestamp without time zone DEFAULT now() NOT NULL,
    descripcion text NOT NULL,
    "idTurno" integer
);


ALTER TABLE public.novedades OWNER TO postgres;

--
-- Name: novedades_idNovedad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."novedades_idNovedad_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."novedades_idNovedad_seq" OWNER TO postgres;

--
-- Name: novedades_idNovedad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."novedades_idNovedad_seq" OWNED BY public.novedades."idNovedad";


--
-- Name: perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil (
    "idPerfil" integer NOT NULL,
    "fotoPerfil" character varying NOT NULL,
    "idUsuario" integer
);


ALTER TABLE public.perfil OWNER TO postgres;

--
-- Name: perfil_idPerfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."perfil_idPerfil_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."perfil_idPerfil_seq" OWNER TO postgres;

--
-- Name: perfil_idPerfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."perfil_idPerfil_seq" OWNED BY public.perfil."idPerfil";


--
-- Name: solicitudes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitudes (
    "idSolicitud" integer NOT NULL,
    "descripcionSolicitud" text NOT NULL,
    "idUsuario" integer
);


ALTER TABLE public.solicitudes OWNER TO postgres;

--
-- Name: solicitudes_idSolicitud_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."solicitudes_idSolicitud_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."solicitudes_idSolicitud_seq" OWNER TO postgres;

--
-- Name: solicitudes_idSolicitud_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."solicitudes_idSolicitud_seq" OWNED BY public.solicitudes."idSolicitud";


--
-- Name: turnoMinero; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."turnoMinero" (
    "idTurno" integer NOT NULL,
    "FechaTurno" timestamp without time zone NOT NULL,
    "Asistencia" character varying(15) NOT NULL,
    "AsignacionTareas" character varying(255) NOT NULL,
    "IdMinero" integer
);


ALTER TABLE public."turnoMinero" OWNER TO postgres;

--
-- Name: turnoMinero_idTurno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."turnoMinero_idTurno_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."turnoMinero_idTurno_seq" OWNER TO postgres;

--
-- Name: turnoMinero_idTurno_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."turnoMinero_idTurno_seq" OWNED BY public."turnoMinero"."idTurno";


--
-- Name: Administradores idAdmin; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Administradores" ALTER COLUMN "idAdmin" SET DEFAULT nextval('public."Administradores_idAdmin_seq"'::regclass);


--
-- Name: Clientes IdCliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clientes" ALTER COLUMN "IdCliente" SET DEFAULT nextval('public."Clientes_IdCliente_seq"'::regclass);


--
-- Name: EntradaVentas idGestionVenta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EntradaVentas" ALTER COLUMN "idGestionVenta" SET DEFAULT nextval('public."EntradaVentas_idGestionVenta_seq"'::regclass);


--
-- Name: Mineros IdMinero; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mineros" ALTER COLUMN "IdMinero" SET DEFAULT nextval('public."Mineros_IdMinero_seq"'::regclass);


--
-- Name: Productos IdProducto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos" ALTER COLUMN "IdProducto" SET DEFAULT nextval('public."Productos_IdProducto_seq"'::regclass);


--
-- Name: Rol idRol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rol" ALTER COLUMN "idRol" SET DEFAULT nextval('public."Rol_idRol_seq"'::regclass);


--
-- Name: SalidaVentas IdSalidaVenta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SalidaVentas" ALTER COLUMN "IdSalidaVenta" SET DEFAULT nextval('public."SalidaVentas_IdSalidaVenta_seq"'::regclass);


--
-- Name: Usuarios idUsuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuarios" ALTER COLUMN "idUsuario" SET DEFAULT nextval('public."Usuarios_idUsuario_seq"'::regclass);


--
-- Name: novedades idNovedad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.novedades ALTER COLUMN "idNovedad" SET DEFAULT nextval('public."novedades_idNovedad_seq"'::regclass);


--
-- Name: perfil idPerfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil ALTER COLUMN "idPerfil" SET DEFAULT nextval('public."perfil_idPerfil_seq"'::regclass);


--
-- Name: solicitudes idSolicitud; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes ALTER COLUMN "idSolicitud" SET DEFAULT nextval('public."solicitudes_idSolicitud_seq"'::regclass);


--
-- Name: turnoMinero idTurno; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."turnoMinero" ALTER COLUMN "idTurno" SET DEFAULT nextval('public."turnoMinero_idTurno_seq"'::regclass);


--
-- Data for Name: Administradores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Administradores" ("idAdmin", "cargoAdmin", "idUsuario") FROM stdin;
1	Gerente	1
2	Supervisor	3
3	Supervisor	5
4	Jefe de minas	7
5	Supervisora	14
\.


--
-- Data for Name: Clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Clientes" ("IdCliente", "NombreCompleto", "Empresa", "Pais", "CiudadMunicipio", "FechaExportacion", "estadoCompra", "IdSalidaVenta") FROM stdin;
1	Timothy Jhohanson MacBech	Gator Corporation	Estados Unidos	Nueva York	2023-04-12	En proceso	6
2	Juan Manuel Hernandez Cabrera	GoldSocial	Colombia	Tolima	2023-05-15	En proceso	11
3	Timothy Jhohanson MacBech	Gator Corporation	Estados Unidos	Nueva York	2023-06-18	En proceso	12
4	Juan Santiago Zapata Aguilar	Joyeria nacional de Perú	Perú	Lima	2023-06-19	En proceso	13
\.


--
-- Data for Name: EntradaVentas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EntradaVentas" ("idGestionVenta", "fechaExtraccionOro", "precioOro", cantidad, "estadoVenta", "IdMinero", "IdProducto") FROM stdin;
1	2023-10-06	75000.99	14	Activo	1	2
2	2023-10-07	75000.00	12	Activo	1	1
3	2023-10-11	83000.30	17	Activo	1	3
4	2023-10-15	76000.00	15	Activo	1	1
\.


--
-- Data for Name: Mineros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Mineros" ("IdMinero", tipo_documento, numero_documento, cambio_documento, telefono, fecha_nacimiento, direccion_vivienda, "idUsuario") FROM stdin;
2	Cedula de ciudadania	1332778599	No acepto	3186279457	1987-12-08	Transversal 8a este # 80d 83 sur	4
3	Cedula de ciudadania	1312587790	Acepto	3182777777	1996-08-12	Av C.Cali #64 sur	6
4	Cedula de extranjeria	1234567855	Acepto	3068388607	1994-04-25	Calle Principal 123	8
5	Cedula de ciudadania	1398765432	No acepto	3123456789	1987-10-14	Avenida Central 456	9
6	Cedula de ciudadania	1032678564	Acepto	3059057211	2006-01-25	Transversal 1b este # 81d 84 sur	10
7	Cedula de ciudadania	1254321678	No acepto	3169873211	1988-06-05	Plaza Mayor 789	11
8	Cedula de extranjeria	123789456	Acepto	3218765445	2004-04-03	Calle Secundaria 987	12
9	Cedula de ciudadania	1876543244	No acepto	3456789122	1999-05-14	Paseo de la Playa 321	13
1	Cedula de ciudadania	1012587523	Acepto	3212564555	1993-10-15	cra 102 #45-47	2
\.


--
-- Data for Name: Productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Productos" ("IdProducto", "TipoOro", "estadoProducto") FROM stdin;
1	Oro de 24 quilates	Disponible
2	Oro de 22 quilates	Disponible
3	Oro de 18 quilates	Disponible
4	Oro de 14 quilates	Disponible
5	Oro de 10 quilates	Disponible
\.


--
-- Data for Name: Rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Rol" ("idRol", "tipoRol") FROM stdin;
1	Administrador
2	Minero
\.


--
-- Data for Name: SalidaVentas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SalidaVentas" ("IdSalidaVenta", "PesogrOro", "idGestionVenta", "idAdmin") FROM stdin;
6	5.60	2	2
11	6.01	3	3
12	4.55	1	3
13	7.57	4	3
\.


--
-- Data for Name: Usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Usuarios" ("idUsuario", "nombreUsuario", "apellidosUsuario", "correoUsuario", "passwordUsuario", "estadoUsuario", "idRol") FROM stdin;
8	Juan Santiago	García Pérez	juan.garcia@gmail.com	$2a$10$a.D6lTZHTMCstUpiYCZ6vueYXDAwNnNupwDIKfcO58FLcuZ3pVmcC	activo	2
12	Ana Maria	Fernández Ruiz	anafernandez@gmail.com	$2a$10$oCtBrvSJLf6.ZVTgXprwHuYii3WuERtQUId2OBVFcAtVtLxmumB62	activo	2
1	Andres Manuel	Hernandez Castillo	hernandez@gmail.com	$2a$10$ikE6UknwLAy9bqg.gmgGTOQupJnp3ipZAa7oL6RtmbHT.hMTQk9KO	activo	1
10	Joshua Sebastian	Cruz Fierro	joshuasebastiancruzfierro@gmail.com	$2a$10$6.BTRiw7sjGAcrkkzD8B8ugmTVwNnIPuxBYxZ3BSJhDEhqP/kxACq	activo	2
3	Jesus Alvarez	Sierra Daza	jesusSierra@gmail.com	$2a$10$FLuyhqgKa3IIDico70FHQOhkMVjXIQNWCNPixuMwk/cxZmbyWAQX2	activo	1
4	Anderson	Perez Silva	Anders@gmail.com	$2a$10$zUp9sUVjSPk6ri5DfX96qO2PxAPnC7a6iDFLy.oiGTXjzz9FjEJ1G	activo	2
5	Felipe Montes	Brievich Gomez	felipeMZ@gmail.com	$2a$10$xRSVDkXyl/BYKtWGpOQaMuWfx1e.wb5ya/B.XWfxPGFvY/kMlBh4u	activo	1
6	Brenton Para	Casillas Aguilar	brentP@gmail.com	$2a$10$qqY/clYES5iiM2ILilxJn.88pJhefLrjRAnPXyXVEyeESjj0asc4u	activo	2
7	Bernabe Alex	Gamez Prieto	alexisGe@gmail.com	$2a$10$bzs/li0WNV2TmJGvukjskOFVpEtubCPxx0mIp0hMfNN73LfAscyi6	activo	1
2	Alezander Antonio	Velazco	alexV@gmail.com	$2a$10$5vIPkpHBxXo0Lb15Y2ImM.gky7ZalO4Ug5EbcSRUGZdLByKBy4bz6	activo	2
11	Pedro	Rodríguez García	pedro.rodriguez@gmail.com	$2a$10$nqdek8ZoBXTncdmeaQc6JerVK0wFrxo6hejXXcsNsML2CxFvm4cCC	inactivo	2
9	María José	López Martínez	marialopez@gmail.com	$2a$10$MFwi6Ng8eiW2VwGRStpoPOJpDyEbNUZN/.PmMBaWu6eGA2qvwNuxi	inactivo	2
13	Carlos Martín	Sánchez	carlos.martin@gmail.com	$2a$10$Dr.l7HDYCHTurBJ2bSXlPuq26Eax5WgNGNGFS9ZMLpna2DuMRWiiy	inactivo	2
14	Laura Sofia	Gómez López	laura.gomez@gmail.com	$2a$10$38y3wsOpyqHV982e14MKOuaRDKF46DS7ZsPlUgmUhbww/kmwBsIHi	activo	1
\.


--
-- Data for Name: novedades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.novedades ("idNovedad", "fechaNovedad", descripcion, "idTurno") FROM stdin;
1	2024-06-05 16:06:36.762668	Hoy no puede asistir ya tuve una emergencia médica, y el médico me dijo que tenia que reposar una semana.	4
2	2024-06-06 09:29:54.571202	Buenas tardes, no asistí ese día por razones personales.	3
3	2024-06-06 16:00:04.21956	Muy buenas tardes, lo lamento pero yo si asistí en día de hoy, el medico ya me dio de alta.	6
\.


--
-- Data for Name: perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfil ("idPerfil", "fotoPerfil", "idUsuario") FROM stdin;
1	/uploads/1_sennior.jpg	1
2	/uploads/10_mifoto - copia.jpeg	10
3	/uploads/2_fondo_perfil.jpg	2
4	/uploads/3_6277e2b5.jpg	3
5	/uploads/4_minerodos.jpg	4
6	/uploads/5_Alex Gamez.jpg	5
7	/uploads/6_minerosuno.jpg	6
8	/uploads/7_jefaso.jpg	7
\.


--
-- Data for Name: solicitudes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitudes ("idSolicitud", "descripcionSolicitud", "idUsuario") FROM stdin;
1	dejame ingresar hijo de su madre	11
2	Ke paso master, no me va a reactivar? necesito iniciar sesión.	13
3	Muy buenas tardes señores administradores, ¿pueden reactivar mi usuario por favor?	9
\.


--
-- Data for Name: turnoMinero; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."turnoMinero" ("idTurno", "FechaTurno", "Asistencia", "AsignacionTareas", "IdMinero") FROM stdin;
1	2024-05-11 03:00:00.899	Sí asistió	Carga de materiales	6
2	2024-06-05 08:00:00	Sí asistió	Manejo de maquinaria pesada	6
4	2024-06-05 13:30:00	Nó asistió	Limpieza de oro	2
3	2023-06-05 13:30:00	Sí asistió	Limpieza de materiales	1
5	2024-06-06 08:00:00	Sí asistió	Carga de materiales.	1
6	2024-06-06 08:00:00	Nó asistió	Recolección de oro y limpieza.	2
7	2024-06-06 13:00:00	Sí asistió	Carga de materiales.	3
8	2024-06-06 08:00:00	Sí asistió	Limpiar piezas de oro.	6
9	2024-06-06 13:00:00	Sí asistió	Recolección de oro.	4
10	2024-06-06 13:00:00	Sí asistió	Limpieza de materiales.	5
11	2024-06-06 13:00:00	Sí asistió	Carga de materiales.	7
12	2024-06-06 08:00:00	Sí asistió	Manejo de maquinaria pesada.	8
\.


--
-- Name: Administradores_idAdmin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Administradores_idAdmin_seq"', 5, true);


--
-- Name: Clientes_IdCliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Clientes_IdCliente_seq"', 4, true);


--
-- Name: EntradaVentas_idGestionVenta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EntradaVentas_idGestionVenta_seq"', 4, true);


--
-- Name: Mineros_IdMinero_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Mineros_IdMinero_seq"', 9, true);


--
-- Name: Productos_IdProducto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Productos_IdProducto_seq"', 7, true);


--
-- Name: Rol_idRol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Rol_idRol_seq"', 2, true);


--
-- Name: SalidaVentas_IdSalidaVenta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SalidaVentas_IdSalidaVenta_seq"', 13, true);


--
-- Name: Usuarios_idUsuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Usuarios_idUsuario_seq"', 14, true);


--
-- Name: novedades_idNovedad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."novedades_idNovedad_seq"', 3, true);


--
-- Name: perfil_idPerfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."perfil_idPerfil_seq"', 8, true);


--
-- Name: solicitudes_idSolicitud_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."solicitudes_idSolicitud_seq"', 3, true);


--
-- Name: turnoMinero_idTurno_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."turnoMinero_idTurno_seq"', 12, true);


--
-- Name: solicitudes PK_12916e166daea85cdbcf133b26d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT "PK_12916e166daea85cdbcf133b26d" PRIMARY KEY ("idSolicitud");


--
-- Name: Administradores PK_149dea7473f5d0928070e1bc0e7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Administradores"
    ADD CONSTRAINT "PK_149dea7473f5d0928070e1bc0e7" PRIMARY KEY ("idAdmin");


--
-- Name: Productos PK_2415ffbeff5b573a40b7f99fff2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "PK_2415ffbeff5b573a40b7f99fff2" PRIMARY KEY ("IdProducto");


--
-- Name: perfil PK_3731d40865fab7750f25e6809f7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT "PK_3731d40865fab7750f25e6809f7" PRIMARY KEY ("idPerfil");


--
-- Name: Usuarios PK_4f49fd4960add50a9231ce14bab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "PK_4f49fd4960add50a9231ce14bab" PRIMARY KEY ("idUsuario");


--
-- Name: EntradaVentas PK_569ffa7a6bf2c7b19e9ae2e0e8c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EntradaVentas"
    ADD CONSTRAINT "PK_569ffa7a6bf2c7b19e9ae2e0e8c" PRIMARY KEY ("idGestionVenta");


--
-- Name: SalidaVentas PK_57d23963046e78cbe262126b3a0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SalidaVentas"
    ADD CONSTRAINT "PK_57d23963046e78cbe262126b3a0" PRIMARY KEY ("IdSalidaVenta");


--
-- Name: Clientes PK_5c6ea407249ad1499d77765e1bd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clientes"
    ADD CONSTRAINT "PK_5c6ea407249ad1499d77765e1bd" PRIMARY KEY ("IdCliente");


--
-- Name: novedades PK_bb8db15917590865099b9c9217d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.novedades
    ADD CONSTRAINT "PK_bb8db15917590865099b9c9217d" PRIMARY KEY ("idNovedad");


--
-- Name: Mineros PK_c343e219db03ac657770102ea63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mineros"
    ADD CONSTRAINT "PK_c343e219db03ac657770102ea63" PRIMARY KEY ("IdMinero");


--
-- Name: turnoMinero PK_d927f8a950b8aab0b5b132b1e54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."turnoMinero"
    ADD CONSTRAINT "PK_d927f8a950b8aab0b5b132b1e54" PRIMARY KEY ("idTurno");


--
-- Name: Rol PK_fb7a15ff62033cf9ee4b09e2f36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rol"
    ADD CONSTRAINT "PK_fb7a15ff62033cf9ee4b09e2f36" PRIMARY KEY ("idRol");


--
-- Name: SalidaVentas REL_12d42c21ebcbf734d5711b9f5c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SalidaVentas"
    ADD CONSTRAINT "REL_12d42c21ebcbf734d5711b9f5c" UNIQUE ("idGestionVenta");


--
-- Name: Mineros REL_3288e274d9bbffa27ba2b73166; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mineros"
    ADD CONSTRAINT "REL_3288e274d9bbffa27ba2b73166" UNIQUE ("idUsuario");


--
-- Name: novedades REL_92d46588ceafa522c828265a81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.novedades
    ADD CONSTRAINT "REL_92d46588ceafa522c828265a81" UNIQUE ("idTurno");


--
-- Name: perfil REL_b35ce50c61b2e3923fb284890a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT "REL_b35ce50c61b2e3923fb284890a" UNIQUE ("idUsuario");


--
-- Name: Administradores REL_f45422a1a894630e78e3d50ee5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Administradores"
    ADD CONSTRAINT "REL_f45422a1a894630e78e3d50ee5" UNIQUE ("idUsuario");


--
-- Name: Usuarios UQ_63b005ad37462db6f8736b95fec; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "UQ_63b005ad37462db6f8736b95fec" UNIQUE ("correoUsuario");


--
-- Name: Productos UQ_ba435b76cb32a9f8707ada766d5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "UQ_ba435b76cb32a9f8707ada766d5" UNIQUE ("TipoOro");


--
-- Name: Mineros UQ_c6b696c2c925d4a3a44346a2115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mineros"
    ADD CONSTRAINT "UQ_c6b696c2c925d4a3a44346a2115" UNIQUE (numero_documento);


--
-- Name: SalidaVentas FK_12d42c21ebcbf734d5711b9f5c0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SalidaVentas"
    ADD CONSTRAINT "FK_12d42c21ebcbf734d5711b9f5c0" FOREIGN KEY ("idGestionVenta") REFERENCES public."EntradaVentas"("idGestionVenta");


--
-- Name: EntradaVentas FK_18880bb9912c448ed634004c246; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EntradaVentas"
    ADD CONSTRAINT "FK_18880bb9912c448ed634004c246" FOREIGN KEY ("IdProducto") REFERENCES public."Productos"("IdProducto");


--
-- Name: Mineros FK_3288e274d9bbffa27ba2b73166d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mineros"
    ADD CONSTRAINT "FK_3288e274d9bbffa27ba2b73166d" FOREIGN KEY ("idUsuario") REFERENCES public."Usuarios"("idUsuario");


--
-- Name: EntradaVentas FK_4ddd803d124eab4737574c6fd28; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EntradaVentas"
    ADD CONSTRAINT "FK_4ddd803d124eab4737574c6fd28" FOREIGN KEY ("IdMinero") REFERENCES public."Mineros"("IdMinero");


--
-- Name: Usuarios FK_6776507c41374cd8f2247d1c185; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "FK_6776507c41374cd8f2247d1c185" FOREIGN KEY ("idRol") REFERENCES public."Rol"("idRol");


--
-- Name: solicitudes FK_6c8a9de15337cfae5150d2b6490; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT "FK_6c8a9de15337cfae5150d2b6490" FOREIGN KEY ("idUsuario") REFERENCES public."Usuarios"("idUsuario");


--
-- Name: turnoMinero FK_872224d1429bd72b4f4f1df6932; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."turnoMinero"
    ADD CONSTRAINT "FK_872224d1429bd72b4f4f1df6932" FOREIGN KEY ("IdMinero") REFERENCES public."Mineros"("IdMinero");


--
-- Name: novedades FK_92d46588ceafa522c828265a817; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.novedades
    ADD CONSTRAINT "FK_92d46588ceafa522c828265a817" FOREIGN KEY ("idTurno") REFERENCES public."turnoMinero"("idTurno");


--
-- Name: Clientes FK_a9fb8ed978ec5dd0c6b6d7910f9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clientes"
    ADD CONSTRAINT "FK_a9fb8ed978ec5dd0c6b6d7910f9" FOREIGN KEY ("IdSalidaVenta") REFERENCES public."SalidaVentas"("IdSalidaVenta");


--
-- Name: perfil FK_b35ce50c61b2e3923fb284890a8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT "FK_b35ce50c61b2e3923fb284890a8" FOREIGN KEY ("idUsuario") REFERENCES public."Usuarios"("idUsuario");


--
-- Name: Administradores FK_f45422a1a894630e78e3d50ee58; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Administradores"
    ADD CONSTRAINT "FK_f45422a1a894630e78e3d50ee58" FOREIGN KEY ("idUsuario") REFERENCES public."Usuarios"("idUsuario");


--
-- Name: SalidaVentas FK_f4be3836c66b17be5f229bffeba; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SalidaVentas"
    ADD CONSTRAINT "FK_f4be3836c66b17be5f229bffeba" FOREIGN KEY ("idAdmin") REFERENCES public."Administradores"("idAdmin");


--
-- PostgreSQL database dump complete
--

