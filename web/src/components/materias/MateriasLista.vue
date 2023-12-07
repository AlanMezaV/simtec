<template>
	<div class="contenedor-principal">
		<div class="MateriasLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Materias</h2>
				<button @click.prevent="nuevaMateria" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="" />
					Agregar Materia
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado-materias">
						<div>Clave materia</div>
						<div>Nombre</div>
						<div>Creditos</div>
						<div></div>
					</div>
					<div class="contenedor-datos">

						<div v-for="materias in lista_materias" :key="materias.clavemateria" class="datos-materias">
							<span class="espacio">{{ materias.clavemateria }}</span>
							<span class="espacio">{{ materias.nombre }}</span>
							<span class="espacio">{{ materias.creditos }}</span>
							<span class="espacio">
								<button @click="mostrarOpciones(materias)" class="boton-acciones">···</button>
								<div v-if="materias.mostrarOpciones" class="menu-desplegable">
									<button @click.prevent="editarMateria(materias)">Editar</button>
									<br />
									<button @click="eliminar(materias)">Eliminar</button>
								</div>
							</span>
							<div v-if="mostrarConfirma && materias.clavemateria === clavemateriaSeleccionada">
								<ConfirmaEliminar
								:mensaje="'Estas seguro que quieres eliminar la materia: ' + materias.nombre"
								@si="eliminarMateria(clavemateriaSeleccionada)"
								@cerrar="cerrarConfirma"
								></ConfirmaEliminar>
							</div>
							<div v-if="mostrarError">
								<Error
								error="No se puede eliminar esta materia ya tiene asignada grupos."
								@cerrar="cerrarError"
								></Error>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import {obtenerDatos} from "@/utils/peticiones";
import Error from "../mensajes/Error.vue";
import ConfirmaEliminar from "../mensajes/ConfirmaEliminar.vue";

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
			const response = await axios.get(`${URL_DATOS}/grupoMateria/${clavemateria}`);
			if (response.data.length > 0) {
				this.mostrarError = true;
				this.mostrarConfirma = false;
			} else {
				const res = await axios.delete(URL_DATOS + "/materias/" + clavemateria);
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
</script>

<style scoped src="../../styles/vistas.css"></style>
<style scoped src="../../styles/vista-materia.css"></style>
