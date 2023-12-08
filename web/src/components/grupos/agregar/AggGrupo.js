import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import GruposLista from "../lista/GruposLista.vue";
import {traeDatosGrupos} from "@/utils/peticiones";

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
			errorMensaje: "",
		};
	},
	created() {
		this.obtenerMaterias();
		this.obtenerMaestros();
	},
	methods: {
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
			const validaDatos = () => {
				if (
					this.grupos.clavegrupo == undefined ||
					this.grupos.limitealumnos == undefined ||
					this.grupos.clavegrupo == "" ||
					this.grupos.limitealumnos == ""
				) {
					this.mostrarError = true;
					this.errorMensaje = "Solo se acepta que este vacio el horario.";
					return false;
				}
				return true;
			};
			this.horarioMaestros = await traeDatosGrupos("horarioMaestro", this.grupos.clavemaestro);
			const validaMaestroHorario = () => {
				let band = true;
				const hora = this.grupos.horariolunes;
				this.horarioMaestros.forEach((horario) => {
					console.log(hora);
					console.log(horario.horariolunes);
					if (hora === horario.horariolunes) {
						console.log("entro", hora === horario.horariolunes);
						this.mostrarError = true;
						this.errorMensaje = "El maestro ya tiene una materia en ese horario.";
						band = false;
					}
				});
				return band;
			};

			try {
				if (validaDatos() && validaMaestroHorario()) {
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
