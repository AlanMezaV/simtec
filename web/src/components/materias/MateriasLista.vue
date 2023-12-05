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
				<tr v-for="materias in lista_materias" :key="materias.clavemateria">
					<td class="espacio">{{ materias.clavemateria }}</td>
					<td class="espacio">{{ materias.nombre }}</td>
					<td class="espacio">{{ materias.creditos }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(materias)">...</button>
						<div v-if="materias.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarMateria(materias)">Editar</button>
							<br />
							<button @click="eliminarMateria(materias)">Eliminar</button>
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
import {obtenerDatos} from "@/utils/peticiones";

export default {
	name: "MateriasLista",
	components: {},
	data: function () {
		return {
			lista_materias: [],
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
		eliminarMateria: async function (materias) {
			materias.mostrarOpciones = !materias.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/materias/" + materias.clavemateria);
			console.log(res);
			this.lista_materias = await obtenerDatos("materias");
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
