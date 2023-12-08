import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import MaestrosLista from "../lista/MaestrosLista.vue";

export default {
	name: "FormAggMaestro",
	components: {
		MaestrosLista,
	},
	data: function () {
		return {
			maestros: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	methods: {
		validarSoloNumerosClave() {
			// Elimina caracteres no numéricos del valor de clavemateria
			this.maestros.clavemaestro = this.maestros.clavemaestro.replace(/\D/g, "");
		},
		agregarMaestro: async function () {
			const validaDatos = () => {
				if (
					this.maestros.clavemaestro == undefined ||
					this.maestros.nombre == undefined ||
					this.maestros.clavemaestro == "" ||
					this.maestros.nombre == "" ||
					this.maestros.departamento == undefined ||
					this.maestros.departamento == "" ||
					this.maestros.estatus == undefined ||
					this.maestros.estatus == ""
				) {
					return false;
				}
				return true;
			};

			try {
				// Realiza una solicitud GET para verificar si la materia ya existe
				if (validaDatos()) {
					const response = await axios.get(`${URL_DATOS}/maestros/${this.maestros.clavemaestro}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El maestro ya existe, no se puede agregar.";
					} else {
						const res = await axios.post(URL_DATOS + "/maestros", {
							clavemaestro: this.maestros.clavemaestro,
							nombre: this.maestros.nombre,
							departamento: this.maestros.departamento,
							estatus: this.maestros.estatus,
						});
						this.$router.push("/maestros");
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
			this.$router.push("/maestros");
		},
	},
};
