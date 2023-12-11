import TomaCargaLista from "../lista/TomaCargaLista.vue";
import {actualiza, agrega, obtenerDatos, obtenDatosEditar, traeDatosGrupos, traeEstatus} from "@/utils/peticiones";

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
			grupoSeleccionado: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.clavealumnos = await this.obtenerAlumnos();
		await this.obtenerMaterias();
	},
	watch: {
		"cargas.clavemateria": "peticionGruposClaveMateria",
		"cargas.ncontrol": ["peticionGruposNcontrol", "peticionAlumnosClvGyClvM"],
		"cargas.clavegrupo": ["pedirNuevoGrupo", "actualizarHorarios"],
	},
	methods: {
		async actualizarHorarios() {
			this.grupoSeleccionado = this.clavegrupos.find((grupo) => grupo.clavegrupo === this.cargas.clavegrupo);
			this.cargas.horariolunes = this.grupoSeleccionado.horariolunes;
			this.cargas.horariomartes = this.grupoSeleccionado.horariomartes;
			this.cargas.horariomiercoles = this.grupoSeleccionado.horariomiercoles;
			this.cargas.horariojueves = this.grupoSeleccionado.horariojueves;
			this.cargas.horarioviernes = this.grupoSeleccionado.horarioviernes;
			this.cargas.nombreMaestro = this.grupoSeleccionado.nombremaestro;
		},
		async obtenerMaterias() {
			const materias = await obtenerDatos("materias");
			const grupos = await obtenerDatos("grupos");
			const clavesConGrupos = grupos.map((grupo) => grupo.clavemateria);
			this.clavematerias = materias.filter((materia) => clavesConGrupos.includes(materia.clavemateria));
		},
		async obtenerAlumnos() {
			this.clavealumnos = await obtenerDatos("alumnos");
			return this.clavealumnos.filter((alumno) => alumno.estatus === "V");
		},
		pedirNuevoGrupo: async function () {
			this.grupoActualizar = await obtenDatosEditar("grupos", this.cargas.clavegrupo);
		},
		peticionGruposClaveMateria: async function () {
			this.clavegrupos = await traeDatosGrupos("materia", this.cargas.clavemateria);
			this.cargas.horariolunes = "";
			this.cargas.horariomartes = "";
			this.cargas.horariomiercoles = "";
			this.cargas.horariojueves = "";
			this.cargas.horarioviernes = "";
			this.cargas.nombreMaestro = "";
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
				const cupo = this.grupoActualizar.limitealumnos;
				if (inscritos === cupo) {
					this.mostrarError = true;
					this.errorMensaje = "El grupo ya esta lleno.";
					return false;
				}
				return true;
			};

			let estatus = await traeEstatus("alumnos", this.cargas.ncontrol);
			const validaAlumnoEstatus = () => {
				if (estatus[0].estatus === "B") {
					this.mostrarError = true;
					this.errorMensaje = "El alumno esta dado de baja.";
					return false;
				}
				return true;
			};

			const validaAlumnoHorario = () => {
				let band = true;
				const horario = this.clavegrupos[0].horariolunes;
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
					validaAlumnoEstatus()
				) {
					await actualiza("grupos/inscritos", this.clavegrupo, {
						clavegrupo: this.cargas.clavegrupo,
						inscritos: this.grupoActualizar.inscritos + 1,
					});
					await agrega("cargas", {
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
