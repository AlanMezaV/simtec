<!-- AddForm.vue -->
<template>
	<div>
		<MaestrosLista></MaestrosLista>
		<div class="overlay"></div>
		<div class="FormAggMaestro formAgg">
			<div class="encabezado">
				Agregar Maestro
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="clavemaestro">Clave del maestro:</label>
				<input
					v-model="maestros.clavemaestro"
					name="clavemaestro"
					type="text"
					maxlength="8"
					id="clavemaestro"
					@input="validarSoloNumerosClave"
					@click.prevent="eliminaError()"
					required
					placeholder="Introduce la clave..."
					class="form-input"
				/>
				<label for="nombre">Nombre:</label>
				<input 
				maxlength="150" 
				v-model="maestros.nombre" 
				type="text" 
				id="nombre" 
				required
				placeholder="Introduce el nombre..."
				class="form-input"
				/>
				
				<label for="departamento">Departamento:</label>
				<input 
				maxlength="150" 
				v-model="maestros.departamento" 
				type="text" id="departamento" 
				required 
				placeholder="Introduce el departamento..."
				class="form-input"
				/>
				
				<label for="estatus">Estatus</label>
				<select v-model="maestros.estatus" id="estatus" class="form-input" required>
					<option value="V">V</option>
					<option value="B">B</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarMaestro()" class="form-boton-agregar">
						Agregar Maestro
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
import MaestrosLista from "./MaestrosLista.vue";

export default {
	name: "FormAggMaestro",
	components: {
		MaestrosLista,
	},
	data: function () {
		return {
			maestros: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	methods: {
		validarSoloNumerosClave() {
			// Elimina caracteres no numéricos del valor de clavemateria
			this.maestros.clavemaestro = this.maestros.clavemaestro.replace(/\D/g, "");
		},
		agregarMaestro: async function () {
			const validaDatos = () => {
				if (
					this.maestros.clavemaestro == undefined ||
					this.maestros.nombre == undefined ||
					this.maestros.clavemaestro == "" ||
					this.maestros.nombre == "" ||
					this.maestros.departamento == undefined ||
					this.maestros.departamento == "" ||
					this.maestros.estatus == undefined ||
					this.maestros.estatus == ""
				) {
					return false;
				}
				return true;
			};

			try {
				// Realiza una solicitud GET para verificar si la materia ya existe
				if (validaDatos()) {
					const response = await axios.get(`${URL_DATOS}/maestros/${this.maestros.clavemaestro}`);
					if (response.data.length > 0) {
						this.mostrarError = true;
						this.errorMensaje = "El maestro ya existe, no se puede agregar.";
					} else {
						const res = await axios.post(URL_DATOS + "/maestros", {
							clavemaestro: this.maestros.clavemaestro,
							nombre: this.maestros.nombre,
							departamento: this.maestros.departamento,
							estatus: this.maestros.estatus,
						});
						this.$router.push("/maestros");
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
			this.$router.push("/maestros");
		},
	},
};
</script>

<style scoped src="../../styles/formAgg.css"></style>
<style scoped>
/* .overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
 /* 
.FormAggMaestro {
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
 */
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
