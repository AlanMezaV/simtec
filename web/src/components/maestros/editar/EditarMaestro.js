import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import MaestrosLista from "../lista/MaestrosLista.vue";
import {traeDatos, traeEstatus} from "@/utils/peticiones";

export default {
	name: "FormEditarMaestro",
	components: {
		MaestrosLista,
	},
	props: {
		clavemaestro: {
			type: Number,
		},
	},
	data: function () {
		return {
			maestros: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.maestros = await traeDatos("maestros", this.clavemaestro);
	},
	methods: {
		editarMaestro: async function () {
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
				if (validaDatos()) {
					const res = await axios.put(URL_DATOS + "/maestros/" + this.clavemaestro, {
						clavemaestro: this.maestros.clavemaestro,
						nombre: this.maestros.nombre,
						departamento: this.maestros.departamento,
						estatus: this.maestros.estatus,
					});
					this.$router.push("/maestros");
				} else {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
				}
			} catch (error) {
				console.error("Error al verificar la existencia del maestro:", error);
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
