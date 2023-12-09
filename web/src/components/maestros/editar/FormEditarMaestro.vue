<template>
	<div>
		<MaestrosLista></MaestrosLista>
		<div class="overlay"></div>
		<div class="FormEditarMaestro form-agg-edit">
			<div class="encabezado">
				Editar Maestro
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="nombre">Nombre:</label>
				<input v-model="maestros.nombre" type="text" id="nombre" required class="form-input" />

				<label for="departamento">Departamento:</label>
				<input
					v-model="maestros.departamento"
					type="text"
					id="departamento"
					maxlength="150"
					required
					class="form-input"
				/>

				<label for="estatus">Estatus</label>
				<select v-model="maestros.estatus" id="estatus" class="form-input combos" required>
					<option value="V">V</option>
					<option value="B">B</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="editarMaestro()" class="form-boton">
						Actualizar maestro
					</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./EditarMaestro"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
