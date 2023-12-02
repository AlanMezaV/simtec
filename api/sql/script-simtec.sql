CREATE DATABASE SIMTEC;
USE SIMTEC;

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
    ncontrol INT NOT NULL,
    PRIMARY KEY (clavegrupo, ncontrol)
);

ALTER TABLE CARGA
ADD CONSTRAINT FK_CARGA_GRUPO FOREIGN KEY (clavemateria, clavegrupo) REFERENCES GRUPOS (clavemateria, clavegrupo),
ADD CONSTRAINT FK_CARGA_ALUMNOS FOREIGN KEY (ncontrol) REFERENCES ALUMNOS(ncontrol);