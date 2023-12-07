<template>
	<div class="contenedor-principal">
		<div class="AlumnosLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Alumnos</h2>
				<button @click.prevent="nuevoAlumno" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="" />
					Agregar Alumno
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado">
						<div>Numero de control</div>
						<div>Nombre</div>
						<div>Carrera</div>
						<div>Estatus</div>
						<div></div>
					</div>
					<div class="contenedor-datos">

						<div v-for="alumnos in lista_alumnos" :key="alumnos.ncontrol" class="datos">
							<span class="espacio">{{ alumnos.ncontrol }}</span>
							<span class="espacio">{{ alumnos.nombre }}</span>
							<span class="espacio">{{ alumnos.carrera }}</span>
							<span class="espacio estatus">{{ getEstatus(alumnos.estatus) }}</span>
							<span class="espacio">
								<button @click="mostrarOpciones(alumnos)" class="boton-acciones">···</button>
								<div v-if="alumnos.mostrarOpciones" class="menu-desplegable">
									<div>
										<img src="../../../public/images/lapiz.svg" alt="" />
										<button @click.prevent="editarAlumno(alumnos)">Editar</button>
									</div>
									<div>
										<img src="../../../public/images/basura.svg" alt="" />
										<button @click="eliminar(alumnos)">Eliminar</button>
									</div>
								</div>
							</span>
							<div v-if="mostrarConfirma && alumnos.ncontrol === numeroControlSeleccionado">
							<ConfirmaEliminar
								:mensaje="'Estas seguro que quieres eliminar el alumno: ' + alumnos.nombre"
								@si="eliminarAlumno(numeroControlSeleccionado)"
								@cerrar="cerrarConfirma"
								></ConfirmaEliminar>
							</div>
							<div v-if="mostrarError">
								<Error
								error="No se puede eliminar este maestro ya tiene asignados grupos."
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
import axios from "axios";
import {URL_DATOS} from "@/utils/constants.js";
import {obtenerDatos} from "@/utils/peticiones";
import Error from "../mensajes/Error.vue";
import ConfirmaEliminar from "../mensajes/ConfirmaEliminar.vue";

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
			} else {
				estatus = "Desconocido";
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
			const response = await axios.get(`${URL_DATOS}/cargaAlumno/${ncontrol}`);
			if (response.data.length > 0) {
				this.mostrarError = true;
				this.mostrarConfirma = false;
			} else {
				const res = await axios.delete(URL_DATOS + "/alumnos/" + ncontrol);
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
</script>

<style global src="../../styles/variables.css"></style>
<style scoped src="../../styles/vistas.css"></style>
