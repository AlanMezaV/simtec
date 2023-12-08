import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import GruposLista from "../lista/GruposLista.vue";
import {traeDatosGrupos, traeEstatus, traeCreditos} from "@/utils/peticiones";

export default {
	name: "FormAggGrupo",
	components: {
		GruposLista,
	},
	data: function () {
		return {
			grupos: [],
			clavematerias: [],
			clavemaestros: [],
			horarioMaestros: [],
			mostrarError: false,
			placeholderHorarioViernes: "Introduce el horario",
			inputDeshabilitado: false,
			errorMensaje: "",
		};
	},
	created() {
		this.obtenerMaterias();
		this.obtenerMaestros();
	},
	watch: {
		"grupos.clavemateria": "deshabilitarViernes",
	},
	methods: {
		async deshabilitarViernes() {
			let creditos = await traeCreditos(this.grupos.clavemateria);
			console.log(creditos[0].creditos);
			if (creditos[0].creditos == 4) {
				this.inputDeshabilitado = true;
				this.placeholderHorarioViernes = "Materia con 4 creditos";
			}
		},
		async obtenerMaterias() {
			try {
				const response = await axios.get(`${URL_DATOS}/materias`);
				this.clavematerias = response.data;
			} catch (error) {
				console.error("Error al obtener materias:", error);
			}
		},
		async obtenerMaestros() {
			try {
				const response = await axios.get(`${URL_DATOS}/maestros`);
				this.clavemaestros = response.data;
			} catch (error) {
				console.error("Error al obtener maestros:", error);
			}
		},
		validarSoloNumerosClave() {
			this.grupos.clavegrupo = this.grupos.clavegrupo.replace(/\D/g, "");
		},
		agregarGrupo: async function () {
			let creditos = await traeCreditos(this.grupos.clavemateria);
			const validaDatos = () => {
				if (creditos[0].creditos == 4) {
					if (
						this.grupos.clavegrupo == undefined ||
						this.grupos.limitealumnos == undefined ||
						this.grupos.clavegrupo == "" ||
						this.grupos.limitealumnos == "" ||
						this.grupos.horariolunes == "" ||
						this.grupos.horariolunes == undefined ||
						this.grupos.horariomartes == "" ||
						this.grupos.horariomartes == undefined ||
						this.grupos.horariomiercoles == "" ||
						this.grupos.horariomiercoles == undefined ||
						this.grupos.horariojueves == "" ||
						this.grupos.horariojueves == undefined
					) {
						this.mostrarError = true;
						this.errorMensaje = "Solo se acepta que este vacio el horario viernes.";
						return false;
					}
				} else {
					if (
						this.grupos.clavegrupo == undefined ||
						this.grupos.limitealumnos == undefined ||
						this.grupos.clavegrupo == "" ||
						this.grupos.limitealumnos == "" ||
						this.grupos.horariolunes == "" ||
						this.grupos.horariolunes == undefined ||
						this.grupos.horariomartes == "" ||
						this.grupos.horariomartes == undefined ||
						this.grupos.horariomiercoles == "" ||
						this.grupos.horariomiercoles == undefined ||
						this.grupos.horariojueves == "" ||
						this.grupos.horariojueves == undefined ||
						this.grupos.horarioviernes == "" ||
						this.grupos.horarioviernes == undefined
					) {
						this.mostrarError = true;
						this.errorMensaje = "No se aceptan vacios.";
						return false;
					}
				}
				return true;
			};

			this.horarioMaestros = await traeDatosGrupos("horarioMaestro", this.grupos.clavemaestro);
			const validaMaestroHorario = () => {
				let band = true;
				const hora = this.grupos.horariolunes;
				this.horarioMaestros.forEach((horario) => {
					if (hora === horario.horariolunes) {
						this.mostrarError = true;
						this.errorMensaje = "El maestro ya tiene una materia en ese horario.";
						band = false;
					}
				});
				return band;
			};

			const validaHoras = () => {
				console.log(this.placeholderHorarioViernes === "Materia con 4 creditos");
				if (this.placeholderHorarioViernes === "Materia con 4 creditos") {
					if (
						this.grupos.horariomartes !== this.grupos.horariolunes ||
						this.grupos.horariomiercoles !== this.grupos.horariolunes ||
						this.grupos.horariojueves !== this.grupos.horariolunes
					) {
						this.grupos.horarioviernes = "";
						this.mostrarError = true;
						this.errorMensaje = "Todas las horas registradas tienen que ser iguales.";
						return false;
					}
				} else if (
					this.grupos.horariomartes !== this.grupos.horariolunes ||
					this.grupos.horariomiercoles !== this.grupos.horariolunes ||
					this.grupos.horariojueves !== this.grupos.horariolunes ||
					this.grupos.horarioviernes !== this.grupos.horariolunes
				) {
					this.mostrarError = true;
					this.errorMensaje = "Todas las horas registradas tienen que ser iguales.";
					return false;
				}
				return true;
			};

			let estatus = await traeEstatus("maestros", this.grupos.clavemaestro);
			const validaMaestroEstatus = () => {
				if (estatus[0].estatus === "B") {
					this.mostrarError = true;
					this.errorMensaje = "El maestro esta dado de baja.";
					return false;
				}
				return true;
			};

			try {
				if (validaDatos() && validaMaestroHorario() && validaMaestroEstatus() && validaHoras()) {
					const response = await axios.get(`${URL_DATOS}/grupos/${this.grupos.clavegrupo}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El grupo ya existe, no se puede agregar.";
					} else {
						const res = await axios.post(URL_DATOS + "/grupos", {
							clavemateria: this.grupos.clavemateria,
							clavegrupo: this.grupos.clavegrupo,
							clavemaestro: this.grupos.clavemaestro,
							limitealumnos: this.grupos.limitealumnos,
							inscritos: 0,
							horariolunes: this.grupos.horariolunes,
							horariomartes: this.grupos.horariomartes,
							horariomiercoles: this.grupos.horariomiercoles,
							horariojueves: this.grupos.horariojueves,
							horarioviernes: this.grupos.horarioviernes,
						});
						this.$router.push("/grupos");
					}
				}
			} catch (error) {
				console.error("Error al verificar la existencia del grupo:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/grupos");
		},
	},
};
