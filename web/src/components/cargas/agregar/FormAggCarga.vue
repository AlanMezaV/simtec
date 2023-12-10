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
				<span id="nombreMaestro" > 
					Maestro:	{{ cargas.nombreMaestro }} 
				</span>
				
				<div class="contenedor-carga-horario">

					<div class="contenedor-carga-dias">
						<span>Lunes</span>
						<span>Martes</span>
						<span>Miercoles</span>
						<span>Juves</span>
						<span>Viernes</span>
					</div>
					<div class="contenedor-carga-horas">
						
						<span id="horariolunes"> 
							{{ cargas.horariolunes }}
						</span>
					
						<span id="horariomartes">
							{{ cargas.horariomartes }}
						</span>
					
						<span id="horariomiercoles">
							{{ cargas.horariomiercoles }}
						</span>
					
						<span id="horariojueves">
							{{ cargas.horariojueves }}
						</span>
					
						<span id="horarioviernes">
							{{ cargas.horarioviernes }}
						</span>	
					</div>
				
				</div>
				<label for="ncontrol">Alumno:</label>
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
<style scoped src="../../../styles/cargas-agg-edit.css"></style>
<style scoped>
.clavegrupo {
	width: 100%;
}
</style>
