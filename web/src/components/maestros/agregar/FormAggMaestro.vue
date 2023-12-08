<!-- AddForm.vue -->
<template>
	<div>
		<MaestrosLista></MaestrosLista>
		<div class="overlay"></div>
		<div class="FormAggMaestro form-agg-edit">
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
					type="text"
					id="departamento"
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
					<button type="submit" @click.prevent="agregarMaestro()" class="form-boton">Agregar Maestro</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./AggMaestro"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
