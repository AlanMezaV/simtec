<template>
	<div class="MaestrosLista">
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
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import {URL_DATOS} from "../utils/constants.js";
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
				})
				.catch(function (error) {
					console.log(error);
				});
			this.maestros = a;
		},
	},
};
</script>

<style>
.MaestrosLista{
	width: 79%;
}
.espacio {
	padding-right: 25px;
	padding-left: 20px;
}
</style>
