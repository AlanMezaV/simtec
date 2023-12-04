<template>
	<div class="GruposLista">
		<span>Grupos</span>
		<button @click.prevent="nuevoGrupo">Agregar</button>
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
					<td class="espacio">{{ getNombreMateria(grupo.clavemateria) }}</td>
					<td class="espacio">{{ getNombreMaestro(grupo.clavemaestro) }}</td>
					<td class="espacio">{{ grupo.limitealumnos }}</td>
					<td class="espacio">{{ grupo.inscritos }}</td>
					<td class="espacio">{{ grupo.horariolunes }}</td>
					<td class="espacio">{{ grupo.horariomartes }}</td>
					<td class="espacio">{{ grupo.horariomiercoles }}</td>
					<td class="espacio">{{ grupo.horariojueves }}</td>
					<td class="espacio">{{ grupo.horarioviernes }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(grupo)">...</button>
						<div v-if="grupo.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarGrupo(grupo)">Editar</button>
							<br />
							<button @click="eliminarGrupo(grupo)">Eliminar</button>
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
	name: "GruposLista",
	components: {},
	data: function () {
		return {
			grupos: [],
			clavematerias: [],
			clavemaestros: [],
		};
	},
	created() {
		this.traeGrupos();
		this.obtenerMaterias();
		this.obtenerMaestros();
	},
	methods: {
		async obtenerMaterias() {
			try {
				const response = await axios.get(`${URL_DATOS}/materias`);
				this.clavematerias = response.data;
			} catch (error) {
				console.error("Error al obtener materias:", error);
			}
		},
		async obtenerMaestros() {
			try {
				const response = await axios.get(`${URL_DATOS}/maestros`);
				this.clavemaestros = response.data;
			} catch (error) {
				console.error("Error al obtener maestros:", error);
			}
		},
		traeGrupos: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/grupos")
				.then(function (response) {
					a = response.data;
					a = response.data.map((grupo) => ({...grupo, mostrarOpciones: false}));
				})
				.catch(function (error) {
					console.log(error);
				});
			this.grupos = a;
		},
		getNombreMateria(claveMateria) {
			const materia = this.clavematerias.find((materia) => materia.clavemateria === claveMateria);
			return materia ? materia.nombre : "Materia no encontrada";
		},
		getNombreMaestro(claveMaestro) {
			const maestro = this.clavemaestros.find((maestro) => maestro.clavemaestro === claveMaestro);
			return maestro ? maestro.nombre : "Maestro no encontrado";
		},
		nuevoGrupo: function () {
			this.grupos.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-grupo", params: {}});
		},
		mostrarOpciones(grupo) {
			this.grupos.forEach((m) => {
				if (m !== grupo) {
					m.mostrarOpciones = false;
				}
			});
			grupo.mostrarOpciones = !grupo.mostrarOpciones;
		},
		editarGrupo: function (grupo) {
			grupo.mostrarOpciones = !grupo.mostrarOpciones;
			this.$router.push({name: "editar-grupo", params: {clavegrupo: grupo.clavegrupo}});
		},
		eliminarGrupo: async function (grupo) {
			grupo.mostrarOpciones = !grupo.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/grupos/" + grupo.clavegrupo);
			console.log(res);
			this.traeGrupos();
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
