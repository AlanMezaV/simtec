<template>
	<div>
		<TomaCargaLista></TomaCargaLista>
		<div class="overlay"></div>
		<div class="FormAggCarga form-agg-edit">
			<div class="encabezado">
				Agregar Carga
				<button @click="cerrarFormulario">✖</button>
			</div>
			 <div class="contenedor-ncontrol">
                <div>
					<label for="ncontrol">Numero de control:</label>
					<select v-model="cargas.ncontrol" id="ncontrol" class="form-input">
					<option v-for="alumno in clavealumnos" :key="alumno.ncontrol" :value="alumno.ncontrol">
						{{ alumno.ncontrol }}
					</option>
					</select>
                </div>
                <div>
                    <span>Nombre: Alan Meza Valenzuela</span>
                </div>
            </div>
			<div class="contenedor-tabla">
                <div class="tabla">
                    <div class="tabla-encabezado-carga">
						<div>Clave del grupo</div>
						<div>Materia</div>
						<div>Maestro</div>
						<div>Limite de alumnos</div>
						<div>Alumnos inscritos</div>
						<div>Horario</div>
						<div>Carga</div>
					</div>
					<div class="contenedor-datos">
                        <div v-for="grupos in lista_grupos" :key="grupos.clavegrupo" class="datos-grupos">
							<span>{{ grupos.clavegrupo }} </span>
							<span>{{ getNombreMateria(grupos.clavemateria) }}</span>
							<span>{{ getNombreMaestro(grupos.clavemaestro) }}</span>
							<span class="centrar">{{ grupos.limitealumnos }}</span>
							<span class="centrar">{{ grupos.inscritos }}</span>
							<span>{{ grupos.horariolunes }}</span>
                            <span>Aqui esta cosa</span>

                        </div>
                    </div>
                </div>
            </div>
			<!-- <form>
				<label for="clavemateria">Materia:</label>
				<select v-model="cargas.clavemateria" id="clavemateria" class="form-input">
					<option v-for="materia in clavematerias" :key="materia.clavemateria" :value="materia.clavemateria">
						{{ materia.nombre }}
					</option>
				</select>

				<label for="clavegrupo">Grupos</label>
				<select v-model="cargas.clavegrupo" id="clavegrupo" class="clavegrupo form-input">
					<option v-for="grupo in clavegrupos" :key="grupo.clavegrupo" :value="grupo.clavegrupo">
						{{ grupo.clavegrupo }}
					</option>
				</select>

				<label for="ncontrol">Numero de control:</label>
				<select v-model="cargas.ncontrol" id="ncontrol" class="form-input">
					<option v-for="alumno in clavealumnos" :key="alumno.ncontrol" :value="alumno.ncontrol">
						{{ alumno.nombre }}
					</option>
				</select>

				<div class="contenedor-form-boton">
					<button type="submit" @click.prevent="agregarCarga()" class="form-boton">Agregar Carga</button>
				</div>
			</form> -->
			<div v-if="mostrarError" class="error-message">
				{{ errorMensaje }}
			</div>
		</div>
	</div>
</template>

<script src="./AggCarga"></script>

<!-- <style scoped src="../../../styles/form-agg-editar.css"></style> -->
<style scoped src="../../../styles/agregar-carga.css"></style>

<style scoped>
.clavegrupo {
	width: 100%;
}
</style>


<!-- 
    	<form>
				<label for="clavemateria">Materia:</label>
				<select v-model="cargas.clavemateria" id="clavemateria" class="form-input">
					<option v-for="materia in clavematerias" :key="materia.clavemateria" :value="materia.clavemateria">
						{{ materia.nombre }}
					</option>
				</select>

				<label for="clavegrupo">Grupos</label>
				<select v-model="cargas.clavegrupo" id="clavegrupo" class="clavegrupo form-input">
					<option v-for="grupo in clavegrupos" :key="grupo.clavegrupo" :value="grupo.clavegrupo">
						{{ grupo.clavegrupo }}
					</option>
				</select>

				<label for="ncontrol">Numero de control:</label>
				<select v-model="cargas.ncontrol" id="ncontrol" class="form-input">
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
 -->