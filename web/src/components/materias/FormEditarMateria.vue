<template>
	<div>
		<MateriasLista></MateriasLista>
		<div class="overlay"></div>
		<div class="FormEditarMateria">
			Editar Materia
			<button @click="cerrarFormulario">✖</button>
			<form>
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
				<button type="submit" @click.prevent="editarMateria()">Actualizar materia</button>
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
	name: "FormEditarMateria",
	components: {
		MateriasLista,
	},
	props: {
		clavemateria: {
			type: String,
		},
	},
	data: function () {
		return {
			materias: [],
			visible: false,
			mostrarError: false,
			errorMensaje: "",
		};
	},
	created() {
		this.traeDatos();
	},
	methods: {
		validarSoloNumerosClave() {
			// Elimina caracteres no numéricos del valor de clavemateria
			this.materias.clavemateria = this.materias.clavemateria.replace(/\D/g, "");
		},
		validarSoloNumerosCreditos() {
			this.materias.creditos = this.materias.creditos.replace(/\D/g, "");
		},
		traeDatos: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/materias/" + this.clavemateria)
				.then(function (response) {
					a = response.data[0];
				})
				.catch(function (error) {
					console.log(error);
				});
			this.materias = a;
		},
		editarMateria: async function () {
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
					const res = await axios.put(URL_DATOS + "/materias/" + this.clavemateria, {
						id: this.materias.clavemateria,
						nom: this.materias.nombre,
						cre: this.materias.creditos,
					});
					console.log(res);
					this.$router.push("/materias");
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

.FormEditarMateria {
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
