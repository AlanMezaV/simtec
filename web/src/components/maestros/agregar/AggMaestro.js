import MaestrosLista from "../lista/MaestrosLista.vue";
import {obtenConClave, agrega} from "@/utils/peticiones";

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
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
					return false;
				}
				return true;
			};

			try {
				if (validaDatos()) {
					const response = await obtenConClave("maestros", this.maestros.clavemaestro);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El maestro ya existe, no se puede agregar.";
					} else {
						await agrega("maestros", {
							clavemaestro: this.maestros.clavemaestro,
							nombre: this.maestros.nombre,
							departamento: this.maestros.departamento,
							estatus: this.maestros.estatus,
						});
						this.$router.push("/maestros");
					}
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
