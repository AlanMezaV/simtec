<template>
	<div>
		<AlumnosLista></AlumnosLista>
		<div class="overlay"></div>
		<div class="FormEditarAlumno form-agg-edit">
			<div class="encabezado">
				Editar Alumno
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="nombre">Nombre:</label>
				<input v-model="alumnos.nombre" type="text" id="nombre" required class="form-input" />

				<label for="carrera">Carrera:</label>
				<input v-model="alumnos.carrera" type="text" id="carrera" maxlength="150" required class="form-input" />

				<label for="estatus">Estatus</label>
				<select v-model="alumnos.estatus" id="estatus" class="form-input">
					<option value="V">V</option>
					<option value="B">B</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="editarAlumno()" class="form-boton">Actualizar alumno</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./editarAlumnos"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
