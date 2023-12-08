import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import GruposLista from "../lista/GruposLista.vue";
import {traeDatos, obtenerDatos, traeDatosGrupos} from "@/utils/peticiones";

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
			errorMensaje: "",
		};
	},
	async created() {
		this.grupos = await traeDatos("grupos", this.clavegrupo);
		console.log(this.grupos);
		this.clavematerias = await obtenerDatos("materias");
		this.clavemaestros = await obtenerDatos("maestros");
	},
	methods: {
		editarGrupo: async function () {
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
					if (hora === horario.horariolunes && this.grupos.horariolunes !== this.horaAnterior) {
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
					const res = await axios.put(URL_DATOS + "/grupos/" + this.clavegrupo, {
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
