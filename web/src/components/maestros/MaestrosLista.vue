<template>
	<div class="contenedor-principal">
		<div class="MaestrosLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Maestros</h2>
				<button @click.prevent="nuevoMaestro" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="" />
					Agregar Maestro
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado">
						<div>Clave maestro</div>
						<div>Nombre</div>
						<div>Departamento</div>
						<div>Estatus</div>
						<div></div>
					</div>
					<div class="contenedor-datos">

						<div v-for="maestros in lista_maestros" :key="maestros.clavemaestro" class="datos">
							<span class="espacio">{{ maestros.clavemaestro }}</span>
							<span class="espacio">{{ maestros.nombre }}</span>
							<span class="espacio">{{ maestros.departamento }}</span>
							<span class="espacio estatus">{{ getEstatus(maestros.estatus) }}</span>
							<span class="espacio">
								<button @click="mostrarOpciones(maestros)" class="boton-acciones">···</button>
								<div v-if="maestros.mostrarOpciones" class="menu-desplegable">
									<div>
										<img src="../../../public/images/lapiz.svg" alt="" />
										<button @click.prevent="editarMaestro(maestros)">Editar</button>
									</div>
									<div>
										<img src="../../../public/images/basura.svg" alt="" />
										<button @click="eliminar(maestros)">Eliminar</button>
									</div>
								</div>
							</span>
							<div v-if="mostrarConfirma && maestros.clavemaestro === clavemaestroSeleccionado">
								<ConfirmaEliminar
								:clave="clavemaestroSeleccionado"
								:mensaje="'Estas seguro que quieres eliminar el maestro: ' + maestros.nombre"
								@si="eliminarMaestro(clavemaestroSeleccionado)"
								@cerrar="cerrarConfirma"
								></ConfirmaEliminar>
							</div>
							<div v-if="mostrarError">
								<Error
								error="No se puede eliminar este alumno ya que tiene materias cargadas."
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
</script>

<style scoped src="../../styles/vistas.css"></style>
