<template>
	<div>
		<MateriasLista></MateriasLista>
		<div class="overlay"></div>
		<div class="FormAggMateria form-agg-edit">
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
					<button type="submit" @click.prevent="agregarMateria()" class="form-boton">Agregar</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./AggMateria"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
