<template>
	<div>
		<AlumnosLista></AlumnosLista>
		<div class="overlay"></div>
		<div class="FormAggAlumno form-agg-edit">
			<div class="encabezado">
				Agregar Alumno
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="ncontrol">Numero de control</label>
				<input
					v-model="alumnos.ncontrol"
					name="ncontrol"
					type="text"
					maxlength="8"
					id="ncontrol"
					@input="validarSoloNumerosClave"
					@click.prevent="eliminaError()"
					required
					placeholder="Introduce el numero de control..."
					class="form-input"
				/>
				<label for="nombre">Nombre</label>
				<input
					maxlength="150"
					v-model="alumnos.nombre"
					type="text"
					value="Introduce el nombre"
					id="nombre"
					required
					placeholder="Introduce el nombre..."
					class="form-input"
				/>

				<label for="carrera">Carrera</label>
				<input
					v-model="alumnos.carrera"
					type="text"
					id="carrera"
					maxlength="150"
					required
					placeholder="Introduce la carrera..."
					class="form-input"
				/>

				<label for="estatus">Estatus</label>
				<select v-model="alumnos.estatus" id="estatus" class="form-input combos">
					<option value="V">V</option>
					<option value="B">B</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarAlumno()" class="form-boton">Agregar Alumno</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="../agregar/AggAlumno"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
