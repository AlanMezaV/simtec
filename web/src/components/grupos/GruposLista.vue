<template>
	<div class="GruposLista">
		<span>Grupos</span>
		<button @click.prevent="nuevoGrupo">Agregar</button>
		<table>
			<thead>
				<tr>
					<th>Clave del grupo</th>
					<th>Materia</th>
					<th>Maestro</th>
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
				<tr v-for="grupos in lista_grupos" :key="grupos.clavegrupo">
					<td class="espacio">{{ grupos.clavegrupo }}</td>
					<td class="espacio">{{ getNombreMateria(grupos.clavemateria) }}</td>
					<td class="espacio">{{ getNombreMaestro(grupos.clavemaestro) }}</td>
					<td class="espacio">{{ grupos.limitealumnos }}</td>
					<td class="espacio">{{ grupos.inscritos }}</td>
					<td class="espacio">{{ grupos.horariolunes }}</td>
					<td class="espacio">{{ grupos.horariomartes }}</td>
					<td class="espacio">{{ grupos.horariomiercoles }}</td>
					<td class="espacio">{{ grupos.horariojueves }}</td>
					<td class="espacio">{{ grupos.horarioviernes }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(grupos)">...</button>
						<div v-if="grupos.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarGrupo(grupos)">Editar</button>
							<br />
							<button @click="eliminarGrupo(grupos)">Eliminar</button>
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
	name: "GruposLista",
	components: {},
	data: function () {
		return {
			lista_grupos: [],
			clavematerias: [],
			clavemaestros: [],
		};
	},
	async created() {
		this.lista_grupos = await obtenerDatos("grupos");
		this.clavematerias = await obtenerDatos("materias");
		this.clavemaestros = await obtenerDatos("maestros");
	},
	methods: {
		getNombreMateria(claveMateria) {
			const materia = this.clavematerias.find((materia) => materia.clavemateria === claveMateria);
			return materia ? materia.nombre : "Materia no encontrada";
		},
		getNombreMaestro(claveMaestro) {
			const maestro = this.clavemaestros.find((maestro) => maestro.clavemaestro === claveMaestro);
			return maestro ? maestro.nombre : "Maestro no encontrado";
		},
		nuevoGrupo: function () {
			this.lista_grupos.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-grupo", params: {}});
		},
		mostrarOpciones(grupos) {
			this.lista_grupos.forEach((m) => {
				if (m !== grupos) {
					m.mostrarOpciones = false;
				}
			});
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
		},
		editarGrupo: function (grupos) {
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
			this.$router.push({name: "editar-grupo", params: {clavegrupo: grupos.clavegrupo}});
		},
		eliminarGrupo: async function (grupos) {
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/grupos/" + grupos.clavegrupo);
			console.log(res);
			this.lista_grupos = await obtenerDatos("grupos");
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
