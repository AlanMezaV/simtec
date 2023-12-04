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
				<tr v-for="maestro in maestros" :key="maestro.clavemaestro">
					<td class="espacio">{{ maestro.clavemaestro }}</td>
					<td class="espacio">{{ maestro.nombre }}</td>
					<td class="espacio">{{ maestro.departamento }}</td>
					<td class="espacio">{{ maestro.estatus }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(maestro)">...</button>
						<div v-if="maestro.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarMaestro(maestro)">Editar</button>
							<br />
							<button @click="eliminarMaestro(maestro)">Eliminar</button>
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
	name: "MaestrosLista",
	components: {},
	data: function () {
		return {
			maestros: [],
		};
	},
	created() {
		this.traeMaestros();
	},
	methods: {
		traeMaestros: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/maestros")
				.then(function (response) {
					a = response.data;
					a = response.data.map((maestro) => ({...maestro, mostrarOpciones: false}));
				})
				.catch(function (error) {
					console.log(error);
				});
			this.maestros = a;
		},
		nuevoMaestro: function () {
			this.maestros.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-maestro", params: {}});
		},
		mostrarOpciones(maestro) {
			this.maestros.forEach((m) => {
				if (m !== maestro) {
					m.mostrarOpciones = false;
				}
			});
			maestro.mostrarOpciones = !maestro.mostrarOpciones;
		},
		editarMaestro: function (maestro) {
			maestro.mostrarOpciones = !maestro.mostrarOpciones;
			this.$router.push({name: "editar-maestro", params: {clavemaestro: maestro.clavemaestro}});
		},
		eliminarMaestro: async function (maestro) {
			maestro.mostrarOpciones = !maestro.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/maestros/" + maestro.clavemaestro);
			console.log(res);
			this.traeMaestros();
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
