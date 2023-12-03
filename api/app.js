var express = require("express");
var mysql = require("mysql");
var app = express(); //Ejecutamos constructor y creamos el objeto
//Habilitar recepcion json
app.use(express.json());

//Configuramos la conexion
var conexion = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "simtec",
});

const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Probar conexion
conexion.connect(function (error) {
	if (error) {
		throw error;
	} else {
		console.log("Conectado a la base de datos");
	}
});

//Gets de todas las tablas

//Mostrar un alumno
app.get("/api/alumnos/:id", (req, res) => {
	conexion.query("SELECT * FROM alumnos WHERE ncontrol = ? LIMIT 1", [req.params.id], (error, fila) => {
		if (error) {
			throw error;
		} else {
			res.send(fila);
		}
	});
});

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

//Mostrar una materia
app.get("/api/materias/:id", (req, res) => {
	conexion.query("SELECT * FROM materias WHERE clavemateria = ? LIMIT 1", [req.params.id], (error, fila) => {
		if (error) {
			throw error;
		} else {
			res.send(fila);
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

//Mostrar todos los grupos
app.get("/api/grupos", (req, res) => {
	conexion.query("SELECT * FROM grupos", (error, filas) => {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

//Post de todos las tablas

//Agregar un alumno
app.post("/api/alumnos", (req, res) => {
	let data = {
		ncontrol: req.body.ncontrol,
		nombre: req.body.nombre,
		carrera: req.body.carrera,
		estatus: req.body.estatus,
	};
	let sql = "INSERT INTO alumnos SET ?";
	conexion.query(sql, data, (error, results) => {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

//Agregar una materia
app.post("/api/materias", (req, res) => {
	let data = {
		clavemateria: req.body.cla,
		nombre: req.body.nom,
		creditos: req.body.cre,
	};
	let sql = "INSERT INTO materias SET ?";
	conexion.query(sql, data, (error, results) => {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

//Puts de todas las tablas

//Actualizar un alumno
app.put("/api/alumnos/:id", (req, res) => {
	let ncontrol = req.body.ncontrol;
	let nombre = req.body.nombre;
	let carrera = req.body.carrera;
	let estatus = req.body.estatus;
	let sql = "UPDATE alumnos SET nombre = ?, carrera = ?, estatus = ? WHERE ncontrol = ?";
	conexion.query(sql, [nombre, carrera, estatus, ncontrol], (error, results) => {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

//Actualizar una materia
app.put("/api/materias/:id", (req, res) => {
	let clavemateria = req.body.id;
	let nombre = req.body.nom;
	let creditos = req.body.cre;
	let sql = "UPDATE materias SET nombre = ?, creditos = ? WHERE clavemateria = ?";
	conexion.query(sql, [nombre, creditos, clavemateria], (error, results) => {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

//Delete de todas las tablas

//Eliminar un alumno
app.delete("/api/alumnos/:id", (req, res) => {
	conexion.query("DELETE FROM alumnos WHERE ncontrol = ?", [req.params.id], (error, filas) => {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

//Eliminar una materia
app.delete("/api/materias/:id", (req, res) => {
	conexion.query("DELETE FROM materias WHERE clavemateria = ?", [req.params.id], (error, filas) => {
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
