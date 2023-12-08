import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import {obtenerDatos, traeDatos, traeDatosGrupos} from "@/utils/peticiones";
import Error from "../../mensajes/Error.vue";
import ConfirmaEliminar from "../../mensajes/ConfirmaEliminar.vue";

export default {
	name: "TomaCargaLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_cargas: [],
			clavematerias: [],
			clavealumnos: [],
			clavegrupos: [],
			grupoActualizar: [],
			horario: [],
			mostrarError: false,
			mostrarConfirma: false,
			cargaSeleccionada: [],
		};
	},
	async created() {
		this.lista_cargas = await obtenerDatos("cargas");
		console.log("Lista cargas", this.lista_cargas);
		this.clavematerias = await obtenerDatos("materias");
		this.clavealumnos = await obtenerDatos("alumnos");
		this.clavegrupos = await obtenerDatos("grupos");
	},
	methods: {
		getNombreMateria(claveMateria) {
			const materia = this.clavematerias.find((materia) => materia.clavemateria === claveMateria);
			return materia ? materia.nombre : "Materia no encontrada";
		},
		getNombreAlumno(Ncontrol) {
			const alumno = this.clavealumnos.find((alumno) => alumno.ncontrol === Ncontrol);

			return alumno ? alumno.nombre : "Alumno no encontrado";
		},
		getHorarioAlumno(clavegrupo, dia) {
			const grupo = this.clavegrupos.find((grupo) => grupo.clavegrupo === clavegrupo);

			if (grupo) {
				switch (dia.toLowerCase()) {
					case "lunes":
						return grupo.horariolunes;
					case "martes":
						return grupo.horariomartes;
					case "miercoles":
						return grupo.horariomiercoles;
					case "jueves":
						return grupo.horariojueves;
					case "viernes":
						return grupo.horarioviernes;
					default:
						return "Día no válido";
				}
			} else {
				return "Horario no encontrado";
			}
		},

		nuevaCarga: function () {
			this.lista_cargas.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-carga", params: {}});
		},
		mostrarOpciones(cargas) {
			this.lista_cargas.forEach((m) => {
				if (m !== cargas) {
					m.mostrarOpciones = false;
				}
			});
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
		},
		editarCarga: function (cargas) {
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
			this.$router.push({
				name: "editar-carga",
				params: {clavegrupo: cargas.clavegrupo, ncontrol: cargas.ncontrol, clavemateria: cargas.clavemateria},
			});
		},
		eliminar: async function (cargas) {
			this.cargaSeleccionada = cargas.clavegrupo && cargas.ncontrol;
			this.mostrarConfirma = true;
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
		},
		eliminarCarga: async function (cargas) {
			console.log(cargas);
			const res = await axios
				.delete(URL_DATOS + `/cargas/${cargas.clavegrupo}/${cargas.ncontrol}`)
				.then((response) => {
					// Maneja la respuesta exitosa si es necesario
					console.log("Carga eliminada con éxito", response.data);
				});
			this.grupoActualizar = await traeDatos("grupos", cargas.clavegrupo);
			const response = await axios.put(URL_DATOS + "/grupos/inscritos/" + cargas.clavegrupo, {
				clavegrupo: cargas.clavegrupo,
				inscritos: this.grupoActualizar.inscritos - 1,
			});
			this.lista_cargas = await obtenerDatos("cargas");
			this.mostrarConfirma = false;
		},
		cerrarError() {
			console.log("cerrar error");
			this.mostrarError = false;
		},
		cerrarConfirma() {
			this.mostrarConfirma = false;
		},
	},
};
