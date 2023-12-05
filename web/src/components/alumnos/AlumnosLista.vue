<template>
	<div class="contenedor">
		<div class="AlumnosLista">
			<span>Alumnos</span>
			<button @click.prevent="nuevoAlumno">Agregar</button>
			<table>
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
			</table>
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

<style>
:root {
	--white-smoke: #f1f2f4;
}
.AlumnosLista {
	width: 79%;
	background-color: var(--white-smoke);
	border-radius: 30px;
}
.espacio {
	padding-right: 25px;
	padding-left: 20px;
}
</style>
