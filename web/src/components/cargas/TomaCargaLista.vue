<template>
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
				<tr v-for="carga in cargas" :key="carga.clavegrupo">
					<td class="espacio">{{ carga.clavemateria }}</td>
					<td class="espacio">{{ carga.clavegrupo }}</td>
					<td class="espacio">{{ carga.ncontrol }}</td>
					<td class="espacio">
						<button @click="mostrarOpciones(carga)">...</button>
						<div v-if="carga.mostrarOpciones" class="menu-desplegable">
							<button @click.prevent="editarCarga(carga)">Editar</button>
							<br />
							<button @click="eliminarCarga(carga)">Eliminar</button>
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
	name: "TomaCargaLista",
	components: {},
	data: function () {
		return {
			cargas: [],
		};
	},
	created() {
		this.traeCargas();
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
			this.cargas.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-carga", params: {}});
		},
		mostrarOpciones(carga) {
			this.cargas.forEach((m) => {
				if (m !== carga) {
					m.mostrarOpciones = false;
				}
			});
			materia.mostrarOpciones = !materia.mostrarOpciones;
		},
		editarCarga: function (carga) {
			carga.mostrarOpciones = !carga.mostrarOpciones;
			this.$router.push({name: "editar-carga", params: {clavegrupo: carga.clavegrupo}});
		},
		eliminarCarga: async function (carga) {
			carga.mostrarOpciones = !carga.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/cargas/" + carga.clavegrupo);
			console.log(res);
			this.traeCargas();
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
