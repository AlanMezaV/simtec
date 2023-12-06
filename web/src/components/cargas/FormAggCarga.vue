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

				<label for="clavegrupo">Grupos</label>
				<select v-model="cargas.clavegrupo" id="clavegrupo" class="clavegrupo">
					<option v-for="grupo in clavegrupos" :key="grupo.clavegrupo" :value="grupo.clavegrupo">
						{{ grupo.clavegrupo }}
					</option>
				</select>
				<br />

				<label for="ncontrol">Numero de control:</label>
				<select v-model="cargas.ncontrol" id="ncontrol">
					<option v-for="alumno in clavealumnos" :key="alumno.ncontrol" :value="alumno.ncontrol">
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
import {obtenerDatos} from "@/utils/peticiones";
import {traeDatosGrupos} from "@/utils/peticiones";

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
			clavegrupos: [],
			pedir: [],
			materiasDeAlumno: [],
			horarios: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.clavematerias = await obtenerDatos("materias");
		this.clavealumnos = await obtenerDatos("alumnos");
		this.clavegrupos = await traeDatosGrupos("materia", this.cargas.clavemateria);
	},
	watch: {
		"cargas.clavemateria": "peticionGruposClaveMateria",
		"cargas.ncontrol": ["peticionGruposNcontrol", "peticionAlumnosClvGyClvM"],
	},
	methods: {
		peticionGruposClaveMateria: async function () {
			this.clavegrupos = await traeDatosGrupos("materia", this.cargas.clavemateria);
		},
		peticionGruposNcontrol: async function () {
			this.materiasDeAlumno = await traeDatosGrupos("alumno", this.cargas.ncontrol);
		},
		peticionAlumnosClvGyClvM: async function () {
			this.pedir = await traeDatosGrupos("alumnito", this.cargas.ncontrol);

			const petitions = [];

			this.pedir.forEach((obj) => {
				petitions.push(traeDatosGrupos("horario", obj.clavegrupo));
			});

			const horarios = await Promise.all(petitions);
			this.horarios = horarios.map((i) => i[0].horariolunes);
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
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
					return false;
				}
				return true;
			};

			const validaAlumnoMateria = () => {
				for (const materia of this.materiasDeAlumno) {
					if (materia.clavemateria === this.cargas.clavemateria) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya tiene esa materia.";
						return false;
					}
				}
				return true;
			};

			const validaAlumnoHorario = () => {
				let band = true;
				const horario = this.clavegrupos[0].horariolunes;
				console.log(horario);
				this.horarios.forEach((hora) => {
					console.log({
						hora,
						horario,
					});
					console.log("VALIDACION", hora === horario);
					if (hora === horario) {
						console.log("entro");
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya tiene una materia en ese horario.";
						band = false;
					}
				});
				return band;
			};
			try {
				if (validaDatos() && validaAlumnoMateria() && validaAlumnoHorario()) {
					const res = await axios.post(URL_DATOS + "/cargas", {
						clavemateria: this.cargas.clavemateria,
						clavegrupo: this.cargas.clavegrupo,
						ncontrol: this.cargas.ncontrol,
					});
					this.$router.push("/carga");
				}
			} catch (error) {
				console.error("Error al verificar la existencia de la carga:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/carga");
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

.clavegrupo {
	width: 100%;
}
</style>
