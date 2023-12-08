import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import {obtenerDatos} from "@/utils/peticiones";
import Error from "../../mensajes/Error.vue";
import ConfirmaEliminar from "../../mensajes/ConfirmaEliminar.vue";

export default {
	name: "MaestrosLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_maestros: [],
			mostrarError: false,
			mostrarConfirma: false,
			clavemaestroSeleccionado: null,
		};
	},
	async created() {
		this.lista_maestros = await obtenerDatos("maestros");
	},
	methods: {
		getEstatus(estatus) {
			if (estatus === "V") {
				estatus = "Vigente";
			} else if (estatus === "B") {
				estatus = "Baja";
			} else {
				estatus = "Desconocido";
			}
			return estatus;
		},
		nuevoMaestro: function () {
			this.lista_maestros.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-maestro", params: {}});
		},
		mostrarOpciones(maestros) {
			this.lista_maestros.forEach((m) => {
				if (m !== maestros) {
					m.mostrarOpciones = false;
				}
			});
			maestros.mostrarOpciones = !maestros.mostrarOpciones;
		},
		editarMaestro: function (maestros) {
			maestros.mostrarOpciones = !maestros.mostrarOpciones;
			this.$router.push({name: "editar-maestro", params: {clavemaestro: maestros.clavemaestro}});
		},
		eliminar: async function (maestros) {
			this.clavemaestroSeleccionado = maestros.clavemaestro;
			this.mostrarConfirma = true;
			maestros.mostrarOpciones = !maestros.mostrarOpciones;
		},
		eliminarMaestro: async function (clavemaestro) {
			const response = await axios.get(`${URL_DATOS}/grupoMaestro/${clavemaestro}`);
			if (response.data.length > 0) {
				this.mostrarError = true;
				this.mostrarConfirma = false;
			} else {
				const res = await axios.delete(URL_DATOS + "/maestros/" + clavemaestro);
				this.lista_maestros = await obtenerDatos("maestros");
				this.mostrarConfirma = false;
			}
		},
		cerrarError() {
			console.log("cerrar error");
			this.mostrarError = false;
		},
		cerrarConfirma() {
			this.mostrarConfirma = false;
		},
	},
};
