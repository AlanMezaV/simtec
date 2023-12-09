<!-- AddForm.vue -->
<template>
	<div>
		<GruposLista></GruposLista>
		<div class="overlay"></div>
		<div class="FormAggGrupo form-agg-edit">
			<div class="encabezado">
				Agregar Grupo
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<div class="contenedor-inputs">
					<label for="clavegrupo">Clave del grupo:</label>
					<input
						v-model="grupos.clavegrupo"
						name="clavegrupo"
						type="text"
						maxlength="4"
						id="clavegrupo"
						@input="validarSoloNumerosClave"
						@click.prevent="eliminaError()"
						required
						placeholder="Introduce la clave..."
						class="form-input"
					/>

					<label for="clavemateria">Materia:</label>
					<select v-model="grupos.clavemateria" id="clavemateria" class="form-input combos">
						<option
							v-for="materia in clavematerias"
							:key="materia.clavemateria"
							:value="materia.clavemateria"
						>
							{{ materia.nombre }}
						</option>
					</select>

					<label for="clavemaestro">Maestro:</label>
					<select v-model="grupos.clavemaestro" id="clavemaestro" class="form-input combos">
						<option
							v-for="maestro in clavemaestros"
							:key="maestro.clavemaestro"
							:value="maestro.clavemaestro"
						>
							{{ maestro.nombre }}
						</option>
					</select>

					<label for="limitealumnos">Limite de alumnos:</label>
					<input v-model="grupos.limitealumnos" type="text" id="limitealumnos" required class="form-input" />

					<label for="horariolunes">Horario del lunes:</label>
					<input
						v-model="grupos.horariolunes"
						type="text"
						id="horariolunes"
						maxlength="11"
						placeholder="Introduce el horario"
						class="form-input"
					/>

					<label for="horariomartes">Horario del martes:</label>
					<input
						v-model="grupos.horariomartes"
						type="text"
						id="horariomartes"
						maxlength="11"
						placeholder="Introduce el horario"
						class="form-input"
					/>

					<label for="horariomiercoles">Horario del miercoles:</label>
					<input
						v-model="grupos.horariomiercoles"
						type="text"
						id="horariomiercoles"
						maxlength="11"
						placeholder="Introduce el horario"
						class="form-input"
					/>

					<label for="horariojueves">Horario del jueves:</label>
					<input
						v-model="grupos.horariojueves"
						type="text"
						id="horariojueves"
						maxlength="11"
						placeholder="Introduce el horario"
						class="form-input"
					/>

					<label for="horarioviernes">Horario del viernes:</label>
					<input
						v-model="grupos.horarioviernes"
						type="text"
						id="horarioviernes"
						maxlength="11"
						v-bind:placeholder="placeholderHorarioViernes"
						class="form-input"
						v-bind:disabled="inputDeshabilitado"
					/>
				</div>
				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarGrupo()" class="form-boton">Agregar</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./AggGrupo"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
