<!-- AddForm.vue -->
<template>
	<div>
		<GruposLista></GruposLista>
		<div class="overlay"></div>
		<div class="FormAggGrupo form-agg-edit">
			<div class="encabezado">
				Agregar Grupo
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<div class="contenedor-inputs">
					<label for="clavegrupo">Clave del grupo:</label>
					<input
						v-model="grupos.clavegrupo"
						name="clavegrupo"
						type="text"
						maxlength="4"
						id="clavegrupo"
						@input="validarSoloNumerosClave"
						@click.prevent="eliminaError()"
						required
						placeholder="Introduce la clave..."
						class="form-input"
					/>

					<label for="clavemateria">Materia:</label>
					<select v-model="grupos.clavemateria" id="clavemateria" class="form-input">
						<option
							v-for="materia in clavematerias"
							:key="materia.clavemateria"
							:value="materia.clavemateria"
						>
							{{ materia.nombre }}
						</option>
					</select>

					<label for="clavemaestro">Maestro:</label>
					<select v-model="grupos.clavemaestro" id="clavemaestro" class="form-input">
						<option
							v-for="maestro in clavemaestros"
							:key="maestro.clavemaestro"
							:value="maestro.clavemaestro"
						>
							{{ maestro.nombre }}
						</option>
					</select>

					<label for="limitealumnos">Limite de alumnos:</label>
					<input v-model="grupos.limitealumnos" type="text" id="limitealumnos" required class="form-input" />

					<label for="horariolunes">Horario del lunes:</label>
					<input
						v-model="grupos.horariolunes"
						type="text"
						id="horariolunes"
						maxlength="11"
						placeholder="Introduce le horario"
						class="form-input"
					/>

					<label for="horariomartes">Horario del martes:</label>
					<input
						v-model="grupos.horariomartes"
						type="text"
						id="horariomartes"
						maxlength="11"
						placeholder="Introduce le horario"
						class="form-input"
					/>

					<label for="horariomiercoles">Horario del miercoles:</label>
					<input
						v-model="grupos.horariomiercoles"
						type="text"
						id="horariomiercoles"
						maxlength="11"
						placeholder="Introduce le horario"
						class="form-input"
					/>

					<label for="horariojueves">Horario del jueves:</label>
					<input
						v-model="grupos.horariojueves"
						type="text"
						id="horariojueves"
						maxlength="11"
						placeholder="Introduce le horario"
						class="form-input"
					/>

					<label for="horarioviernes">Horario del viernes:</label>
					<input
						v-model="grupos.horarioviernes"
						type="text"
						id="horarioviernes"
						maxlength="11"
						placeholder="Introduce le horario"
						class="form-input"
					/>
				</div>
				<div class="contenedor-form-boton">
<<<<<<< HEAD
					<button type="submit" @click.prevent="agregarGrupo()" class="form-boton-agregar">Agregar</button>
=======
					<button type="submit" @click.prevent="agregarGrupo()" class="form-boton">
						Agregar
					</button>
>>>>>>> 1955243e6a38742203740cb3dfd1d5904dffc2b5
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
import GruposLista from "./GruposLista.vue";
import {traeDatosGrupos} from "@/utils/peticiones";

export default {
	name: "FormAggGrupo",
	components: {
		GruposLista,
	},
	data: function () {
		return {
			grupos: [],
			clavematerias: [],
			clavemaestros: [],
			horarioMaestros: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	created() {
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
		validarSoloNumerosClave() {
			this.grupos.clavegrupo = this.grupos.clavegrupo.replace(/\D/g, "");
		},
		agregarGrupo: async function () {
			const validaDatos = () => {
				if (
					this.grupos.clavegrupo == undefined ||
					this.grupos.limitealumnos == undefined ||
					this.grupos.clavegrupo == "" ||
					this.grupos.limitealumnos == ""
				) {
					return false;
				}
				return true;
			};
			this.horarioMaestros = await traeDatosGrupos("horarioMaestro", this.grupos.clavemaestro);
			const validaMaestroHorario = () => {
				let band = true;
				const hora = this.grupos.horariolunes;
				this.horarioMaestros.forEach((horario) => {
					console.log(hora);
					console.log(horario.horariolunes);
					if (hora === horario.horariolunes) {
						console.log("entro", hora === horario.horariolunes);
						this.mostrarError = true;
						this.errorMensaje = "El maestro ya tiene una materia en ese horario.";
						band = false;
					}
				});
				return band;
			};

			try {
				if (validaDatos() && validaMaestroHorario()) {
					const response = await axios.get(`${URL_DATOS}/grupos/${this.grupos.clavegrupo}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El grupo ya existe, no se puede agregar.";
					} else {
						const res = await axios.post(URL_DATOS + "/grupos", {
							clavemateria: this.grupos.clavemateria,
							clavegrupo: this.grupos.clavegrupo,
							clavemaestro: this.grupos.clavemaestro,
							limitealumnos: this.grupos.limitealumnos,
							inscritos: 0,
							horariolunes: this.grupos.horariolunes,
							horariomartes: this.grupos.horariomartes,
							horariomiercoles: this.grupos.horariomiercoles,
							horariojueves: this.grupos.horariojueves,
							horarioviernes: this.grupos.horarioviernes,
						});
						this.$router.push("/grupos");
					}
				}
			} catch (error) {
				console.error("Error al verificar la existencia del grupo:", error);
			}
		},
		eliminaError() {
			this.mostrarError = false;
		},
		cerrarFormulario() {
			this.$router.push("/grupos");
		},
	},
};
</script>

<style scoped src="../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
