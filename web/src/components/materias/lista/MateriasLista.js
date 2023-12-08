import {obtenerDatos, elimina, obtenConClave} from "@/utils/peticiones";
import Error from "../../mensajes/Error.vue";
import ConfirmaEliminar from "../../mensajes/ConfirmaEliminar.vue";

export default {
	name: "MateriasLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_materias: [],
			clavemateriaSeleccionada: null,
			mostrarError: false,
			mostrarConfirma: false,
		};
	},
	async created() {
		this.lista_materias = await obtenerDatos("materias");
	},
	methods: {
		nuevaMateria: function () {
			this.lista_materias.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-materia", params: {}});
		},
		mostrarOpciones(materias) {
			this.lista_materias.forEach((m) => {
				if (m !== materias) {
					m.mostrarOpciones = false;
				}
			});
			materias.mostrarOpciones = !materias.mostrarOpciones;
		},
		editarMateria: function (materias) {
			materias.mostrarOpciones = !materias.mostrarOpciones;
			this.$router.push({name: "editar-materia", params: {clavemateria: materias.clavemateria}});
		},
		eliminar: async function (materias) {
			this.clavemateriaSeleccionada = materias.clavemateria;
			this.mostrarConfirma = true;
			materias.mostrarOpciones = !materias.mostrarOpciones;
		},
		eliminarMateria: async function (clavemateria) {
			const response = await obtenConClave("grupoMateria", clavemateria);
			if (response.data.length > 0) {
				this.mostrarError = true;
				this.mostrarConfirma = false;
			} else {
				await elimina("materias", clavemateria);
				this.lista_materias = await obtenerDatos("materias");
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
