import MateriasLista from "../lista/MateriasLista.vue";
import {obtenConClave, agrega} from "@/utils/peticiones";

export default {
	name: "FormAggMateria",
	components: {
		MateriasLista,
	},
	data: function () {
		return {
			materias: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	methods: {
		validarSoloNumerosClave() {
			this.materias.clavemateria = this.materias.clavemateria.replace(/\D/g, "");
		},
		validarSoloNumerosCreditos() {
			this.materias.creditos = this.materias.creditos.replace(/\D/g, "");
		},
		agregarMateria: async function () {
			const validaDatos = () => {
				if (
					this.materias.clavemateria == undefined ||
					this.materias.creditos == undefined ||
					this.materias.clavemateria == "" ||
					this.materias.creditos == "" ||
					this.materias.nombre == undefined ||
					this.materias.nombre == ""
				) {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
					return false;
				}
				return true;
			};

			try {
				if (validaDatos()) {
					const response = await obtenConClave("materias", this.materias.clavemateria);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "La materia ya existe. No se puede agregar una duplicada.";
					} else {
						await agrega("materias", {
							cla: this.materias.clavemateria,
							nom: this.materias.nombre,
							cre: this.materias.creditos,
						});
						this.$router.push("/materias");
					}
				}
			} catch (error) {
				console.error("Error al verificar la existencia de la materia:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/materias");
		},
	},
};
