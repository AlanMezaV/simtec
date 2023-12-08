<template>
	<div>
		<TomaCargaLista></TomaCargaLista>
		<div class="overlay"></div>
		<div class="FormEditarCarga form-agg-edit">
			<div class="encabezado">
				Actualizar Carga
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="clavemateria">Materia:</label>
				<select v-model="cargas.clavemateria" id="clavemateria" class="form-input">
					<option v-for="materia in clavematerias" :key="materia.clavemateria" :value="materia.clavemateria">
						{{ materia.nombre }}
					</option>
				</select>

				<label for="clavegrupo">Grupos</label>
				<select v-model="cargas.clavegrupo" id="clavegrupo" class="clavegrupo form-input">
					<option v-for="grupo in clavegrupos" :key="grupo.clavegrupo" :value="grupo.clavegrupo">
						{{ grupo.clavegrupo }}
					</option>
				</select>

				<label for="ncontrol">Numero de control:</label>
				<select v-model="cargas.ncontrol" id="ncontrol" class="form-input">
					<option v-for="alumno in clavealumnos" :key="alumno.ncontrol" :value="alumno.ncontrol">
						{{ alumno.nombre }}
					</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarCarga()" class="form-boton">
						Actualizar Carga
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
import TomaCargaLista from "./TomaCargaLista.vue";
import {obtenerDatos, traeDatos} from "@/utils/peticiones";
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
			grupoViejo: [],
			materiasDeAlumno: [],
			grupoActualizar: [],
			horarios: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.cargas = await this.traeCarga();
		this.clavematerias = await obtenerDatos("materias");
		this.clavegrupos = await traeDatosGrupos("materia", this.clavemateria);
		this.clavealumnos = await obtenerDatos("alumnos");
	},
	watch: {
		"cargas.clavemateria": "peticionGruposClaveMateria",
		"cargas.ncontrol": ["peticionGruposNcontrol", "peticionAlumnosClvGyClvM"],
		"cargas.clavegrupo": "pedirNuevoGrupo",
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
		pedirNuevoGrupo: async function () {
			this.grupoActualizar = await traeDatos("grupos", this.cargas.clavegrupo);
			console.log("Grupo actualizado", this.grupoActualizar);
		},
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

			const validaInscritos = () => {
				const inscritos = this.grupoActualizar.inscritos;
				console.log("Alumnos inscritos" + this.grupoActualizar.inscritos);
				const cupo = this.grupoActualizar.limitealumnos;
				console.log("Cupo" + this.grupoActualizar.limitealumnos);
				if (inscritos === cupo) {
					this.mostrarError = true;
					this.errorMensaje = "El grupo ya esta lleno.";
					return false;
				}
				return true;
			};

			try {
				if (validaDatos() && validaAlumnoMateria() && validaAlumnoHorario() && validaInscritos()) {
					if (this.cargas.clavegrupo !== this.clavegrupo) {
						this.grupoViejo = await traeDatos("grupos", this.clavegrupo);
						let nuevaCantidad = this.grupoViejo.inscritos - 1;
						const response = await axios.put(URL_DATOS + "/grupos/inscritos/" + this.clavegrupo, {
							clavegrupo: this.clavegrupo,
							inscritos: nuevaCantidad,
						});
						let Cantidad = this.grupoActualizar.inscritos + 1;
						const response2 = await axios.put(URL_DATOS + "/grupos/inscritos/" + this.cargas.clavegrupo, {
							clavegrupo: this.cargas.clavegrupo,
							inscritos: Cantidad,
						});
					}

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

<style scoped src="../../styles/form-agg-editar.css"></style>
