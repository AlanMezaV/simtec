<template>
	<div class="contenedor-principal-cargas">

		<div class="TomaCargaLista">
			<span>Toma de carga</span>
			<button @click.prevent="nuevaCarga">Agregar</button>
			<table>
			<thead>
				<tr>
					<th>Clave materia</th>
					<th>Clave grupo</th>
					<th>Numero de control</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="cargas in lista_cargas" :key="cargas.clavegrupo + cargas.ncontrol">
					<td class="espacio">{{ cargas.clavemateria }}</td>
					<td class="espacio">{{ cargas.clavegrupo }}</td>
					<td class="espacio">{{ cargas.ncontrol }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(cargas)">...</button>
						<div v-if="cargas.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarCarga(cargas)">Editar</button>
							<br />
							<button @click="eliminarCarga(cargas)">Eliminar</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>

<script>
import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import {obtenerDatos} from "@/utils/peticiones";

export default {
	name: "TomaCargaLista",
	components: {},
	data: function () {
		return {
			lista_cargas: [],
		};
	},
	async created() {
		this.lista_cargas = await obtenerDatos("cargas");
	},
	methods: {
		traeCargas: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/cargas")
				.then(function (response) {
					a = response.data;
					a = response.data.map((carga) => ({...carga, mostrarOpciones: false}));
				})
				.catch(function (error) {
					console.log(error);
				});
			this.cargas = a;
		},
		nuevaCarga: function () {
			this.lista_cargas.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-carga", params: {}});
		},
		mostrarOpciones(cargas) {
			this.lista_cargas.forEach((m) => {
				if (m !== cargas) {
					m.mostrarOpciones = false;
				}
			});
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
		},
		editarCarga: function (cargas) {
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
			this.$router.push({
				name: "editar-carga",
				params: {clavegrupo: cargas.clavegrupo, ncontrol: cargas.ncontrol, clavemateria: cargas.clavemateria},
			});
		},
		eliminarCarga: async function (cargas) {
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/cargas/" + cargas.clavegrupo);
			this.lista_cargas = await obtenerDatos("cargas");
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
