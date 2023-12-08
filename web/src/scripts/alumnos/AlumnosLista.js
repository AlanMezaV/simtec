import {obtenerDatos, traeCargaAlumnos, elimina} from "@/utils/peticiones";
import Error from "@/components/mensajes/Error.vue";
import ConfirmaEliminar from "@/components/mensajes/ConfirmaEliminar.vue";

export default {
	name: "AlumnosLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_alumnos: [],
			mostrarError: false,
			mostrarConfirma: false,
			numeroControlSeleccionado: null,
		};
	},
	async created() {
		this.lista_alumnos = await obtenerDatos("alumnos");
	},
	methods: {
		getEstatus(estatus) {
			if (estatus === "V") {
				estatus = "Vigente";
			} else if (estatus === "B") {
				estatus = "Baja";
			}
			return estatus;
		},
		nuevoAlumno: function () {
			this.lista_alumnos.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-alumno", params: {}});
		},
		mostrarOpciones(alumnos) {
			this.lista_alumnos.forEach((m) => {
				if (m !== alumnos) {
					m.mostrarOpciones = false;
				}
			});
			alumnos.mostrarOpciones = !alumnos.mostrarOpciones;
		},
		editarAlumno: function (alumnos) {
			alumnos.mostrarOpciones = !alumnos.mostrarOpciones;
			this.$router.push({name: "editar-alumno", params: {ncontrol: alumnos.ncontrol}});
		},
		eliminar: async function (alumnos) {
			this.numeroControlSeleccionado = alumnos.ncontrol;
			this.mostrarConfirma = true;
			alumnos.mostrarOpciones = !alumnos.mostrarOpciones;
		},
		eliminarAlumno: async function (ncontrol) {
			const response = await traeCargaAlumnos(ncontrol);
			if (response.data.length > 0) {
				this.mostrarError = true;
				this.mostrarConfirma = false;
			} else {
				await elimina("alumnos", ncontrol);
				this.lista_alumnos = await obtenerDatos("alumnos");
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
