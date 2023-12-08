<template>
	<div>
		<GruposLista></GruposLista>
		<div class="overlay"></div>
		<div class="FormEditarGrupo form-agg-edit">
			<div class="encabezado">
				Editar Grupo
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<div class="contenedor-inputs">
					<label for="clavemateria">Clave de materia:</label>
					<select v-model="grupos.clavemateria" id="clavemateria" class="form-input">
						<option
							v-for="materia in clavematerias"
							:key="materia.clavemateria"
							:value="materia.clavemateria"
						>
							{{ materia.nombre }}
						</option>
					</select>

					<label for="clavemaestro">Clave del maestro:</label>
					<select v-model="grupos.clavemaestro" id="clavemaestro" class="form-input">
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
						class="form-input"
					/>

					<label for="horariomartes">Horario del martes:</label>
					<input
						v-model="grupos.horariomartes"
						type="text"
						id="horariomartes"
						maxlength="11"
						class="form-input"
					/>

					<label for="horariomiercoles">Horario del miercoles:</label>
					<input
						v-model="grupos.horariomiercoles"
						type="text"
						id="horariomiercoles"
						maxlength="11"
						class="form-input"
					/>

					<label for="horariojueves">Horario del jueves:</label>
					<input
						v-model="grupos.horariojueves"
						type="text"
						id="horariojueves"
						maxlength="11"
						class="form-input"
					/>

					<label for="horarioviernes">Horario del viernes:</label>
					<input
						v-model="grupos.horarioviernes"
						type="text"
						id="horarioviernes"
						maxlength="11"
						class="form-input"
					/>
				</div>
				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="editarGrupo()" class="form-boton">Actualizar grupo</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./EditarGrupo"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
