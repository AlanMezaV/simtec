<template>
	<div>
		<MateriasLista></MateriasLista>
		<div class="overlay"></div>
		<div class="FormEditarMateria form-agg-edit">
			<div class="encabezado">
				Editar Materia
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="nombre">Nombre:</label>
				<input maxlength="150" v-model="materias.nombre" type="text" id="nombre" required class="form-input" />

				<label for="creditos">Creditos:</label>
				<input
					v-model="materias.creditos"
					type="text"
					id="creditos"
					@input="validarSoloNumerosCreditos"
					required
					class="form-input"
				/>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="editarMateria()" class="form-boton">
						Actualizar materia
					</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./EditarMateria"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
