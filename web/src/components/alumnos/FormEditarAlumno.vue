<template>
	<div>
		<AlumnosLista></AlumnosLista>
		<div class="overlay"></div>
		<div class="FormEditarAlumno">
			Editar Alumno
			<button @click="cerrarFormulario">✖</button>
			<form>
				<label for="nombre">Nombre:</label>
				<input v-model="alumnos.nombre" type="text" id="nombre" required />
				<br />
				<label for="carrera">Carrera:</label>
				<input v-model="alumnos.carrera" type="text" id="carrera" maxlength="150" required />
				<br />
				<label for="estatus">Estatus</label>
				<select v-model="alumnos.estatus" id="estatus" class="form-input">
					<option value="V">V</option>
					<option value="B">B</option>
				</select>
				<br />
				<button type="submit" @click.prevent="editarAlumno()">Actualizar alumno</button>
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
import {traeDatos} from "@/utils/peticiones";

export default {
	name: "FormEditarAlumno",
	components: {
		AlumnosLista,
	},
	props: {
		ncontrol: {
			type: Number,
		},
	},
	data: function () {
		return {
			alumnos: [],
			mostrarError: false,
			visible: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.alumnos = await traeDatos("alumnos", this.ncontrol);
	},
	methods: {
		editarAlumno: async function () {
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
					const res = await axios.put(URL_DATOS + "/alumnos/" + this.ncontrol, {
						ncontrol: this.alumnos.ncontrol,
						nombre: this.alumnos.nombre,
						carrera: this.alumnos.carrera,
						estatus: this.alumnos.estatus,
					});
					this.$router.push("/alumnos");
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

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
}

.FormEditarAlumno {
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
