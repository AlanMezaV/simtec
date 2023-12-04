<template>
	<div>
		<TomaCargaLista></TomaCargaLista>
		<div class="overlay"></div>
		<div class="FormAggCarga">
			Agregar Carga
			<button @click="cerrarFormulario">✖</button>
			<form>
				<label for="clavemateria">Materia:</label>
				<select v-model="cargas.clavemateria" id="clavemateria">
					<option v-for="materia in clavematerias" :key="materia.clavemateria" :value="materia.clavemateria">
						{{ materia.nombre }}
					</option>
				</select>
				<br />

				<label for="ncontrol">Numero de control</label>
				<select v-model="cargas.ncontrol" id="ncontrol">
					<option value=""></option>
					<option v-for="alumno in clavealumnos" :key="alumno.clavealumnos" :value="alumno.clavealumnos">
						{{ alumno.nombre }}
					</option>
				</select>
				<br />
				<button type="submit" @click.prevent="agregarCarga()">Agregar</button>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script>
import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import TomaCargaLista from "./TomaCargaLista.vue";

export default {
	name: "FormAggCarga",
	components: {
		TomaCargaLista,
	},
	data: function () {
		return {
			cargas: [],
			clavematerias: [],
			clavealumnos: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	created() {
		this.obtenerMaterias();
		this.obtenerAlumnos();
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
		async obtenerAlumnos() {
			try {
				const response = await axios.get(`${URL_DATOS}/alumnos`);
				this.clavealumnos = response.data;
			} catch (error) {
				console.error("Error al obtener alumnos:", error);
			}
		},
		agregarCarga: async function () {
			const validaDatos = () => {
				if (
					this.cargas.clavemateria == undefined ||
					this.cargas.clavegrupo == undefined ||
					this.cargas.clavemateria == "" ||
					this.cargas.clavegrupo == "" ||
					this.cargas.ncontrol == undefined ||
					this.cargas.ncontrol == ""
				) {
					return false;
				}
				return true;
			};

			try {
				if (validaDatos()) {
					const response = await axios.get(`${URL_DATOS}/cargas/${this.cargas.clavegrupo}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "La carga ya existe. No se puede agregar una duplicada.";
					} else {
						const res = await axios.post(URL_DATOS + "/cargas", {
							clavemateria: this.cargas.clavemateria,
							clavegrupo: this.cargas.clavegrupo,
							ncontrol: this.cargas.ncontrol,
						});
						this.$router.push("/cargas");
					}
				} else {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
				}
			} catch (error) {
				console.error("Error al verificar la existencia de la carga:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/cargas");
		},
	},
};
</script>

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
}

.FormAggCarga {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error-message {
	color: red;
	margin-top: 10px;
}
</style>
