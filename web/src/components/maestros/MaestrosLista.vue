<template>
	<div class="MaestrosLista">
		<span>Maestros</span>
		<button @click.prevent="nuevoMaestro">Agregar</button>
		<table>
			<thead>
				<tr>
					<th>Clave maestro</th>
					<th>Nombre</th>
					<th>Departamento</th>
					<th>Estatus</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="maestros in lista_maestros" :key="maestros.clavemaestro">
					<td class="espacio">{{ maestros.clavemaestro }}</td>
					<td class="espacio">{{ maestros.nombre }}</td>
					<td class="espacio">{{ maestros.departamento }}</td>
					<td class="espacio">{{ maestros.estatus }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(maestros)">...</button>
						<div v-if="maestros.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarMaestro(maestros)">Editar</button>
							<br />
							<button @click="eliminarMaestro(maestros)">Eliminar</button>
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
	name: "MaestrosLista",
	components: {},
	data: function () {
		return {
			lista_maestros: [],
		};
	},
	async created() {
		this.lista_maestros = await obtenerDatos("maestros");
	},
	methods: {
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
		eliminarMaestro: async function (maestros) {
			maestros.mostrarOpciones = !maestros.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/maestros/" + maestros.clavemaestro);
			console.log(res);
			this.lista_maestros = await obtenerDatos("maestros");
		},
	},
};
</script>

<style>
.espacio {
	padding-right: 25px;
	padding-left: 20px;
}
</style>
