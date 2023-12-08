import AlumnosLista from "../lista/AlumnosLista.vue";
import {obtenDatosEditar, actualiza} from "@/utils/peticiones";

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
			errorMensaje: "",
		};
	},
	async created() {
		this.alumnos = await obtenDatosEditar("alumnos", this.ncontrol);
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
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
					return false;
				}
				return true;
			};

			try {
				if (validaDatos()) {
					const response = await actualiza("alumnos", this.ncontrol, {
						ncontrol: this.alumnos.ncontrol,
						nombre: this.alumnos.nombre,
						carrera: this.alumnos.carrera,
						estatus: this.alumnos.estatus,
					});
					this.$router.push("/alumnos");
				}
			} catch (error) {
				console.error("Error al actualizar el alumno", error);
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
