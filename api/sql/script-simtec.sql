CREATE DATABASE simtec;
USE simtec;

CREATE TABLE ALUMNOS(
	ncontrol INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    carrera VARCHAR(150) NOT NULL,
    estatus VARCHAR(1) NOT NULL
);

CREATE TABLE MAESTROS(
	clavemaestro INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    departamento INT NOT NULL,
    estatus VARCHAR(1) NOT NULL
);

CREATE TABLE MATERIAS (
	clavemateria VARCHAR(8) NOT NULL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    creditos INT NOT NULL
);

CREATE TABLE GRUPOS(
	clavemateria VARCHAR(8) NOT NULL,
    clavegrupo VARCHAR(4) NOT NULL,
    clavemaestro INT NOT NULL,
    limitealumnos INT NOT NULL,
    inscritos INT NOT NULL,
    horariolunes VARCHAR(11),
    horariomartes VARCHAR(11),
    horariomiercoles VARCHAR(11),
    horariojueves VARCHAR(11),
    horarioviernes VARCHAR(11),
    PRIMARY KEY (clavegrupo)
);

ALTER TABLE GRUPOS 
ADD CONSTRAINT FK_GRUPOS_MATERIAS FOREIGN KEY (clavemateria) REFERENCES MATERIAS (clavemateria),
ADD CONSTRAINT FK_GRUPOS_MAESTROS FOREIGN KEY (clavemaestro) REFERENCES MAESTROS (clavemaestro);

CREATE TABLE CARGA(
	clavemateria VARCHAR(8) NOT NULL,
    clavegrupo VARCHAR(4) NOT NULL,
    ncontrol INT NOT NULL
);

ALTER TABLE CARGA
ADD CONSTRAINT FK_CARGA_GRUPO FOREIGN KEY (clavemateria, clavegrupo) REFERENCES GRUPOS (clavemateria, clavegrupo),
ADD CONSTRAINT FK_CARGA_ALUMNOS FOREIGN KEY (ncontrol) REFERENCES ALUMNOS(ncontrol);


INSERT INTO `alumnos` (`ncontrol`, `nombre`, `carrera`, `estatus`) 
    VALUES ('20170592', 'Monica Angulo Sanchez', 'Sistemas', 'V');
INSERT INTO `alumnos` (`ncontrol`, `nombre`, `carrera`, `estatus`) 
    VALUES ('20170749', 'Alan Meza Valenzuela', 'Sistemas', 'V');
INSERT INTO `alumnos` (`ncontrol`, `nombre`, `carrera`, `estatus`) 
    VALUES ('20170757', 'Rogelio Samuel Moreno Corrales', 'Sistemas', 'V');


INSERT INTO `maestros` (`clavemaestro`, `nombre`, `departamento`, `estatus`) 
    VALUES ('1', 'Dr. Clemente Garcia Gerardo', '1', 'V');
INSERT INTO `maestros` (`clavemaestro`, `nombre`, `departamento`, `estatus`) 
    VALUES ('2', 'M.C Daniel Esparza Soto', '1', 'V');
INSERT INTO `maestros` (`clavemaestro`, `nombre`, `departamento`, `estatus`) 
    VALUES ('3', 'I.S.C Martin Leonardo Nevarez Rivas', '1', 'V');


INSERT INTO `materias` (`clavemateria`, `nombre`, `creditos`) 
    VALUES ('1', 'Programacion Web', '5');
INSERT INTO `materias` (`clavemateria`, `nombre`, `creditos`) 
    VALUES ('2', 'Topicos avanzados de programacion', '5');
INSERT INTO `materias` (`clavemateria`, `nombre`, `creditos`) 
    VALUES ('3', 'Taller de base de datos', '4');


INSERT INTO `grupos` (`clavemateria`, `clavegrupo`, `clavemaestro`, `limitealumnos`, `inscritos`, `horariolunes`, `horariomartes`, `horariomiercoles`, `horariojueves`, `horarioviernes`) 
    VALUES ('1', '1213', '3', '2', '0', '12:00-13:00', '12:00-13:00', '12:00-13:00', 
    '12:00-13:00', '12:00-13:00');
INSERT INTO `grupos` (`clavemateria`, `clavegrupo`, `clavemaestro`, `limitealumnos`, `inscritos`, `horariolunes`, `horariomartes`, `horariomiercoles`, `horariojueves`, `horarioviernes`) 
    VALUES ('2', '1214', '1', '2', '0', '10:00-11:00', '10:00-11:00', '10:00-11:00', 
    '10:00-11:00', '10:00-11:00');