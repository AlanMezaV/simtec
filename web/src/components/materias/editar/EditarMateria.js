import MateriasLista from "../lista/MateriasLista.vue";
import {obtenDatosEditar, actualiza} from "@/utils/peticiones";

export default {
	name: "FormEditarMateria",
	components: {
		MateriasLista,
	},
	props: {
		clavemateria: {
			type: String,
		},
	},
	data: function () {
		return {
			materias: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.materias = await obtenDatosEditar("materias", this.clavemateria);
	},
	methods: {
		validarSoloNumerosClave() {
			this.materias.clavemateria = this.materias.clavemateria.replace(/\D/g, "");
		},
		validarSoloNumerosCreditos() {
			this.materias.creditos = this.materias.creditos.replace(/\D/g, "");
		},
		editarMateria: async function () {
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
					await actualiza("materias", this.clavemateria, {
						id: this.materias.clavemateria,
						nom: this.materias.nombre,
						cre: this.materias.creditos,
					});
					this.$router.push("/materias");
				}
			} catch (error) {
				console.error("Error al actualizar la materia:", error);
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
