<template>
	<div class="contenedor">
		<div class="AlumnosLista">
			<div class="contenedor-encabezado">
				<h2>Alumnos</h2>
				<button @click.prevent="nuevoAlumno" class="boton-agregar	">
					<img src="../../../public/images/boton-mas.svg" alt="">
					Agregar Alumno
				</button>
			</div>
			<div></div>
			<div class="contenedor-tabla">	
				<div class="tabla">
					<div class="tabla-encabezado">
					<div class="t-header">Numero de control</div>
					<div class="t-header">Nombre</div>
					<div class="t-header">Carrera</div>
					<div class="t-header">Estatus</div>
					<div class="t-header"></div>
				</div>
					
					<div v-for="alumnos in lista_alumnos" :key="alumnos.ncontrol" class="datos">
							<span class="espacio">{{ alumnos.ncontrol }}</span>
							<span class="espacio">{{ alumnos.nombre }}</span>
							<span class="espacio">{{ alumnos.carrera }}</span>
							<span class="espacio estatus">{{ alumnos.estatus }}</span>
							<span class="espacio">
								<button @click="mostrarOpciones(alumnos)" class="boton-acciones">···</button>
								<div v-if="alumnos.mostrarOpciones" class="menu-desplegable">
									<button @click.prevent="editarAlumno(alumnos)">Editar</button>
									<br />
									<button @click="eliminarAlumno(alumnos)">Eliminar</button>
								</div>
							</span>
					</div>
				<!-- <table>
					<thead>
						<tr>
							<th>Numero de control</th>
							<th>Nombre</th>
							<th>Carrera</th>
							<th>Estatus</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="alumnos in lista_alumnos" :key="alumnos.ncontrol">
							<td class="espacio">{{ alumnos.ncontrol }}</td>
							<td class="espacio">{{ alumnos.nombre }}</td>
							<td class="espacio">{{ alumnos.carrera }}</td>
							<td class="espacio">{{ alumnos.estatus }}</td>
							<td class="espacio">
								<button @click="mostrarOpciones(alumnos)">...</button>
								<div v-if="alumnos.mostrarOpciones" class="menu-desplegable">
									<button @click.prevent="editarAlumno(alumnos)">Editar</button>
									<br />
									<button @click="eliminarAlumno(alumnos)">Eliminar</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import {URL_DATOS} from "@/utils/constants.js";
import {obtenerDatos} from "@/utils/peticiones";

export default {
	name: "AlumnosLista",
	components: {},
	data: function () {
		return {
			lista_alumnos: [],
		};
	},
	async created() {
		this.lista_alumnos = await obtenerDatos("alumnos");
	},
	methods: {
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
		eliminarAlumno: async function (alumnos) {
			alumnos.mostrarOpciones = !alumnos.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/alumnos/" + alumnos.ncontrol);
			console.log(res);
			this.lista_alumnos = await obtenerDatos("alumnos");
		},
	},
};
</script>

<style global src="../../styles/variables.css"></style>
<style scoped src="../../styles/alumnos-lista.css"></style>
