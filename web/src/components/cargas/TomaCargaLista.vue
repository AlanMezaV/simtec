<template>
	<div class="contenedor-principal-cargas">
		<div class="TomaCargaLista">
			<span>Toma de carga</span>
			<button @click.prevent="nuevaCarga">Agregar</button>
			<table>
				<thead>
					<tr>
						<th>Clave grupo</th>
						<th>Materia</th>
						<th>Numero de control</th>
						<th>Alumno</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="cargas in lista_cargas" :key="cargas.clavegrupo + cargas.ncontrol">
						<td class="espacio">{{ cargas.clavegrupo }}</td>
						<span class="espacio">{{ getNombreMateria(cargas.clavemateria) }}</span>
						<td class="espacio">{{ cargas.ncontrol }}</td>
						<span class="espacio">{{ getNombreAlumno(cargas.ncontrol) }}</span>
						<td class="espacio">
							<button @click="mostrarOpciones(cargas)">...</button>
							<div v-if="cargas.mostrarOpciones" class="menu-desplegable">
								<button @click.prevent="editarCarga(cargas)">Editar</button>
								<br />
								<button @click="eliminar(cargas)">Eliminar</button>
							</div>
						</td>
						<div v-if="mostrarConfirma && cargas.clavegrupo && cargas.ncontrol === cargaSeleccionada">
							<ConfirmaEliminar
								:mensaje="
									'Estas seguro que quieres eliminar la carga con el grupo : ' +
									cargas.clavegrupo +
									' y el alumno: ' +
									cargas.ncontrol
								"
								@si="eliminarCarga(cargas)"
								@cerrar="cerrarConfirma"
							></ConfirmaEliminar>
						</div>
						<div v-if="mostrarError">
							<Error
								error="No se puede eliminar esta materia ya tiene asignada grupos."
								@cerrar="cerrarError"
							></Error>
						</div>
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
import Error from "../mensajes/Error.vue";
import ConfirmaEliminar from "../mensajes/ConfirmaEliminar.vue";

export default {
	name: "TomaCargaLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_cargas: [],
			clavematerias: [],
			clavealumnos: [],
			mostrarError: false,
			mostrarConfirma: false,
			cargaSeleccionada: [],
		};
	},
	async created() {
		this.lista_cargas = await obtenerDatos("cargas");
		this.clavematerias = await obtenerDatos("materias");
		this.clavealumnos = await obtenerDatos("alumnos");
	},
	methods: {
		getNombreMateria(claveMateria) {
			const materia = this.clavematerias.find((materia) => materia.clavemateria === claveMateria);
			return materia ? materia.nombre : "Materia no encontrada";
		},
		getNombreAlumno(Ncontrol) {
			const alumno = this.clavealumnos.find((alumno) => alumno.ncontrol === Ncontrol);
			return alumno ? alumno.nombre : "Alumno no encontrado";
		},
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
		eliminar: async function (cargas) {
			this.cargaSeleccionada = cargas.clavegrupo && cargas.ncontrol;
			this.mostrarConfirma = true;
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
		},
		eliminarCarga: async function (cargas) {
			console.log(cargas);
			const res = await axios.delete(URL_DATOS + "/cargas/" + cargas.clavegrupo, {
				params: {
					ncontrol: cargas.ncontrol,
				},
			});
			console.log(res);
			this.lista_cargas = await obtenerDatos("cargas");
			this.mostrarConfirma = false;
		},
		cerrarError() {
			console.log("cerrar error");
			this.mostrarError = false;
		},
		cerrarConfirma() {
			this.mostrarConfirma = false;
		},
	},
};
</script>

<style>
.espacio {
	padding-right: 35px;
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
