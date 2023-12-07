<template>
	<div>
		<AlumnosLista></AlumnosLista>
		<div class="overlay"></div>
		<div class="FormAggAlumno">
			<div class="encabezado">
				Agregar Alumno
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="ncontrol">Numero de control</label>
				<input
					v-model="alumnos.ncontrol"
					name="ncontrol"
					type="text"
					maxlength="8"
					id="ncontrol"
					@input="validarSoloNumerosClave"
					@click.prevent="eliminaError()"
					required
					placeholder="Introduce el numero de control..."
					class="form-input"
				/>
				<label for="nombre">Nombre</label>
				<input
					maxlength="150"
					v-model="alumnos.nombre"
					type="text"
					value="Introduce el nombre"
					id="nombre"
					required
					placeholder="Introduce el nombre..."
					class="form-input"
				/>

				<label for="carrera">Carrera</label>
				<input
					v-model="alumnos.carrera"
					type="text"
					id="carrera"
					maxlength="150"
					required
					placeholder="Introduce la carrera..."
					class="form-input"
				/>

				<label for="estatus">Estatus</label>
				<select v-model="alumnos.estatus" id="estatus" class="form-input">
					<option value="V">V</option>
					<option value="B">B</option>
				</select>
				<br />

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarAlumno()" class="form-boton-agregar">
						Agregar Alumno
					</button>
				</div>
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
import AlumnosLista from "./AlumnosLista.vue";

export default {
	name: "FormAggAlumno",
	components: {
		AlumnosLista,
	},
	data: function () {
		return {
			alumnos: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	methods: {
		validarSoloNumerosClave() {
			this.alumnos.ncontrol = this.alumnos.ncontrol.replace(/\D/g, "");
		},
		agregarAlumno: async function () {
			const validaDatos = () => {
				if (
					this.alumnos.ncontrol == undefined ||
					this.alumnos.nombre == undefined ||
					this.alumnos.ncontrol == "" ||
					this.alumnos.nombre == "" ||
					this.alumnos.carrera == undefined ||
					this.alumnos.carrera == "" ||
					this.alumnos.estatus == undefined ||
					this.alumnos.estatus == ""
				) {
					return false;
				}
				return true;
			};

			try {
				// Realiza una solicitud GET para verificar si la materia ya existe
				if (validaDatos()) {
					const response = await axios.get(`${URL_DATOS}/alumnos/${this.alumnos.ncontrol}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya existe, no se puede agregar.";
					} else {
						const res = await axios.post(URL_DATOS + "/alumnos", {
							ncontrol: this.alumnos.ncontrol,
							nombre: this.alumnos.nombre,
							carrera: this.alumnos.carrera,
							estatus: this.alumnos.estatus,
						});
						this.$router.push("/alumnos");
					}
				} else {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
				}
			} catch (error) {
				console.error("Error al verificar la existencia de la materia:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/alumnos");
		},
	},
};
</script>

<style scoped src="../../styles/formAggAlumno.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
