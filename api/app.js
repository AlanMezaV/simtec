var express = require("express");
var mysql = require("mysql");
var app = express(); //Ejecutamos constructor y creamos el objeto
//Habilitar recepcion json
app.use(express.json());

//Configuramos la conexion
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simtec'
});

const cors=require("cors");
const corsOptions ={
origin:'*', 
credentials:true, 
optionSuccessStatus:200,
}
app.use(cors(corsOptions))

//Probar conexion 
conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Conectado a la base de datos");
    }
});

//Gets de todas las tablas

//Mostrar todos los alumnos
app.get("/api/alumnos", (req, res) => {
    conexion.query("SELECT * FROM alumnos", (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

//Mostrar todos los maestros
app.get("/api/maestros", (req, res) => {
    conexion.query("SELECT * FROM maestros", (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

//Mostrar todas las materias
app.get("/api/materias", (req, res) => {
    conexion.query("SELECT * FROM materias", (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

//Mostrar todaos los grupos
app.get("/api/grupos", (req, res) => {
    conexion.query("SELECT * FROM grupos", (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

// Encender el servidor
app.listen("3000", function () {
    console.log("Servidor puerto 3000");
});
