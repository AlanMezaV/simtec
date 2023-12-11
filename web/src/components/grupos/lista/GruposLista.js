import {elimina, obtenerDatos, obtenConClave} from "@/utils/peticiones";
import Error from "../../mensajes/Error.vue";
import ConfirmaEliminar from "../../mensajes/ConfirmaEliminar.vue";

export default {
	name: "GruposLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_grupos: [],
			clavematerias: [],
			clavemaestros: [],
			mostrarError: false,
			mostrarConfirma: false,
			clavegrupoSeleccionada: null,
		};
	},
	async created() {
		this.lista_grupos = await obtenerDatos("grupos");
		this.clavematerias = await obtenerDatos("materias");
		this.clavemaestros = await obtenerDatos("maestros");
	},
	methods: {
		getNombreMateria(claveMateria) {
			const materia = this.clavematerias.find((materia) => materia.clavemateria === claveMateria);
			return materia ? materia.nombre : "Materia no encontrada";
		},
		getNombreMaestro(claveMaestro) {
			const maestro = this.clavemaestros.find((maestro) => maestro.clavemaestro === claveMaestro);
			return maestro ? maestro.nombre : "Maestro no encontrado";
		},
		nuevoGrupo: function () {
			this.lista_grupos.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-grupo", params: {}});
		},
		mostrarOpciones(grupos) {
			this.lista_grupos.forEach((m) => {
				if (m !== grupos) {
					m.mostrarOpciones = false;
				}
			});
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
		},
		editarGrupo: function (grupos) {
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
			this.$router.push({
				name: "editar-grupo",
				params: {clavegrupo: grupos.clavegrupo, horaAnterior: grupos.horariolunes},
			});
		},
		eliminar: async function (grupos) {
			this.clavegrupoSeleccionada = grupos.clavegrupo;
			this.mostrarConfirma = true;
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
		},
		eliminarGrupo: async function (clavegrupo) {
			const response = await obtenConClave("cargaGrupo", clavegrupo);
			if (response.data.length > 0) {
				this.mostrarError = true;
				this.mostrarConfirma = false;
			} else {
				await elimina("grupos", clavegrupo);
				this.lista_grupos = await obtenerDatos("grupos");
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
