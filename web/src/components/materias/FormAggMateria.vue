<!-- AddForm.vue -->
<template>
	<div>
		<MateriasLista></MateriasLista>
		<div class="overlay"></div>
		<div class="FormAggMateria">
			Agregar Materia
			<button @click="cerrarFormulario">✖</button>
			<form>
				<label for="clavemateria">Clave de materia:</label>
				<input
					v-model="materias.clavemateria"
					name="clavemateria"
					type="text"
					maxlength="8"
					id="clavemateria"
					@input="validarSoloNumerosClave"
					@click.prevent="eliminaError()"
					required
				/>
				<br />
				<label for="nombre">Nombre:</label>
				<input maxlength="150" v-model="materias.nombre" type="text" id="nombre" required />
				<br />
				<label for="creditos">Creditos:</label>
				<input
					v-model="materias.creditos"
					type="text"
					id="creditos"
					@input="validarSoloNumerosCreditos"
					required
				/>
				<br />
				<button type="submit" @click.prevent="agregarMateria()">Agregar</button>
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
import MateriasLista from "./MateriasLista.vue";

export default {
	name: "FormAggMateria",
	components: {
		MateriasLista,
	},
	data: function () {
		return {
			materias: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	methods: {
		validarSoloNumerosClave() {
			// Elimina caracteres no numéricos del valor de clavemateria
			this.materias.clavemateria = this.materias.clavemateria.replace(/\D/g, "");
		},
		validarSoloNumerosCreditos() {
			this.materias.creditos = this.materias.creditos.replace(/\D/g, "");
		},
		agregarMateria: async function () {
			const validaDatos = () => {
				if (
					this.materias.clavemateria == undefined ||
					this.materias.creditos == undefined ||
					this.materias.clavemateria == "" ||
					this.materias.creditos == "" ||
					this.materias.nombre == undefined ||
					this.materias.nombre == ""
				) {
					return false;
				}
				return true;
			};

			try {
				// Realiza una solicitud GET para verificar si la materia ya existe
				if (validaDatos()) {
					const response = await axios.get(`${URL_DATOS}/materias/${this.materias.clavemateria}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "La materia ya existe. No se puede agregar una duplicada.";
					} else {
						const res = await axios.post(URL_DATOS + "/materias", {
							cla: this.materias.clavemateria,
							nom: this.materias.nombre,
							cre: this.materias.creditos,
						});
						this.$router.push("/materias");
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
			this.$router.push("/materias");
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

.FormAggMateria {
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
