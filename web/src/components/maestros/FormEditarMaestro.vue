<template>
	<div>
		<MaestrosLista></MaestrosLista>
		<div class="overlay"></div>
		<div class="FormEditarMaestro">
			Editar Maestro
			<button @click="cerrarFormulario">✖</button>
			<form>
				<label for="nombre">Nombre:</label>
				<input v-model="maestros.nombre" type="text" id="nombre" required />
				<br />
				<label for="departamento">Departamento:</label>
				<input v-model="maestros.departamento" type="text" id="departamento" maxlength="150" required />
				<br />
				<label for="estatus">Estatus:</label>
				<input v-model="maestros.estatus" type="text" id="estatus" maxlength="1" required />
				<br />
				<button type="submit" @click.prevent="editarMaestro()">Actualizar maestro</button>
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
import {traeDatos} from "@/utils/peticiones";

export default {
	name: "FormEditarMaestro",
	components: {
		MaestrosLista,
	},
	props: {
		clavemaestro: {
			type: Number,
		},
	},
	data: function () {
		return {
			maestros: [],
			mostrarError: false,
			errorMensaje: "",
		};
	},
	async created() {
		this.maestros = await traeDatos("maestros", this.clavemaestro);
	},
	methods: {
		editarMaestro: async function () {
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
				if (validaDatos()) {
					const res = await axios.put(URL_DATOS + "/maestros/" + this.clavemaestro, {
						clavemaestro: this.maestros.clavemaestro,
						nombre: this.maestros.nombre,
						departamento: this.maestros.departamento,
						estatus: this.maestros.estatus,
					});
					this.$router.push("/maestros");
				} else {
					this.mostrarError = true;
					this.errorMensaje = "No debe de haber datos vacios.";
				}
			} catch (error) {
				console.error("Error al verificar la existencia del maestro:", error);
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

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
}

.FormEditarMaestro {
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
