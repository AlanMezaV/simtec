import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import MateriasLista from "../lista/MateriasLista.vue";
import {traeDatos} from "@/utils/peticiones";

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
			visible: false,
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.materias = await traeDatos("materias", this.clavemateria);
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
					return false;
				}
				return true;
			};

			try {
				if (validaDatos()) {
					const res = await axios.put(URL_DATOS + "/materias/" + this.clavemateria, {
						id: this.materias.clavemateria,
						nom: this.materias.nombre,
						cre: this.materias.creditos,
					});
					console.log(res);
					this.$router.push("/materias");
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
