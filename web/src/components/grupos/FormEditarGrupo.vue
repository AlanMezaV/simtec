<template>
	<div>
		<GruposLista></GruposLista>
		<div class="overlay"></div>
		<div class="FormEditarGrupo">
			Editar Grupo
			<button @click="cerrarFormulario">✖</button>
			<form>
				<label for="clavemateria">Clave de materia:</label>
				<select v-model="grupos.clavemateria" id="clavemateria">
					<option v-for="materia in clavematerias" :key="materia.clavemateria" :value="materia.clavemateria">
						{{ materia.nombre }}
					</option>
				</select>
				<br />
				<label for="clavemaestro">Clave del maestro:</label>
				<select v-model="grupos.clavemaestro" id="clavemaestro">
					<option v-for="maestro in clavemaestros" :key="maestro.clavemaestro" :value="maestro.clavemaestro">
						{{ maestro.nombre }}
					</option>
				</select>
				<br />

				<label for="limitealumnos">Limite de alumnos:</label>
				<input v-model="grupos.limitealumnos" type="text" id="limitealumnos" required />
				<br />
				<label for="inscritos">Alumnos inscritos:</label>
				<input v-model="grupos.inscritos" type="text" id="inscritos" required />
				<br />
				<label for="horariolunes">Horario del lunes:</label>
				<input v-model="grupos.horariolunes" type="text" id="horariolunes" maxlength="11" />
				<br />
				<label for="horariomartes">Horario del martes:</label>
				<input v-model="grupos.horariomartes" type="text" id="horariomartes" maxlength="11" />
				<br />
				<label for="horariomiercoles">Horario del miercoles:</label>
				<input v-model="grupos.horariomiercoles" type="text" id="horariomiercoles" maxlength="11" />
				<br />
				<label for="horariojueves">Horario del jueves:</label>
				<input v-model="grupos.horariojueves" type="text" id="horariojueves" maxlength="11" />
				<br />
				<label for="horarioviernes">Horario del viernes:</label>
				<input v-model="grupos.horarioviernes" type="text" id="horarioviernes" maxlength="11" />
				<br />
				<button type="submit" @click.prevent="editarGrupo()">Actualizar grupo</button>
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
import {traeDatos} from "@/utils/peticiones";
import {obtenerDatos} from "@/utils/peticiones";

export default {
	name: "FormEditarGrupo",
	components: {
		GruposLista,
	},
	props: {
		clavegrupo: {
			type: String,
		},
	},
	data: function () {
		return {
			grupos: [],
			clavematerias: [],
			clavemaestros: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.grupos = await traeDatos("grupos", this.clavegrupo);
		this.clavematerias = await obtenerDatos("materias");
		this.clavemaestros = await obtenerDatos("maestros");
	},
	methods: {
		editarGrupo: async function () {
			const validaDatos = () => {
				if (
					this.grupos.clavegrupo == undefined ||
					this.grupos.limitealumnos == undefined ||
					this.grupos.clavegrupo == "" ||
					this.grupos.limitealumnos == "" ||
					this.grupos.inscritos == undefined ||
					this.grupos.inscritos == ""
				) {
					return false;
				}
				return true;
			};

			try {
				if (validaDatos()) {
					const res = await axios.put(URL_DATOS + "/grupos/" + this.clavegrupo, {
						clavemateria: this.grupos.clavemateria,
						clavegrupo: this.grupos.clavegrupo,
						clavemaestro: this.grupos.clavemaestro,
						limitealumnos: this.grupos.limitealumnos,
						inscritos: this.grupos.inscritos,
						horariolunes: this.grupos.horariolunes,
						horariomartes: this.grupos.horariomartes,
						horariomiercoles: this.grupos.horariomiercoles,
						horariojueves: this.grupos.horariojueves,
						horarioviernes: this.grupos.horarioviernes,
					});
					this.$router.push("/grupos");
				} else {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
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

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
}

.FormEditarGrupo {
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
