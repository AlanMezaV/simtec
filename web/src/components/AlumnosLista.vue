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
				<tr v-for="alumno in alumnos" :key="alumno.ncontrol">
					<td class="espacio">{{ alumno.ncontrol }}</td>
					<td class="espacio">{{ alumno.nombre }}</td>
					<td class="espacio">{{ alumno.carrera }}</td>
					<td class="espacio">{{ alumno.estatus }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(alumno)">...</button>
						<div v-if="alumno.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarAlumno(alumno)">Editar</button>
							<br />
							<button @click="eliminarAlumno(alumno)">Eliminar</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>

<script>
import {URL_DATOS} from "../utils/constants.js";
import axios from "axios";

export default {
	name: "AlumnosLista",
	components: {},
	data: function () {
		return {
			alumnos: [],
		};
	},
	created() {
		this.traeAlumnos();
	},
	methods: {
		traeAlumnos: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/alumnos")
				.then(function (response) {
					console.log(response);
					a = response.data;
					a = response.data.map((alumno) => ({...alumno, mostrarOpciones: false}));
				})
				.catch(function (error) {
					console.log(error);
				});
			this.alumnos = a;
		},
		nuevoAlumno: function () {
			this.alumnos.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-alumno", params: {}});
		},
		mostrarOpciones(alumno) {
			this.alumnos.forEach((m) => {
				if (m !== alumno) {
					m.mostrarOpciones = false;
				}
			});
			alumno.mostrarOpciones = !alumno.mostrarOpciones;
		},
		editarAlumno: function (alumno) {
			alumno.mostrarOpciones = !alumno.mostrarOpciones;
			this.$router.push({name: "editar-alumno", params: {ncontrol: alumno.ncontrol}});
		},
		eliminarAlumno: async function (alumno) {
			alumno.mostrarOpciones = !alumno.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/alumnos/" + alumno.ncontrol);
			console.log(res);
			this.traeAlumnos();
		},
	},
};
</script>

<style>
:root{
	--white-smoke: #f1f2f4;
}
.AlumnosLista{
	width: 79%;
	background-color: var(--white-smoke);
	border-radius: 30px;
}
.espacio {
	padding-right: 25px;
	padding-left: 20px;
}
</style>
