import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import AlumnosLista from "../lista/AlumnosLista.vue";
import {traeDatos} from "@/utils/peticiones";

export default {
	name: "FormEditarAlumno",
	components: {
		AlumnosLista,
	},
	props: {
		ncontrol: {
			type: Number,
		},
	},
	data: function () {
		return {
			alumnos: [],
			mostrarError: false,
			visible: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.alumnos = await traeDatos("alumnos", this.ncontrol);
	},
	methods: {
		editarAlumno: async function () {
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
					const res = await axios.put(URL_DATOS + "/alumnos/" + this.ncontrol, {
						ncontrol: this.alumnos.ncontrol,
						nombre: this.alumnos.nombre,
						carrera: this.alumnos.carrera,
						estatus: this.alumnos.estatus,
					});
					this.$router.push("/alumnos");
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
