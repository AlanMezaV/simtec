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

//Mostrar un maestro
app.get("/api/maestros/:id", (req, res) => {
	conexion.query("SELECT * FROM maestros WHERE clavemaestro = ? LIMIT 1", [req.params.id], (error, fila) => {
		if (error) {
			throw error;
		} else {
			res.send(fila);
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

//Mostrar un grupo
app.get("/api/grupos/:id", (req, res) => {
	conexion.query("SELECT * FROM grupos WHERE clavegrupo = ? LIMIT 1", [req.params.id], (error, fila) => {
		if (error) {
			throw error;
		} else {
			res.send(fila);
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

//Mostrar una carga
app.get("/api/cargas/:id", (req, res) => {
	conexion.query("SELECT * FROM carga WHERE clavegrupo = ? LIMIT 1", [req.params.id], (error, fila) => {
		if (error) {
			throw error;
		} else {
			res.send(fila);
		}
	});
});

//Mostrar todas las cargas
app.get("/api/cargas", (req, res) => {
	conexion.query("SELECT * FROM carga", (error, filas) => {
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

//Agregar un maestro
app.post("/api/maestros", (req, res) => {
	let data = {
		clavemaestro: req.body.clavemaestro,
		nombre: req.body.nombre,
		departamento: req.body.departamento,
		estatus: req.body.estatus,
	};
	let sql = "INSERT INTO maestros SET ?";
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

//Agregar un grupo
app.post("/api/grupos", (req, res) => {
	let data = {
		clavemateria: req.body.clavemateria,
		clavegrupo: req.body.clavegrupo,
		clavemaestro: req.body.clavemaestro,
		limitealumnos: req.body.limitealumnos,
		inscritos: req.body.inscritos,
		horariolunes: req.body.horariolunes,
		horariomartes: req.body.horariomartes,
		horariomiercoles: req.body.horariomiercoles,
		horariojueves: req.body.horariojueves,
		horarioviernes: req.body.horarioviernes,
	};
	let sql = "INSERT INTO grupos SET ?";
	conexion.query(sql, data, (error, results) => {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

//Agregar una carga
app.post("/api/cargas", (req, res) => {
	let data = {
		clavemateria: req.body.clavemateria,
		clavegrupo: req.body.clavegrupo,
		ncontrol: req.body.ncontrol,
	};
	let sql = "INSERT INTO carga SET ?";
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

//Actualizar un maestro
app.put("/api/maestros/:id", (req, res) => {
	let clavemaestro = req.body.clavemaestro;
	let nombre = req.body.nombre;
	let departamento = req.body.departamento;
	let estatus = req.body.estatus;
	let sql = "UPDATE maestros SET nombre = ?, departamento = ?, estatus = ? WHERE clavemaestro = ?";
	conexion.query(sql, [nombre, departamento, estatus, clavemaestro], (error, results) => {
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

//Actualizar un grupo
app.put("/api/grupos/:id", (req, res) => {
	let clavemateria = req.body.clavemateria;
	let clavegrupo = req.body.clavegrupo;
	let clavemaestro = req.body.clavemaestro;
	let limitealumnos = req.body.limitealumnos;
	let inscritos = req.body.inscritos;
	let horariolunes = req.body.horariolunes;
	let horariomartes = req.body.horariomartes;
	let horariomiercoles = req.body.horariomiercoles;
	let horariojueves = req.body.horariojueves;
	let horarioviernes = req.body.horarioviernes;
	let sql =
		"UPDATE grupos SET clavemateria = ?, clavemaestro = ?, limitealumnos = ?, inscritos = ?, horariolunes = ?, horariomartes = ?, horariomiercoles = ?, horariojueves = ?, horarioviernes = ? WHERE clavegrupo = ?";
	conexion.query(
		sql,
		[
			clavemateria,
			clavemaestro,
			limitealumnos,
			inscritos,
			horariolunes,
			horariomartes,
			horariomiercoles,
			horariojueves,
			horarioviernes,
			clavegrupo,
		],
		(error, results) => {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

//Actualizar un alumno
app.put("/api/cargas/:id", (req, res) => {
	let clavemateria = req.body.clavemateria;
	let clavegrupo = req.body.clavegrupo;
	let ncontrol = req.body.ncontrol;
	let sql = "UPDATE carga SET clavemateria = ?, ncontrol = ? WHERE clavegrupo = ?";
	conexion.query(sql, [clavemateria, ncontrol, clavegrupo], (error, results) => {
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

//Eliminar un maestro
app.delete("/api/maestros/:id", (req, res) => {
	conexion.query("DELETE FROM maestros WHERE clavemaestro = ?", [req.params.id], (error, filas) => {
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

//Eliminar un grupo
app.delete("/api/grupos/:id", (req, res) => {
	conexion.query("DELETE FROM grupos WHERE clavegrupo = ?", [req.params.id], (error, filas) => {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

//Eliminar una carga
app.delete("/api/cargas/:id", (req, res) => {
	conexion.query("DELETE FROM carga WHERE clavegrupo = ?", [req.params.id], (error, filas) => {
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
