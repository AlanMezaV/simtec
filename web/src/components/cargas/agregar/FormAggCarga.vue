<template>
	<div>
		<TomaCargaLista></TomaCargaLista>
		<div class="overlay"></div>
		<div class="FormAggCarga form-agg-edit">
			<div class="encabezado">
				Agregar Carga
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="clavemateria">Materia:</label>
				<select v-model="cargas.clavemateria" id="clavemateria" class="form-input combos">
					<option disabled selected value="">Seleccione</option>
					<option v-for="materia in clavematerias" :key="materia.clavemateria" :value="materia.clavemateria">
						{{ materia.nombre }}
					</option>
				</select>

				<label for="clavegrupo">Grupos</label>
				<select v-model="cargas.clavegrupo" id="clavegrupo" class="clavegrupo form-input combos">
					<option disabled selected value="">Seleccione</option>
					<option v-for="grupo in clavegrupos" :key="grupo.clavegrupo" :value="grupo.clavegrupo">
						{{ grupo.clavegrupo }}
					</option>
				</select>

				<label for="nombreMaestro">Maestro</label>
				<input
					type="text"
					id="nombreMaestro"
					v-model="cargas.nombreMaestro"
					maxlength="150"
					required
					placeholder="Nombre del maestro"
					class="form-input"
					disabled
				/>

				<label for="horariolunes">Horario lunes</label>
				<input
					type="text"
					id="horariolunes"
					v-model="cargas.horariolunes"
					maxlength="150"
					required
					placeholder="Hora de la clase"
					class="form-input"
					disabled
				/>

				<label for="horariomartes">Horario martes</label>
				<input
					type="text"
					id="horariomartes"
					v-model="cargas.horariomartes"
					maxlength="150"
					required
					placeholder="Hora de la clase"
					class="form-input"
					disabled
				/>

				<label for="horariomiercoles">Horario miercoles</label>
				<input
					type="text"
					id="horariomiercoles"
					v-model="cargas.horariomiercoles"
					maxlength="150"
					required
					placeholder="Hora de la clase"
					class="form-input"
					disabled
				/>

				<label for="horariojueves">Horario jueves</label>
				<input
					type="text"
					id="horariojueves"
					v-model="cargas.horariojueves"
					maxlength="150"
					required
					placeholder="Hora de la clase"
					class="form-input"
					disabled
				/>

				<label for="horarioviernes">Horario viernes</label>
				<input
					type="text"
					id="horarioviernes"
					v-model="cargas.horarioviernes"
					maxlength="150"
					required
					placeholder="Hora de la clase"
					class="form-input"
					disabled
				/>
				<label for="ncontrol">Numero de control:</label>
				<select v-model="cargas.ncontrol" id="ncontrol" class="form-input combos">
					<option disabled selected value="">Seleccione</option>
					<option v-for="alumno in clavealumnos" :key="alumno.ncontrol" :value="alumno.ncontrol">
						{{ alumno.nombre }}
					</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarCarga()" class="form-boton">Agregar Carga</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./AggCarga"></script>

<style scoped src="../../../styles/form-agg-editar.css"></style>
<style scoped>
.clavegrupo {
	width: 100%;
}
</style>
