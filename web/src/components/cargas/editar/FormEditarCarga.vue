<template>
	<div>
		<TomaCargaLista></TomaCargaLista>
		<div class="overlay"></div>
		<div class="FormEditarCarga form-agg-edit">
			<div class="encabezado">
				Actualizar Carga
				<button @click="cerrarFormulario">✖</button>
			</div>
			<form>
				<label for="clavemateria">Materia:</label>
				<select v-model="cargas.clavemateria" id="clavemateria" class="form-input combos">
					<option v-for="materia in clavematerias" :key="materia.clavemateria" :value="materia.clavemateria">
						{{ materia.nombre }}
					</option>
				</select>

				<label for="clavegrupo">Grupos</label>
				<select v-model="cargas.clavegrupo" id="clavegrupo" class="clavegrupo form-input combos">
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

				<label for="ncontrol">Numero de control:</label>
				<select v-model="cargas.ncontrol" id="ncontrol" class="form-input combos">
					<option v-for="alumno in clavealumnos" :key="alumno.ncontrol" :value="alumno.ncontrol">
						{{ alumno.nombre }}
					</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarCarga()" class="form-boton">Actualizar Carga</button>
				</div>
			</form>
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./EditarCarga"></script>

<style scoped src="../../../styles/cargas-agg-edit.css"></style>
<style scoped src="../../../styles/form-agg-editar.css"></style>
