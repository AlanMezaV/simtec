import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import TomaCargaLista from "../lista/TomaCargaLista.vue";
import {obtenerDatos, traeDatos, traeDatosGrupos, traeEstatus} from "@/utils/peticiones";

export default {
	name: "FormAggCarga",
	components: {
		TomaCargaLista,
	},
	data: function () {
		return {
			cargas: [],
			clavematerias: [],
			clavealumnos: [],
			clavegrupos: [],
			pedir: [],
			materiasDeAlumno: [],
			horarios: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.clavematerias = await obtenerDatos("materias");
		this.clavealumnos = await obtenerDatos("alumnos");
		// this.clavegrupos = await traeDatosGrupos("materia", this.cargas.clavemateria);
	},
	watch: {
		"cargas.clavemateria": "peticionGruposClaveMateria",
		"cargas.ncontrol": ["peticionGruposNcontrol", "peticionAlumnosClvGyClvM"],
		"cargas.clavegrupo": "pedirNuevoGrupo",
	},
	methods: {
		pedirNuevoGrupo: async function () {
			this.grupoActualizar = await traeDatos("grupos", this.cargas.clavegrupo);
			console.log("Grupo actualizado", this.grupoActualizar);
		},
		peticionGruposClaveMateria: async function () {
			this.clavegrupos = await traeDatosGrupos("materia", this.cargas.clavemateria);
		},
		peticionGruposNcontrol: async function () {
			this.materiasDeAlumno = await traeDatosGrupos("alumno", this.cargas.ncontrol);
		},
		peticionAlumnosClvGyClvM: async function () {
			this.pedir = await traeDatosGrupos("alumnito", this.cargas.ncontrol);

			const petitions = [];

			this.pedir.forEach((obj) => {
				petitions.push(traeDatosGrupos("horario", obj.clavegrupo));
			});

			const horarios = await Promise.all(petitions);
			this.horarios = horarios.map((i) => i[0].horariolunes);
		},
		agregarCarga: async function () {
			const validaDatos = () => {
				if (
					this.cargas.clavemateria == undefined ||
					this.cargas.clavegrupo == undefined ||
					this.cargas.clavemateria == "" ||
					this.cargas.clavegrupo == "" ||
					this.cargas.ncontrol == undefined ||
					this.cargas.ncontrol == ""
				) {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
					return false;
				}
				return true;
			};

			const validaAlumnoMateria = () => {
				for (const materia of this.materiasDeAlumno) {
					if (materia.clavemateria === this.cargas.clavemateria) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya tiene esa materia.";
						return false;
					}
				}
				return true;
			};

			const validaInscritos = () => {
				const inscritos = this.grupoActualizar.inscritos;
				console.log("Alumnos inscritos" + this.grupoActualizar.inscritos);
				const cupo = this.grupoActualizar.limitealumnos;
				console.log("Cupo" + this.grupoActualizar.limitealumnos);
				if (inscritos === cupo) {
					this.mostrarError = true;
					this.errorMensaje = "El grupo ya esta lleno.";
					return false;
				}
				return true;
			};

			let estatus = await traeEstatus("alumnos", this.cargas.ncontrol);
			const validaAlumnoVigencia = () => {
				if (estatus[0].estatus === "B") {
					this.mostrarError = true;
					this.errorMensaje = "el Alumno ya no esta vigente.";
					return false;
				}
				return true;
			};

			const validaAlumnoHorario = () => {
				let band = true;
				const horario = this.clavegrupos[0].horariolunes;
				console.log(horario);
				this.horarios.forEach((hora) => {
					if (hora === horario) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya tiene una materia en ese horario.";
						band = false;
					}
				});
				return band;
			};
			try {
				if (
					validaDatos() &&
					validaAlumnoMateria() &&
					validaAlumnoHorario() &&
					validaInscritos() &&
					validaAlumnoVigencia()
				) {
					const response = await axios.put(URL_DATOS + "/grupos/inscritos/" + this.cargas.clavegrupo, {
						clavegrupo: this.cargas.clavegrupo,
						inscritos: this.grupoActualizar.inscritos + 1,
					});

					const res = await axios.post(URL_DATOS + "/cargas", {
						clavemateria: this.cargas.clavemateria,
						clavegrupo: this.cargas.clavegrupo,
						ncontrol: this.cargas.ncontrol,
					});
					this.$router.push("/carga");
				}
			} catch (error) {
				console.error("Error al verificar la existencia de la carga:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/carga");
		},
	},
};
