<!-- AddForm.vue -->
<template>
	<div>
		<MateriasLista></MateriasLista>
		<div class="overlay"></div>
		<div class="FormAggMateria formAgg">
			<div class="encabezado">
				Agregar Materia
				<button @click="cerrarFormulario">✖</button>
			</div>
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
					placeholder="Introduce la clave..."
					class="form-input"
				/>
				
				<label for="nombre">Nombre:</label>
				<input 
					maxlength="150" 
					v-model="materias.nombre" 
					type="text" 
					id="nombre" 
					required 
					placeholder="Introduce el nombre..."
					class="form-input"
				/>
				
				<label for="creditos">Creditos:</label>
				<input
					v-model="materias.creditos"
					type="text"
					id="creditos"
					@input="validarSoloNumerosCreditos"
					required
					placeholder="Introduce el número de creditos..."
					class="form-input"
				/>
				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarMateria()" class="form-boton-agregar">
						Agregar
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

<style scoped src="../../styles/formAgg.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
