<template>
	<div class="GruposLista">
		<table>
			<thead>
				<tr>
					<th>Clave del grupo</th>
					<th>Clave de la materia</th>
					<th>Clave del maestro</th>
					<th>Limite de alumnos</th>
					<th>Alumnos inscritos</th>
					<th>Horario lunes</th>
					<th>Horario martes</th>
					<th>Horario miercoles</th>
					<th>Horario jueves</th>
					<th>Horario viernes</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="grupo in grupos" :key="grupo.clavegrupo">
					<td class="espacio">{{ grupo.clavegrupo }}</td>
					<td class="espacio">{{ grupo.clavemateria }}</td>
					<td class="espacio">{{ grupo.clavemaestro }}</td>
					<td class="espacio">{{ grupo.limitealumnos }}</td>
					<td class="espacio">{{ grupo.inscritos }}</td>
					<td class="espacio">{{ grupo.horariolunes }}</td>
					<td class="espacio">{{ grupo.horariomartes }}</td>
					<td class="espacio">{{ grupo.horariomiercoles }}</td>
					<td class="espacio">{{ grupo.horariojueves }}</td>
					<td class="espacio">{{ grupo.horarioviernes }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import {URL_DATOS} from "../utils/constants.js";
import axios from "axios";

export default {
	name: "GruposLista",
	components: {},
	data: function () {
		return {
			grupos: [],
		};
	},
	created() {
		this.traeGrupos();
	},
	methods: {
		traeGrupos: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/grupos")
				.then(function (response) {
					a = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.grupos = a;
		},
	},
};
</script>
<style>
.GruposLista{
	width: 79%;
}
.espacio {
	padding-right: 25px;
	padding-left: 20px;
}
</style>
