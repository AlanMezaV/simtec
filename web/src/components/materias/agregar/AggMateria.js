import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import MateriasLista from "../lista/MateriasLista.vue";

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
			// Elimina caracteres no numéricos del valor de clavemateria
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
					return false;
				}
				return true;
			};

			try {
				// Realiza una solicitud GET para verificar si la materia ya existe
				if (validaDatos()) {
					const response = await axios.get(`${URL_DATOS}/materias/${this.materias.clavemateria}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "La materia ya existe. No se puede agregar una duplicada.";
					} else {
						const res = await axios.post(URL_DATOS + "/materias", {
							cla: this.materias.clavemateria,
							nom: this.materias.nombre,
							cre: this.materias.creditos,
						});
						this.$router.push("/materias");
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
			this.$router.push("/materias");
		},
	},
};
