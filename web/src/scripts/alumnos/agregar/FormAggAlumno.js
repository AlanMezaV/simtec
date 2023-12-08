import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import AlumnosLista from "./AlumnosLista.vue";

export default {
	name: "FormAggAlumno",
	components: {
		AlumnosLista,
	},
	data: function () {
		return {
			alumnos: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	methods: {
		validarSoloNumerosClave() {
			this.alumnos.ncontrol = this.alumnos.ncontrol.replace(/\D/g, "");
		},
		agregarAlumno: async function () {
			const validaDatos = () => {
				if (
					this.alumnos.ncontrol == undefined ||
					this.alumnos.nombre == undefined ||
					this.alumnos.ncontrol == "" ||
					this.alumnos.nombre == "" ||
					this.alumnos.carrera == undefined ||
					this.alumnos.carrera == "" ||
					this.alumnos.estatus == undefined ||
					this.alumnos.estatus == ""
				) {
					return false;
				}
				return true;
			};

			try {
				// Realiza una solicitud GET para verificar si la materia ya existe
				if (validaDatos()) {
					const response = await axios.get(`${URL_DATOS}/alumnos/${this.alumnos.ncontrol}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya existe, no se puede agregar.";
					} else {
						const res = await axios.post(URL_DATOS + "/alumnos", {
							ncontrol: this.alumnos.ncontrol,
							nombre: this.alumnos.nombre,
							carrera: this.alumnos.carrera,
							estatus: this.alumnos.estatus,
						});
						this.$router.push("/alumnos");
					}
				} else {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
				}
			} catch (error) {
				console.error("Error al verificar la existencia de la materia:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/alumnos");
		},
	},
};
