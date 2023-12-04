<template>
	<div class="MateriasLista">
		<span>Materias</span>
		<button @click.prevent="nuevaMateria">Agregar</button>
		<table>
			<thead>
				<tr>
					<th>Clave materia</th>
					<th>Nombre</th>
					<th>Creditos</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="materia in materias" :key="materia.clavemateria">
					<td class="espacio">{{ materia.clavemateria }}</td>
					<td class="espacio">{{ materia.nombre }}</td>
					<td class="espacio">{{ materia.creditos }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(materia)">...</button>
						<div v-if="materia.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarMateria(materia)">Editar</button>
							<br />
							<button @click="eliminarMateria(materia)">Eliminar</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";

export default {
	name: "MateriasLista",
	components: {},
	data: function () {
		return {
			materias: [],
		};
	},
	created() {
		this.traeMaterias();
	},
	methods: {
		traeMaterias: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/materias")
				.then(function (response) {
					a = response.data;
					a = response.data.map((materia) => ({...materia, mostrarOpciones: false}));
				})
				.catch(function (error) {
					console.log(error);
				});
			this.materias = a;
		},
		nuevaMateria: function () {
			this.materias.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-materia", params: {}});
		},
		mostrarOpciones(materia) {
			this.materias.forEach((m) => {
				if (m !== materia) {
					m.mostrarOpciones = false;
				}
			});
			materia.mostrarOpciones = !materia.mostrarOpciones;
		},
		editarMateria: function (materia) {
			materia.mostrarOpciones = !materia.mostrarOpciones;
			this.$router.push({name: "editar-materia", params: {clavemateria: materia.clavemateria}});
		},
		eliminarMateria: async function (materia) {
			materia.mostrarOpciones = !materia.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/materias/" + materia.clavemateria);
			console.log(res);
			this.traeMaterias();
		},
	},
};
</script>

<style>
.espacio {
	padding-right: 25px;
	padding-left: 20px;
}

.menu-desplegable {
	position: absolute;
	background-color: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 5px;
	margin-top: 2px;
}
</style>
