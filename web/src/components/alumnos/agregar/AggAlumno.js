import AlumnosLista from "../lista/AlumnosLista.vue";
import {obtenConClave, agrega} from "@/utils/peticiones";

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
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
					return false;
				}
				return true;
			};

			try {
				if (validaDatos()) {
					const res = await obtenConClave("alumnos", this.alumnos.ncontrol);
					if (res.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya existe, no se puede agregar.";
					} else {
						const response = await agrega("alumnos", {
							ncontrol: this.alumnos.ncontrol,
							nombre: this.alumnos.nombre,
							carrera: this.alumnos.carrera,
							estatus: this.alumnos.estatus,
						});
						this.$router.push("/alumnos");
					}
				}
			} catch (error) {
				console.error("Error al agregar el alumno:", error);
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
