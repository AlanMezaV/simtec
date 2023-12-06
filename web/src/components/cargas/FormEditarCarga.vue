<template>
	<div>
		<TomaCargaLista></TomaCargaLista>
		<div class="overlay"></div>
		<div class="FormEditarCarga">
			Actualizar Carga
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

				<button type="submit" @click.prevent="agregarCarga()">Actualizar</button>
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
	name: "FormEditarCarga",
	components: {
		TomaCargaLista,
	},
	props: {
		clavegrupo: {
			type: String,
		},
		ncontrol: {
			type: Number,
		},
		clavemateria: {
			type: String,
		},
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
		this.cargas = await this.traeCarga();
		console.log(this.cargas);
		this.clavematerias = await obtenerDatos("materias");
		this.clavegrupos = await traeDatosGrupos("materia", this.clavemateria);
		this.clavealumnos = await obtenerDatos("alumnos");
	},
	watch: {
		"cargas.clavemateria": "peticionGruposClaveMateria",
		"cargas.ncontrol": ["peticionGruposNcontrol", "peticionAlumnosClvGyClvM"],
	},
	methods: {
		traeCarga: async function () {
			try {
				const response = await axios.get(URL_DATOS + "/cargas/" + this.clavegrupo, {
					params: {
						ncontrol: this.ncontrol,
					},
				});

				const cargaObjeto = response.data[0]; // Obtener el objeto del índice 0
				const propiedadesFormateadas = Object.entries(cargaObjeto).reduce((acc, [clave, valor]) => {
					acc[clave] = valor;
					return acc;
				}, {});

				return propiedadesFormateadas;
			} catch (error) {
				console.log(error);
				return {};
			}
		},
		peticionGruposClaveMateria: async function () {
			this.clavegrupos = await traeDatosGrupos("materia", this.cargas.clavemateria);
			console.log(this.clavegrupos);
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
			const validaAlumnoHorario = () => {
				let band = true;
				const horario = this.clavegrupos[0].horariolunes;
				const horaAnterior = traeDatosGrupos("materia", this.clavemateria);
				this.horarios.forEach((hora) => {
					if (hora === horario && hora === horaAnterior) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya tiene una materia en ese horario.";
						band = false;
					}
				});
				return band;
			};
			const validaAlumnoMateria = () => {
				for (const materia of this.materiasDeAlumno) {
					if (
						materia.clavemateria === this.cargas.clavemateria &&
						this.cargas.clavemateria !== this.clavemateria
					) {
						this.mostrarError = true;
						this.errorMensaje = "El alumno ya tiene esa materia.";
						return false;
					}
				}
				return true;
			};
			try {
				if (validaDatos() && validaAlumnoMateria() && validaAlumnoHorario()) {
					const res = await axios.put(URL_DATOS + "/cargas", {
						clavemateria: this.cargas.clavemateria,
						clavegrupo: this.cargas.clavegrupo,
						ncontrol: this.cargas.ncontrol,
						clavegrupoVieja: this.clavegrupo,
						ncontrolVieja: this.ncontrol,
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

.FormEditarCarga {
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
