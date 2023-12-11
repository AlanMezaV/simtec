import GruposLista from "../lista/GruposLista.vue";
import {
	obtenerDatos,
	traeDatosGrupos,
	traeEstatus,
	traeCreditos,
	actualiza,
	obtenDatosEditar,
} from "@/utils/peticiones";

export default {
	name: "FormEditarGrupo",
	components: {
		GruposLista,
	},
	props: {
		clavegrupo: {
			type: String,
		},
		horaAnterior: {
			type: String,
		},
	},
	data: function () {
		return {
			grupos: [],
			clavematerias: [],
			clavemaestros: [],
			horarioMaestros: [],
			mostrarError: false,
			inputDeshabilitado: false,
			errorMensaje: "",
		};
	},
	watch: {
		"grupos.clavemateria": "deshabilitarViernes",
	},
	async created() {
		this.grupos = await obtenDatosEditar("grupos", this.clavegrupo);
		console.log(this.grupos);
		this.clavematerias = await obtenerDatos("materias");
		this.clavemaestros = await this.filtrarMaestros();
	},
	methods: {
		async filtrarMaestros() {
			this.clavemaestros = await obtenerDatos("maestros");
			return this.clavemaestros.filter((maestro) => maestro.estatus === "V");
		},
		async deshabilitarViernes() {
			let creditos = await traeCreditos(this.grupos.clavemateria);
			if (creditos[0].creditos == 4) {
				this.grupos.horarioviernes = "";
				this.inputDeshabilitado = true;
			} else {
				this.inputDeshabilitado = false;
			}
		},
		editarGrupo: async function () {
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

			const validaHoras = () => {
				console.log(this.placeholderHorarioViernes === "Materia con 4 creditos");
				if (this.grupos.horarioviernes === "") {
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

			this.horarioMaestros = await traeDatosGrupos("horarioMaestro", this.grupos.clavemaestro);
			const validaMaestroHorario = () => {
				let band = true;
				const hora = this.grupos.horariolunes;
				this.horarioMaestros.forEach((horario) => {
					if (hora === horario.horariolunes && this.grupos.horariolunes !== this.horaAnterior) {
						this.mostrarError = true;
						this.errorMensaje = "El maestro ya tiene una materia en ese horario.";
						band = false;
					}
				});
				return band;
			};
			try {
				if (validaDatos() && validaMaestroHorario() && validaMaestroEstatus() && validaHoras()) {
					await actualiza("grupos", this.clavegrupo, {
						clavemateria: this.grupos.clavemateria,
						clavegrupo: this.grupos.clavegrupo,
						clavemaestro: this.grupos.clavemaestro,
						limitealumnos: this.grupos.limitealumnos,
						inscritos: this.grupos.inscritos,
						horariolunes: this.grupos.horariolunes,
						horariomartes: this.grupos.horariomartes,
						horariomiercoles: this.grupos.horariomiercoles,
						horariojueves: this.grupos.horariojueves,
						horarioviernes: this.grupos.horarioviernes,
					});
					this.$router.push("/grupos");
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
